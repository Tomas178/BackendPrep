import {
  OPENAI_AVAILABLE_MODELS,
  type OpenaiAvailableModels,
} from '@/constants/LLMs/openai/availableModels';

export const OPENAI_MODEL_OPTIONS: {
  value: OpenaiAvailableModels;
  label: string;
  description: string;
}[] = [
  {
    value: OPENAI_AVAILABLE_MODELS.GPT_4_1,
    label: 'GPT-4.1',
    description: 'Most capable',
  },
  {
    value: OPENAI_AVAILABLE_MODELS.GPT_4_1_MINI,
    label: 'GPT-4.1 mini',
    description: 'Balanced',
  },
  {
    value: OPENAI_AVAILABLE_MODELS.GPT_4_1_NANO,
    label: 'GPT-4.1 nano',
    description: 'Fastest',
  },
  {
    value: OPENAI_AVAILABLE_MODELS.GPT_4O,
    label: 'GPT-4o',
    description: 'Vision + audio',
  },
  {
    value: OPENAI_AVAILABLE_MODELS.GPT_4O_MINI,
    label: 'GPT-4o mini',
    description: 'Fast + affordable',
  },
];
