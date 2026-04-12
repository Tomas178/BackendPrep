import { ObjectValues } from '@/types/utils';

export const OPENAI_AVAILABLE_MODELS = {
  GPT_4_1: 'gpt-4.1',
  GPT_4_1_MINI: 'gpt-4.1-mini',
  GPT_4_1_NANO: 'gpt-4.1-nano',
  GPT_4O: 'gpt-4o',
  GPT_4O_MINI: 'gpt-4o-mini',
} as const;

export type OpenaiAvailableModels = ObjectValues<
  typeof OPENAI_AVAILABLE_MODELS
>;

export const OPENAI_AVAILABLE_MODEL_VALUES = Object.values(
  OPENAI_AVAILABLE_MODELS
);
