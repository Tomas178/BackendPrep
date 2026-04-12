import { AVAILABLE_LLMS, AvailableLLMs } from '@/constants/LLMs/availableLLMs';
import type { ChatMessage, ChatResponse, ChatSettings } from '@/types/chat';
import { handleOpenai } from './openai/handleChat';
import { handleAnthropic } from './anthropic/handleChat';
import { handleGoogle } from './google/handleChat';

export async function getResponse(
  provider: AvailableLLMs,
  messages: ChatMessage[],
  settings: ChatSettings
): Promise<ChatResponse> {
  switch (provider) {
    case AVAILABLE_LLMS.OPENAI:
      return await handleOpenai(messages, settings);
    case AVAILABLE_LLMS.ANTHROPIC:
      return await handleAnthropic(messages, settings);
    case AVAILABLE_LLMS.GOOGLE:
      return await handleGoogle(messages, settings);
  }
}
