import { NextRequest } from 'next/server';
import { chatRequestSchema } from '@/schemas/chatRequestSchema';
import { isInappropriateMessage } from '@/lib/LLMs/openai/isInappropriateMessage';
import { createChatSSEStream } from '@/lib/LLMs/createChatSSEStream';
import { enforceByUser } from '@/lib/rateLimit/utils/enforcements/custom/enforceByUser';
import { rateLimitHeaders } from '@/lib/rateLimit/utils/rateLimitHeaders';
import { withAuth } from '@/lib/api/withAuth';
import { withErrorHandling } from '@/lib/api/withErrorHandling';
import ChatInvalidRequestError from '@/lib/errors/chat/ChatInvalidRequestError';
import ChatInappropriateMessageError from '@/lib/errors/chat/ChatInappropriateMessageError';
import RateLimitError from '@/lib/errors/RateLimitError';

export const POST = withErrorHandling(
  withAuth(async (session, req: NextRequest) => {
    const rateLimit = await enforceByUser(req, session.user.id);
    if (!rateLimit.ok) {
      throw new RateLimitError(rateLimit.result);
    }

    const body = await req.json();
    const result = chatRequestSchema.safeParse(body);
    if (!result.success) {
      console.log(result);
      throw new ChatInvalidRequestError(result.error.issues[0].message);
    }

    const { chatId, messages, provider, settings } = result.data;

    if (await isInappropriateMessage(messages.at(-1)!)) {
      throw new ChatInappropriateMessageError();
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
  })
);
