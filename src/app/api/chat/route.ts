import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { chatRequestSchema } from '@/schemas/chatRequestSchema';
import { getChatStream } from './getChatStream';
import { toReadableStream } from './toReadableStream';

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

    const { messages, settings } = result.data;
    const stream = await getChatStream(messages, settings);

    return new Response(toReadableStream(stream), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
