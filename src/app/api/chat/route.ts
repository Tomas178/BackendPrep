import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/openai/prompts';
import { StatusCodes } from 'http-status-codes';
import { ROLES } from '@/constants/roles';
import { chatRequestSchema } from '@/app/schemas/chatRequestSchema';

const OPENAI_MODEL = 'gpt-4o';

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = chatRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: result.error.issues },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const {
      messages,
      temperature,
      topP,
      maxOutputTokens,
      frequencyPenalty,
      presencePenalty,
    } = result.data;

    const stream = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: ROLES.SYSTEM, content: INTERVIEW_SYSTEM_PROMPT },
        ...messages,
      ],
      temperature,
      top_p: topP,
      max_tokens: maxOutputTokens,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
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
