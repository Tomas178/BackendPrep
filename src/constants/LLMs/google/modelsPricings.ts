import { ModelPricing } from '@/types/modelPricing';
import {
  GOOGLE_AVAILABLE_MODELS,
  type GoogleAvailableModels,
} from './availableModels';

export const GOOGLE_MODELS_PRICINGS: Record<
  GoogleAvailableModels,
  ModelPricing
> = {
  [GOOGLE_AVAILABLE_MODELS.GEMINI_2_5_FLASH]: {
    INPUT_TOKEN_PRICE: 0.3 / 1_000_000,
    OUTPUT_TOKEN_PRICE: 2.5 / 1_000_000,
  },
  [GOOGLE_AVAILABLE_MODELS.GEMINI_2_5_FLASH_LITE]: {
    INPUT_TOKEN_PRICE: 0.1 / 1_000_000,
    OUTPUT_TOKEN_PRICE: 0.4 / 1_000_000,
  },
  [GOOGLE_AVAILABLE_MODELS.GEMINI_2_5_FLASH_LITE_PREVIEW]: {
    INPUT_TOKEN_PRICE: 0.1 / 1_000_000,
    OUTPUT_TOKEN_PRICE: 0.4 / 1_000_000,
  },
};

export function getGoogleInputTokenPrice(model: GoogleAvailableModels): number {
  return GOOGLE_MODELS_PRICINGS[model].INPUT_TOKEN_PRICE;
}
export function getGoogleOutputTokenPrice(
  model: GoogleAvailableModels
): number {
  return GOOGLE_MODELS_PRICINGS[model].OUTPUT_TOKEN_PRICE;
}
