import {
  getGoogleInputTokenPrice,
  getGoogleOutputTokenPrice,
} from '@/constants/LLMs/google/modelsPricings';
import type { GoogleAvailableModels } from '@/constants/LLMs/google/availableModels';
import type {
  ChatMessage,
  ChatSettings,
  StreamChunk,
  UsageData,
} from '@/types/chat';
import { getStream } from './getStream';
import { google } from './client';
import { buildUsage } from '../utils';

export async function* streamGoogle(
  messages: ChatMessage[],
  settings: ChatSettings
): AsyncGenerator<StreamChunk> {
  const response = await getStream(google, messages, settings);
  let usage: UsageData | undefined;

  for await (const chunk of response) {
    const text = chunk.text;
    if (text) {
      yield { type: 'delta', content: text };
    }

    if (
      chunk.usageMetadata?.promptTokenCount != null &&
      chunk.usageMetadata?.candidatesTokenCount != null
    ) {
      const model = settings.model as GoogleAvailableModels;
      usage = buildUsage(
        chunk.usageMetadata.promptTokenCount,
        chunk.usageMetadata.candidatesTokenCount,
        getGoogleInputTokenPrice(model),
        getGoogleOutputTokenPrice(model)
      );
    }
  }

  yield { type: 'done', usage };
}
