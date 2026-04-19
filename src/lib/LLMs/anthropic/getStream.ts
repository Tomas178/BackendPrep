import { INTERVIEW_SYSTEM_PROMPT } from '@/constants/LLMs/prompts';
import { ANTHROPIC_AVAILABLE_MODELS } from '@/constants/LLMs/anthropic/availableModels';
import type { ChatMessage, ChatSettings } from '@/types/chat';
import type Anthropic from '@anthropic-ai/sdk';

const MODELS_WITHOUT_TEMPERATURE: string[] = [
  ANTHROPIC_AVAILABLE_MODELS.CLAUDE_OPUS_4_7,
];

export function getStream(
  client: Anthropic,
  messages: ChatMessage[],
  settings: ChatSettings
) {
  const supportsTemperature = !MODELS_WITHOUT_TEMPERATURE.includes(
    settings.model
  );
  const temperatureParam = supportsTemperature
    ? { temperature: Math.min(settings.temperature, 1) }
    : {};

  return client.messages.stream({
    model: settings.model,
    system: INTERVIEW_SYSTEM_PROMPT,
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    max_tokens: settings.maxOutputTokens,
    ...temperatureParam,
  });
}
