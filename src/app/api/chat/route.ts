import { NextRequest } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { chatRequestSchema } from '@/schemas/chatRequestSchema';
import { errorResponse } from '@/lib/api/errorResponse';
import { isMessageFlagged } from '@/lib/openai/moderate';
import { getChatStream } from '@/lib/openai/getChatStream';
import { toReadableStream } from '@/lib/openai/toReadableStream';
import { ROLES } from '@/constants/openai/enums/roles';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = chatRequestSchema.safeParse(body);

    if (!result.success) {
      return errorResponse('Invalid request', StatusCodes.BAD_REQUEST);
    }

    const { messages, settings } = result.data;
    console.log(settings);

    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage?.role === ROLES.USER &&
      (await isMessageFlagged(lastMessage.content))
    ) {
      return errorResponse(
        'Your message was flagged as inappropriate. Please keep the conversation professional.',
        StatusCodes.BAD_REQUEST
      );
    }

    const stream = await getChatStream(messages, settings);

    return new Response(toReadableStream(stream, settings.model), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch {
    return errorResponse(
      'Failed to process request',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
