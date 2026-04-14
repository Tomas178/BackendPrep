import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/LLMs/prompts';
import { ROLES } from '@/constants/LLMs/roles';
import type { ChatMessage, ChatSettings } from '@/types/chat';
import type { GoogleGenAI } from '@google/genai';

export function getChatCompletion(
  client: GoogleGenAI,
  messages: ChatMessage[],
  settings: ChatSettings
) {
  return client.models.generateContent({
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
