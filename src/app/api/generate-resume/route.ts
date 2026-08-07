import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { auth, currentUser } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

const FREE_SYSTEM_PROMPT = `You format raw resume text into a clean, concise resume JSON object.
Use a single pass. Keep bullets short, plain, and factual. Do not add exaggerated metrics or unsupported claims.
Return only JSON matching the schema.`;

const PRO_SYSTEM_PROMPT = `You are an elite technical resume strategist and recruiter.
Transform raw resume text into a high-impact, ATS-optimized, keyword-rich resume.
Rewrite experience with strong action verbs, role-relevant technical keywords, and measurable impact where the source supports it.
Improve clarity, seniority signal, and scanability without inventing false employment history.
Return only JSON matching the schema.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    personalInfo: {
      type: Type.OBJECT,
      properties: {
        fullName: { type: Type.STRING },
        jobTitle: { type: Type.STRING },
        email: { type: Type.STRING },
        phone: { type: Type.STRING }
      },
      required: ["fullName", "jobTitle", "email", "phone"]
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          company: { type: Type.STRING },
          duration: { type: Type.STRING },
          bullets: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["role", "company", "duration", "bullets"]
      }
    },
    skills: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ["personalInfo", "experience", "skills"]
};

function cleanJsonString(rawStr: string) {
  let cleaned = rawStr
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  return cleaned.replace(/,\s*([}\]])/g, '$1').trim();
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Please sign in to generate a resume.' },
        { status: 401 }
      );
    }

    const { resumeText } = await req.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key is missing' }, { status: 500 });
    }

    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      return NextResponse.json({ error: 'Convex URL is missing' }, { status: 500 });
    }

    const convex = new ConvexHttpClient(convexUrl);
    const clerkUser = await currentUser();
    await convex.mutation(api.users.getOrCreateUser, {
      clerkId: userId,
      email: clerkUser?.emailAddresses[0]?.emailAddress,
      name: clerkUser?.fullName || clerkUser?.firstName || undefined,
      imageUrl: clerkUser?.imageUrl || undefined,
    });

    const usage = await convex.mutation(api.users.validateAndTrackUsage, {
      clerkId: userId,
      action: "generate",
    });

    if (!usage.authorized) {
      return NextResponse.json(
        {
          code: usage.reason,
          error: 'Free plan generation limit reached.',
          usage,
        },
        { status: 403 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const isPro = usage.plan === "pro";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Here is the raw resume to rewrite:\n\n${resumeText}`,
      config: {
        systemInstruction: isPro ? PRO_SYSTEM_PROMPT : FREE_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
        temperature: isPro ? 0.7 : 0.2,
        maxOutputTokens: isPro ? 1800 : 800,
      }
    });

    if (!response.text) {
      throw new Error("No response text returned from Gemini");
    }

    let result: any;
    try {
      result = JSON.parse(cleanJsonString(response.text));
    } catch (parseError: any) {
      console.error("Failed to parse Gemini response:", response.text);
      throw new Error(`Failed to parse AI response: ${parseError.message}. Raw output: ${response.text}`);
    }

    return NextResponse.json({ result, usage });
  } catch (error: any) {
    console.error('Generate Error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
