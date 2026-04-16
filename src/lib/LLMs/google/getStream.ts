import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/LLMs/prompts';
import { toGoogleRole } from '@/constants/LLMs/google/roles';
import type { ChatMessage, ChatSettings } from '@/types/chat';
import type { GoogleGenAI } from '@google/genai';

export function getStream(
  client: GoogleGenAI,
  messages: ChatMessage[],
  settings: ChatSettings
) {
  return client.models.generateContentStream({
    model: settings.model,
    contents: messages.map((msg) => ({
      role: toGoogleRole[msg.role],
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
