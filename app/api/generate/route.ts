import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const getClient = () =>
  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.deepseek.com/v1',
  });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });

    const client = getClient();
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `You are an expert brand strategist and copywriter. Analyze the provided brand content and generate a comprehensive brand voice framework including:
1. Brand Personality Dimensions (Big Five traits, archetype mapping)
2. Voice Attributes: Tone, Vocabulary, Style, Rhythm, Sentence Structure
3. Do's and Don'ts (5 examples each of on-brand and off-brand copy with explanations)
4. Per-Channel Tone Adaptation: LinkedIn vs Twitter vs Email vs Website vs Social
5. Per-Audience Messaging: B2B Buyer vs End Consumer vs Enterprise (differentiated guidance)
6. Messaging Pillars (3-5 core value propositions)
7. Sample On-Brand Copy for each channel
8. Content Audit Checklist (how to score existing content against brand voice)

Use specific, actionable guidance with real examples from the provided content.`,
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
    });

    return NextResponse.json({ output: completion.choices[0].message.content });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
