import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/LLMs/prompts';
import { ROLES } from '@/constants/LLMs/roles';
import type { ChatMessage, ChatSettings } from '@/types/chat';
import type OpenAI from 'openai';

export function getStream(
  client: OpenAI,
  messages: ChatMessage[],
  settings: ChatSettings
) {
  return client.chat.completions.create({
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
    stream: true,
    stream_options: { include_usage: true },
  });
}
