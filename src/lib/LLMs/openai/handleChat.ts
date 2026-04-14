import { getChatCompletion } from '@/lib/LLMs/openai/getChatCompletion';
import {
  getOpenaiInputTokenPrice,
  getOpenaiOutputTokenPrice,
} from '@/constants/LLMs/openai/modelsPricings';
import type { OpenaiAvailableModels } from '@/constants/LLMs/openai/availableModels';
import type { ChatMessage, ChatSettings, ChatResponse } from '@/types/chat';
import { openai } from './client';

export async function handleOpenai(
  messages: ChatMessage[],
  settings: ChatSettings
): Promise<ChatResponse> {
  const completion = await getChatCompletion(openai, messages, settings);
  const content = completion.choices[0]?.message?.content ?? '';
  const usage = completion.usage;

  const model = settings.model as OpenaiAvailableModels;

  return {
    content,
    usage: usage
      ? {
          promptTokens: usage.prompt_tokens,
          completionTokens: usage.completion_tokens,
          cost:
            usage.prompt_tokens * getOpenaiInputTokenPrice(model) +
            usage.completion_tokens * getOpenaiOutputTokenPrice(model),
        }
      : undefined,
  };
}
