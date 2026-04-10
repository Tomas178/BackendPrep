import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/prompts';
import { StatusCodes } from 'http-status-codes';

const OPENAI_MODEL = 'gpt-4o';

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  try {
    const { messages, temperature, topP } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const clampedTemperature = Math.min(
      2,
      Math.max(0, Number(temperature) || 0.9)
    );
    const clampedTopP = Math.min(1, Math.max(0, Number(topP) || 1.0));

    const stream = await openai.responses.create({
      model: OPENAI_MODEL,
      instructions: INTERVIEW_SYSTEM_PROMPT,
      input: messages,
      temperature: clampedTemperature,
      top_p: clampedTopP,
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === 'response.output_text.delta' && event.delta) {
            controller.enqueue(encoder.encode(event.delta));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
