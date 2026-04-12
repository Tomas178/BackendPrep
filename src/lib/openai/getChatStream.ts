import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/openai/prompts';
import { openai } from '@/lib/openai/client';
import { ROLES } from '@/constants/openai/enums/roles';
import type { ChatMessage, ChatSettings } from '@/types/chat';

export function getChatStream(messages: ChatMessage[], settings: ChatSettings) {
  return openai().chat.completions.create({
    model: settings.model,
    messages: [
      { role: ROLES.SYSTEM, content: INTERVIEW_SYSTEM_PROMPT },
      ...messages,
    ],
    temperature: settings.temperature,
    top_p: settings.topP,
    max_tokens: settings.maxOutputTokens,
    frequency_penalty: settings.frequencyPenalty,
    presence_penalty: settings.presencePenalty,
    stream: true,
    stream_options: { include_usage: true },
  });
}
