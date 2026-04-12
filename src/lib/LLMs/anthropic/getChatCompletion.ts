import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/LLMs/prompts';
import { anthropic } from '@/lib/LLMs/anthropic/client';
import type { ChatMessage, ChatSettings } from '@/types/chat';

export function getChatCompletion(
  messages: ChatMessage[],
  settings: ChatSettings
) {
  return anthropic().messages.create({
    model: settings.model,
    system: INTERVIEW_SYSTEM_PROMPT,
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    max_tokens: settings.maxOutputTokens,
    temperature: settings.temperature,
    top_p: settings.topP,
  });
}
