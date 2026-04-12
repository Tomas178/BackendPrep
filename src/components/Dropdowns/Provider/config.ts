import {
  AVAILABLE_LLMS,
  type AvailableLLMs,
} from '@/constants/LLMs/availableLLMs';

type ProviderOption = {
  value: AvailableLLMs;
  label: string;
};

export const PROVIDER_OPTIONS: ProviderOption[] = [
  { value: AVAILABLE_LLMS.OPENAI, label: 'OpenAI' },
  { value: AVAILABLE_LLMS.ANTHROPIC, label: 'Anthropic' },
  { value: AVAILABLE_LLMS.GOOGLE, label: 'Google' },
];
