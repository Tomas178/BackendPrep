import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/openai/prompts';
import { openai } from '@/lib/openai/client';
import { ROLES } from '@/constants/roles';
import type { ChatMessage, ChatSettings } from '@/types/chat';

const OPENAI_MODEL = 'gpt-4o';

export function getChatStream(messages: ChatMessage[], settings: ChatSettings) {
  return openai().chat.completions.create({
    model: OPENAI_MODEL,
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
  });
}
