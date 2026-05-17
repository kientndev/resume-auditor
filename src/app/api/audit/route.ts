import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { resumeText, apiKey } = await req.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key is required' }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey });

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

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Here is the resume text to audit:\n\n${resumeText}` }
      ],
      temperature: 0.7,
    });

    const result = response.choices[0]?.message?.content;

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('Audit Error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
