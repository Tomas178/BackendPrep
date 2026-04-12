import type OpenAI from 'openai';
import {
  INPUT_TOKEN_PRICE,
  OUTPUT_TOKEN_PRICE,
} from '@/constants/openai/pricing';

export const USAGE_SEPARATOR = '\0';

export function toReadableStream(
  stream: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>
) {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      let usage: OpenAI.CompletionUsage | undefined;

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
        if (chunk.usage) {
          usage = chunk.usage;
        }
      }

      if (usage) {
        const cost =
          usage.prompt_tokens * INPUT_TOKEN_PRICE +
          usage.completion_tokens * OUTPUT_TOKEN_PRICE;

        const usageData = JSON.stringify({
          promptTokens: usage.prompt_tokens,
          completionTokens: usage.completion_tokens,
          cost,
        });

        controller.enqueue(encoder.encode(USAGE_SEPARATOR + usageData));
      }

      controller.close();
    },
  });
}
