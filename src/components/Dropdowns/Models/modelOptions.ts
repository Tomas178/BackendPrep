import {
  AVAILABLE_MODELS,
  type AvailableModels,
} from '@/constants/openai/enums/availableModels';

export const MODEL_OPTIONS: {
  value: AvailableModels;
  label: string;
  description: string;
}[] = [
  {
    value: AVAILABLE_MODELS.GPT_4_1,
    label: 'GPT-4.1',
    description: 'Most capable',
  },
  {
    value: AVAILABLE_MODELS.GPT_4_1_MINI,
    label: 'GPT-4.1 mini',
    description: 'Balanced',
  },
  {
    value: AVAILABLE_MODELS.GPT_4_1_NANO,
    label: 'GPT-4.1 nano',
    description: 'Fastest',
  },
  {
    value: AVAILABLE_MODELS.GPT_4O,
    label: 'GPT-4o',
    description: 'Vision + audio',
  },
  {
    value: AVAILABLE_MODELS.GPT_4O_MINI,
    label: 'GPT-4o mini',
    description: 'Fast + affordable',
  },
];
