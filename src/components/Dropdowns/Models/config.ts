import type { OpenaiAvailableModels } from '@/constants/LLMs/openai/availableModels';
import type { AnthropicAvailableModels } from '@/constants/LLMs/anthropic/availableModels';
import type { GoogleAvailableModels } from '@/constants/LLMs/google/availableModels';
import {
  AVAILABLE_LLMS,
  type AvailableLLMs,
} from '@/constants/LLMs/availableLLMs';
import {
  ALL_AVAILABLE_MODELS,
  type AllModels,
} from '@/constants/LLMs/allModels';

type ModelOption<T extends AllModels = AllModels> = {
  value: T;
  label: string;
  description: string;
};

const OPENAI_MODEL_OPTIONS: ModelOption<OpenaiAvailableModels>[] = [
  {
    value: ALL_AVAILABLE_MODELS.OPENAI.GPT_4_1,
    label: 'GPT-4.1',
    description: 'Most capable',
  },
  {
    value: ALL_AVAILABLE_MODELS.OPENAI.GPT_4_1_MINI,
    label: 'GPT-4.1 mini',
    description: 'Balanced',
  },
  {
    value: ALL_AVAILABLE_MODELS.OPENAI.GPT_4_1_NANO,
    label: 'GPT-4.1 nano',
    description: 'Fastest',
  },
  {
    value: ALL_AVAILABLE_MODELS.OPENAI.GPT_4O,
    label: 'GPT-4o',
    description: 'Vision + audio',
  },
  {
    value: ALL_AVAILABLE_MODELS.OPENAI.GPT_4O_MINI,
    label: 'GPT-4o mini',
    description: 'Fast + affordable',
  },
];

const ANTHROPIC_MODEL_OPTIONS: ModelOption<AnthropicAvailableModels>[] = [
  {
    value: ALL_AVAILABLE_MODELS.ANTHROPIC.CLAUDE_OPUS_4_7,
    label: 'Claude Opus 4.7',
    description: 'Newest Release',
  },
  {
    value: ALL_AVAILABLE_MODELS.ANTHROPIC.CLAUDE_OPUS_4_6,
    label: 'Claude Opus 4.6',
    description: 'Second Best',
  },
  {
    value: ALL_AVAILABLE_MODELS.ANTHROPIC.CLAUDE_SONNET_4_6,
    label: 'Claude Sonnet 4.6',
    description: 'Balanced',
  },
  {
    value: ALL_AVAILABLE_MODELS.ANTHROPIC.CLAUDE_HAIKU_4_5,
    label: 'Claude Haiku 4.5',
    description: 'Fastest',
  },
];

const GOOGLE_MODEL_OPTIONS: ModelOption<GoogleAvailableModels>[] = [
  {
    value: ALL_AVAILABLE_MODELS.GOOGLE.GEMINI_2_5_FLASH,
    label: 'Gemini 2.5 Flash',
    description: 'Most capable',
  },
  {
    value: ALL_AVAILABLE_MODELS.GOOGLE.GEMINI_2_5_FLASH_LITE,
    label: 'Gemini 2.5 Flash Lite',
    description: 'Balanced',
  },
];

export const MODEL_OPTIONS: Record<AvailableLLMs, ModelOption[]> = {
  [AVAILABLE_LLMS.OPENAI]: OPENAI_MODEL_OPTIONS,
  [AVAILABLE_LLMS.ANTHROPIC]: ANTHROPIC_MODEL_OPTIONS,
  [AVAILABLE_LLMS.GOOGLE]: GOOGLE_MODEL_OPTIONS,
};
