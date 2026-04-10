import type { SliderProps } from './Slider';
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
} from '@/constants/openai/settings';

export type SettingKey =
  | 'temperature'
  | 'topP'
  | 'maxOutputTokens'
  | 'frequencyPenalty'
  | 'presencePenalty';

export type SliderConfig = Omit<
  SliderProps,
  'parameter' | 'onParameterChange'
> & {
  key: SettingKey;
};

export const SLIDER_CONFIGS: SliderConfig[] = [
  {
    key: 'temperature',
    label: 'Temperature',
    minValue: MIN_TEMPERATURE,
    maxValue: MAX_TEMPERATURE,
    stepValue: 0.01,
    leftSide: 'Precise',
    rightSide: 'Creative',
  },
  {
    key: 'topP',
    label: 'Top-P',
    minValue: MIN_TOP_P,
    maxValue: MAX_TOP_P,
    stepValue: 0.01,
    leftSide: 'Narrow',
    rightSide: 'Broad',
  },
  {
    key: 'maxOutputTokens',
    label: 'Max Output Tokens',
    minValue: MIN_MAX_OUTPUT_TOKENS,
    maxValue: MAX_MAX_OUTPUT_TOKENS,
    stepValue: 1,
    leftSide: 'Short',
    rightSide: 'Long',
    fixed: false,
  },
  {
    key: 'frequencyPenalty',
    label: 'Frequency Penalty',
    minValue: MIN_FREQUENCY_PENALTY,
    maxValue: MAX_FREQUENCY_PENALTY,
    stepValue: 0.01,
    leftSide: 'Repetitive',
    rightSide: 'Varied',
  },
  {
    key: 'presencePenalty',
    label: 'Presence Penalty',
    minValue: MIN_PRESENCE_PENALTY,
    maxValue: MAX_PRESENCE_PENALTY,
    stepValue: 0.01,
    leftSide: 'Focused',
    rightSide: 'Exploratory',
  },
];
