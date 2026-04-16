import { NextRequest } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { chatRequestSchema } from '@/schemas/chatRequestSchema';
import { errorResponse } from '@/lib/api/errorResponse';
import { getSession } from '@/lib/api/getSession';
import { isInappropriateMessage } from '@/lib/LLMs/openai/isInappropriateMessage';
import { createChatSSEStream } from '@/lib/LLMs/createChatSSEStream';
import { enforceByUser } from '@/lib/rateLimit/utils/enforcements/custom/enforceByUser';
import { rateLimitHeaders } from '@/lib/rateLimit/utils/rateLimitHeaders';
import logger from '@/lib/logger';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return errorResponse('Unauthorized', StatusCodes.UNAUTHORIZED);
    }

    const rateLimit = await enforceByUser(req, session.user.id);
    if (!rateLimit.ok) {
      return rateLimit.response;
    }

    const body = await req.json();
    const result = chatRequestSchema.safeParse(body);
    if (!result.success) {
      return errorResponse('Invalid request', StatusCodes.BAD_REQUEST);
    }

    const { chatId, messages, provider, settings } = result.data;

    if (await isInappropriateMessage(messages.at(-1)!)) {
      return errorResponse(
        'Your message was flagged as inappropriate. Please keep the conversation professional.',
        StatusCodes.BAD_REQUEST
      );
    }

    const stream = createChatSSEStream({
      chatId,
      userId: session.user.id,
      messages,
      provider,
      settings,
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        ...rateLimitHeaders(rateLimit.result),
      },
    });
  } catch (error) {
    logger.error('Chat API error:', error);
    return errorResponse(
      'Failed to process request',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
