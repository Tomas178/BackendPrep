import { ObjectValues } from '@/types/utils';

export const GOOGLE_AVAILABLE_MODELS = {
  GEMINI_2_5_FLASH: 'gemini-2.5-flash',
  GEMINI_2_5_FLASH_LITE: 'gemini-2.5-flash-lite',
  GEMINI_2_5_FLASH_LITE_PREVIEW: 'gemini-2.5-flash-lite-preview-09-2025',
} as const;

export type GoogleAvailableModels = ObjectValues<
  typeof GOOGLE_AVAILABLE_MODELS
>;

export const GOOGLE_AVAILABLE_MODELS_VALUES = Object.values(
  GOOGLE_AVAILABLE_MODELS
);
