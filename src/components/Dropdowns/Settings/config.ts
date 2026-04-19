import type { SliderProps } from './Slider';
import { AVAILABLE_LLMS } from '@/constants/LLMs/availableLLMs';
import { ALL_AVAILABLE_MODELS } from '@/constants/LLMs/allModels';
import {
  MAX_FREQUENCY_PENALTY,
  MAX_MAX_OUTPUT_TOKENS,
  MAX_PRESENCE_PENALTY,
  MAX_TEMPERATURE,
  MAX_TOP_P,
  MIN_FREQUENCY_PENALTY,
  MIN_MAX_OUTPUT_TOKENS,
  MIN_PRESENCE_PENALTY,
  MIN_TEMPERATURE,
  MIN_TOP_P,
} from '@/constants/LLMs/settings';

export type SettingKey =
  | 'temperature'
  | 'topP'
  | 'maxOutputTokens'
  | 'frequencyPenalty'
  | 'presencePenalty';

export type SliderConfig = Omit<
  SliderProps,
  'parameter' | 'onParameterChange' | 'disabled'
> & {
  key: SettingKey;
  unsupportedProviders?: string[];
  unsupportedModels?: string[];
  maxValueOverrides?: Partial<Record<string, number>>;
};

export const SLIDER_CONFIGS: SliderConfig[] = [
  {
    key: 'temperature',
    label: 'Temperature',
    minValue: MIN_TEMPERATURE,
    maxValue: MAX_TEMPERATURE,
    stepValue: 0.01,
    explanatoryTextForMinValue: 'Precise',
    explanatoryTextForMaxValue: 'Creative',
    maxValueOverrides: { [AVAILABLE_LLMS.ANTHROPIC]: 1 },
    unsupportedModels: [ALL_AVAILABLE_MODELS.ANTHROPIC.CLAUDE_OPUS_4_7],
  },
  {
    key: 'topP',
    label: 'Top-P',
    minValue: MIN_TOP_P,
    maxValue: MAX_TOP_P,
    stepValue: 0.01,
    explanatoryTextForMinValue: 'Narrow',
    explanatoryTextForMaxValue: 'Broad',
    unsupportedProviders: [AVAILABLE_LLMS.ANTHROPIC],
  },
  {
    key: 'maxOutputTokens',
    label: 'Max Output Tokens',
    minValue: MIN_MAX_OUTPUT_TOKENS,
    maxValue: MAX_MAX_OUTPUT_TOKENS,
    stepValue: 1,
    explanatoryTextForMinValue: 'Short',
    explanatoryTextForMaxValue: 'Long',
    fixed: false,
  },
  {
    key: 'frequencyPenalty',
    label: 'Frequency Penalty',
    minValue: MIN_FREQUENCY_PENALTY,
    maxValue: MAX_FREQUENCY_PENALTY,
    stepValue: 0.01,
    explanatoryTextForMinValue: 'Repetitive',
    explanatoryTextForMaxValue: 'Varied',
    unsupportedProviders: [AVAILABLE_LLMS.ANTHROPIC, AVAILABLE_LLMS.GOOGLE],
  },
  {
    key: 'presencePenalty',
    label: 'Presence Penalty',
    minValue: MIN_PRESENCE_PENALTY,
    maxValue: MAX_PRESENCE_PENALTY,
    stepValue: 0.01,
    explanatoryTextForMinValue: 'Focused',
    explanatoryTextForMaxValue: 'Exploratory',
    unsupportedProviders: [AVAILABLE_LLMS.ANTHROPIC, AVAILABLE_LLMS.GOOGLE],
  },
];
