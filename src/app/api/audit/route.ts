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
      return NextResponse.json({ error: 'Gemini API key is missing in environment variables' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are an elite, brutally honest tech recruiter and resume auditor. Your job is to analyze the extracted text of a user's CV/Resume and provide a harsh but highly constructive evaluation. 

Analyze the input text based on four core pillars:
1. Impact & Metrics (Are they using action verbs and data, or just listing tasks?)
2. Layout & Scannability (Is it clean or a cluttered mess?)
3. Skill Alignment (Are tech skills clearly defined and relevant?)
4. ATS Friendliness (Will automated tracking software drop this resume?)

Your response MUST be formatted in clean Markdown using the following structure exactly:

### 📊 OVERALL GRADE: [Insert Letter Grade here: A, B+, B, C, D, or F]

### 🎯 The Brutal Truth (The Roast)
[Provide a 2-3 sentence honest, slightly sharp summary of why the resume got this grade. Do not sugarcoat it, but keep it professional.]

### 🛠️ Top 3 Immediate Fixes
1. **[Core Focus Area]:** [Specific instruction on what to change and why.]
2. **[Core Focus Area]:** [Specific instruction on what to change and why.]
3. **[Core Focus Area]:** [Specific instruction on what to change and why.]

### 🪄 Before vs. After Example
Show them how to rewrite one of their weak points.
* **Your current bullet:** "[Pick a weak or generic sentence from their text]"
* **AI Upgraded version:** "[Rewrite it to include a powerful action verb, clear tech stack, and a measurable metric/result]"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Here is the resume text to audit:\n\n${resumeText}`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    const result = response.text;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('Audit Error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
