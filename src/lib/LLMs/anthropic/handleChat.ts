import { getChatCompletion } from '@/lib/LLMs/anthropic/getChatCompletion';
import {
  getAnthropicInputTokenPrice,
  getAnthropicOutputTokenPrice,
} from '@/constants/LLMs/anthropic/modelsPricings';
import type { AnthropicAvailableModels } from '@/constants/LLMs/anthropic/availableModels';
import type { ChatMessage, ChatResponse, ChatSettings } from '@/types/chat';

export async function handleAnthropic(
  messages: ChatMessage[],
  settings: ChatSettings
): Promise<ChatResponse> {
  const response = await getChatCompletion(messages, settings);
  const textBlock = response.content.find((block) => block.type === 'text');
  const content = textBlock && 'text' in textBlock ? textBlock.text : '';
  const usage = response.usage;

  const model = settings.model as AnthropicAvailableModels;

  return {
    content,
    usage: {
      promptTokens: usage.input_tokens,
      completionTokens: usage.output_tokens,
      cost:
        usage.input_tokens * getAnthropicInputTokenPrice(model) +
        usage.output_tokens * getAnthropicOutputTokenPrice(model),
    },
  };
}
