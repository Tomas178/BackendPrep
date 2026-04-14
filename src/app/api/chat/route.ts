import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { chatRequestSchema } from '@/schemas/chatRequestSchema';
import { errorResponse } from '@/lib/api/errorResponse';
import { getSession } from '@/lib/api/getSession';
import { getResponse } from '@/lib/LLMs/getResponse';
import { isInappropriateMessage } from '@/lib/LLMs/openai/isInappropriateMessage';
import { createChat, addMessages, touchChat } from '@/db/queries/chat';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return errorResponse('Unauthorized', StatusCodes.UNAUTHORIZED);
    }

    const body = await req.json();
    const result = chatRequestSchema.safeParse(body);
    console.log(result);

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

    const response = await getResponse(provider, messages, settings);

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
        role: 'assistant',
        content: response.content,
        promptTokens: response.usage?.promptTokens,
        completionTokens: response.usage?.completionTokens,
        cost: response.usage?.cost.toString(),
      },
    ]);

    if (chatId) {
      await touchChat(chatId);
    }

    console.log(response);

    return NextResponse.json({
      chatId: resolvedChatId,
      content: response.content,
      usage: response.usage,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return errorResponse(
      'Failed to process request',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
