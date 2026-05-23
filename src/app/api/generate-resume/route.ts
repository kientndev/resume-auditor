import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
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
  type: "OBJECT",
  properties: {
    personalInfo: {
      type: "OBJECT",
      properties: {
        fullName: { type: "STRING" },
        jobTitle: { type: "STRING" },
        email: { type: "STRING" },
        phone: { type: "STRING" }
      },
      required: ["fullName", "jobTitle", "email", "phone"]
    },
    experience: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          role: { type: "STRING" },
          company: { type: "STRING" },
          duration: { type: "STRING" },
          bullets: {
            type: "ARRAY",
            items: { type: "STRING" }
          }
        },
        required: ["role", "company", "duration", "bullets"]
      }
    },
    skills: {
      type: "ARRAY",
      items: { type: "STRING" }
    }
  },
  required: ["personalInfo", "experience", "skills"]
};

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

    const result = JSON.parse(response.text);

    return NextResponse.json({ result, usage });
  } catch (error: any) {
    console.error('Generate Error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
