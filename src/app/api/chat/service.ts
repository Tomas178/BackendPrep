import OpenAI from 'openai';
import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/openai/prompts';
import { ROLES } from '@/constants/roles';
import type { ChatSettings } from '@/types/chat';

const OPENAI_MODEL = 'gpt-4o';

const openai = new OpenAI();

type ChatMessage = {
  role: typeof ROLES.USER | typeof ROLES.ASSISTANT;
  content: string;
};

export function getChatStream(messages: ChatMessage[], settings: ChatSettings) {
  return openai.chat.completions.create({
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

export function toReadableStream(
  stream: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>
) {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });
}
