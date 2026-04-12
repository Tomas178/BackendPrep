import { ObjectValues } from '@/types/utils';

export const AVAILABLE_LLMS = {
  OPENAI: 'openai',
  GOOGLE: 'google',
  ANTHROPIC: 'anthropic',
} as const;

export type AvailableLLMs = ObjectValues<typeof AVAILABLE_LLMS>;

export const AVAILABLE_LLMS_VALUES = Object.values(AVAILABLE_LLMS);
