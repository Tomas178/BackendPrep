import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/LLMs/prompts';
import type { ChatMessage, ChatSettings } from '@/types/chat';
import type Anthropic from '@anthropic-ai/sdk';
import type { APIPromise } from '@anthropic-ai/sdk';
import type { Message } from '@anthropic-ai/sdk/resources';

export function getChatCompletion(
  client: Anthropic,
  messages: ChatMessage[],
  settings: ChatSettings
): APIPromise<Message> {
  return client.messages.create({
    model: settings.model,
    system: INTERVIEW_SYSTEM_PROMPT,
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    max_tokens: settings.maxOutputTokens,
    temperature: Math.min(settings.temperature, 1),
  });
}
