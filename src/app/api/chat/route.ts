import { NextRequest } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { chatRequestSchema } from '@/schemas/chatRequestSchema';
import { errorResponse } from '@/lib/api/errorResponse';
import { getSession } from '@/lib/api/getSession';
import { enforceByUser, rateLimitHeaders } from '@/lib/rateLimit';
import { streamResponse } from '@/lib/LLMs/streamResponse';
import { isInappropriateMessage } from '@/lib/LLMs/openai/isInappropriateMessage';
import { createChat, addMessages, touchChat } from '@/db/queries/chat';
import { ROLES } from '@/constants/LLMs/roles';

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

    const lastMessage = messages.at(-1)!;
    const isFlaggedMessage = await isInappropriateMessage(lastMessage);
    if (isFlaggedMessage) {
      return errorResponse(
        'Your message was flagged as inappropriate. Please keep the conversation professional.',
        StatusCodes.BAD_REQUEST
      );
    }

    const encoder = new TextEncoder();
    const encodeSSE = (data: unknown) =>
      encoder.encode(`data: ${JSON.stringify(data)}\n\n`);

    const stream = new ReadableStream({
      async start(controller) {
        let fullContent = '';

        try {
          for await (const chunk of streamResponse(
            provider,
            messages,
            settings
          )) {
            if (chunk.type === 'delta') {
              fullContent += chunk.content;
              controller.enqueue(encodeSSE(chunk));
            } else {
              const resolvedChatId =
                chatId ??
                (
                  await createChat({
                    userId: session.user.id,
                    title: lastMessage.content,
                    provider,
                    model: settings.model,
                  })
                ).id;

              await addMessages([
                {
                  chatId: resolvedChatId,
                  role: lastMessage.role,
                  content: lastMessage.content,
                },
                {
                  chatId: resolvedChatId,
                  role: ROLES.ASSISTANT,
                  content: fullContent,
                  promptTokens: chunk.usage?.promptTokens,
                  completionTokens: chunk.usage?.completionTokens,
                  cost: chunk.usage?.cost.toString(),
                },
              ]);

              if (chatId) {
                await touchChat(chatId);
              }

              controller.enqueue(
                encodeSSE({
                  type: 'done',
                  chatId: resolvedChatId,
                  usage: chunk.usage,
                })
              );
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
          controller.enqueue(
            encodeSSE({
              type: 'error',
              message: 'Failed to process request',
            })
          );
        } finally {
          controller.close();
        }
      },
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
    console.error('Chat API error:', error);
    return errorResponse(
      'Failed to process request',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
