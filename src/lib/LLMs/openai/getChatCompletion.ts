import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/LLMs/prompts';
import { openai } from '@/lib/LLMs/openai/client';
import { ROLES } from '@/constants/LLMs/roles';
import type { ChatMessage, ChatSettings } from '@/types/chat';

export function getChatCompletion(
  messages: ChatMessage[],
  settings: ChatSettings
) {
  return openai().chat.completions.create({
    model: settings.model,
    messages: [
      { role: ROLES.SYSTEM, content: INTERVIEW_SYSTEM_PROMPT },
      ...messages,
    ],
    temperature: settings.temperature,
    top_p: settings.topP,
    max_completion_tokens: settings.maxOutputTokens,
    frequency_penalty: settings.frequencyPenalty,
    presence_penalty: settings.presencePenalty,
  });
}
