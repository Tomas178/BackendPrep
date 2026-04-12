import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/LLMs/prompts';
import { ROLES } from '@/constants/LLMs/roles';
import type { ChatMessage, ChatSettings } from '@/types/chat';
import { google } from './client';

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
    },
  });
}
