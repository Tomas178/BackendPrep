import type OpenAI from 'openai';
import {
  getInputTokenPrice,
  getOutputTokenPrice,
} from '@/constants/openai/enums/modelsPricings';
import { AvailableModels } from '@/constants/openai/enums/availableModels';

export const USAGE_SEPARATOR = '\0';

export function toReadableStream(
  stream: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>,
  model: AvailableModels
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
          usage.prompt_tokens * getInputTokenPrice(model) +
          usage.completion_tokens * getOutputTokenPrice(model);

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
