import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/LLMs/prompts';
import { google } from '@/lib/google/client';
import { ROLES } from '@/constants/LLMs/roles';
import type { ChatMessage, ChatSettings } from '@/types/chat';

export function getChatCompletion(
  messages: ChatMessage[],
  settings: ChatSettings
) {
  return google().models.generateContent({
    model: settings.model,
    contents: messages.map((msg) => ({
      role: msg.role === ROLES.ASSISTANT ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })),
    config: {
      systemInstruction: INTERVIEW_SYSTEM_PROMPT,
      temperature: settings.temperature,
      topP: settings.topP,
      maxOutputTokens: settings.maxOutputTokens,
      frequencyPenalty: settings.frequencyPenalty,
      presencePenalty: settings.presencePenalty,
    },
  });
}
