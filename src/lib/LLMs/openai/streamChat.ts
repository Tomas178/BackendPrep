import {
  getOpenaiInputTokenPrice,
  getOpenaiOutputTokenPrice,
} from '@/constants/LLMs/openai/modelsPricings';
import type { OpenaiAvailableModels } from '@/constants/LLMs/openai/availableModels';
import type {
  ChatMessage,
  ChatSettings,
  StreamChunk,
  UsageData,
} from '@/types/chat';
import { getStream } from './getStream';
import { openai } from './client';
import { buildUsage } from '../utils';

export async function* streamOpenai(
  messages: ChatMessage[],
  settings: ChatSettings
): AsyncGenerator<StreamChunk> {
  const stream = await getStream(openai, messages, settings);
  let usage: UsageData | undefined;

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield { type: 'delta', content };
    }

    if (chunk.usage) {
      const model = settings.model as OpenaiAvailableModels;
      usage = buildUsage(
        chunk.usage.prompt_tokens,
        chunk.usage.completion_tokens,
        getOpenaiInputTokenPrice(model),
        getOpenaiOutputTokenPrice(model)
      );
    }
  }

  yield { type: 'done', usage };
}
