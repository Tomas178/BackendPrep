import { streamResponse } from '@/lib/LLMs/streamResponse';
import { createChat, addMessages, touchChat } from '@/db/queries/chat';
import { ROLES } from '@/constants/LLMs/roles';
import { encodeSSE } from '@/lib/sse';
import type { AvailableLLMs } from '@/constants/LLMs/availableLLMs';
import type { ChatMessage, ChatSettings } from '@/types/chat';

export function createChatSSEStream({
  chatId,
  userId,
  messages,
  provider,
  settings,
}: {
  chatId: string | null;
  userId: string;
  messages: ChatMessage[];
  provider: AvailableLLMs;
  settings: ChatSettings;
}): ReadableStream<Uint8Array> {
  const lastMessage = messages.at(-1)!;

  return new ReadableStream({
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
                  userId,
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

            if (chatId) await touchChat(chatId);

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
          encodeSSE({ type: 'error', message: 'Failed to process request' })
        );
      } finally {
        controller.close();
      }
    },
  });
}
