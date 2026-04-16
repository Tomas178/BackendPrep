import {
  AVAILABLE_LLMS,
  type AvailableLLMs,
} from '@/constants/LLMs/availableLLMs';
import type { ChatMessage, ChatSettings, StreamChunk } from '@/types/chat';
import { streamOpenai } from './openai/streamChat';
import { streamAnthropic } from './anthropic/streamChat';
import { streamGoogle } from './google/streamChat';

export function streamResponse(
  provider: AvailableLLMs,
  messages: ChatMessage[],
  settings: ChatSettings
): AsyncGenerator<StreamChunk> {
  switch (provider) {
    case AVAILABLE_LLMS.OPENAI:
      return streamOpenai(messages, settings);
    case AVAILABLE_LLMS.ANTHROPIC:
      return streamAnthropic(messages, settings);
    case AVAILABLE_LLMS.GOOGLE:
      return streamGoogle(messages, settings);
  }
}
