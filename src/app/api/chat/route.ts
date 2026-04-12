import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { chatRequestSchema } from '@/schemas/chatRequestSchema';
import { isMessageFlagged } from '@/lib/openai/moderate';
import { getChatStream } from '@/lib/openai/getChatStream';
import { toReadableStream } from '@/lib/openai/toReadableStream';

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

    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage?.role === 'user' &&
      (await isMessageFlagged(lastMessage.content))
    ) {
      return NextResponse.json(
        {
          error:
            'Your message was flagged as inappropriate. Please keep the conversation professional.',
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

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
