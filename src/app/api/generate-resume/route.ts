import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key is missing' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are an elite, brutally honest tech recruiter and resume auditor.
Your goal is to parse the user's raw resume text and rewrite it into a flawless, high-impact resume using strong action verbs and data-driven formatting.
Extract their personal info, rewrite their work experience into powerful bullet points, and extract their skills.
Return the output strictly as a JSON object matching the requested schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Here is the raw resume to rewrite:\n\n${resumeText}`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: "OBJECT",
          properties: {
            personalInfo: {
              type: "OBJECT",
              properties: {
                fullName: { type: "STRING" },
                jobTitle: { type: "STRING" },
                email: { type: "STRING" },
                phone: { type: "STRING" }
              }
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
                }
              }
            },
            skills: {
              type: "ARRAY",
              items: { type: "STRING" }
            }
          }
        },
        temperature: 0.7,
      }
    });

    if (!response.text) {
      throw new Error("No response text returned from Gemini");
    }

    const result = JSON.parse(response.text);

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('Generate Error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
