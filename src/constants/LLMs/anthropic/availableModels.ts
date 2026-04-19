import { ObjectValues } from '@/types/utils';

export const ANTHROPIC_AVAILABLE_MODELS = {
  CLAUDE_OPUS_4_7: 'claude-opus-4-7',
  CLAUDE_OPUS_4_6: 'claude-opus-4-6',
  CLAUDE_SONNET_4_6: 'claude-sonnet-4-6',
  CLAUDE_HAIKU_4_5: 'claude-haiku-4-5-20251001',
} as const;

export type AnthropicAvailableModels = ObjectValues<
  typeof ANTHROPIC_AVAILABLE_MODELS
>;

export const ANTHROPIC_AVAILABLE_MODELS_VALUES = Object.values(
  ANTHROPIC_AVAILABLE_MODELS
);
