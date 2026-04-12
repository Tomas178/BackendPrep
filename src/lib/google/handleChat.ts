import { getChatCompletion } from '@/lib/google/getChatCompletion';
import {
  getGoogleInputTokenPrice,
  getGoogleOutputTokenPrice,
} from '@/constants/LLMs/google/modelsPricings';
import type { GoogleAvailableModels } from '@/constants/LLMs/google/availableModels';
import type { ChatMessage, ChatSettings, ChatResponse } from '@/types/chat';

export async function handleGoogle(
  messages: ChatMessage[],
  settings: ChatSettings
): Promise<ChatResponse> {
  const response = await getChatCompletion(messages, settings);
  const content = response.text ?? '';
  const usage = response.usageMetadata;

  const model = settings.model as GoogleAvailableModels;

  return {
    content,
    usage:
      usage?.promptTokenCount != null && usage?.candidatesTokenCount != null
        ? {
            promptTokens: usage.promptTokenCount,
            completionTokens: usage.candidatesTokenCount,
            cost:
              usage.promptTokenCount * getGoogleInputTokenPrice(model) +
              usage.candidatesTokenCount * getGoogleOutputTokenPrice(model),
          }
        : undefined,
  };
}
