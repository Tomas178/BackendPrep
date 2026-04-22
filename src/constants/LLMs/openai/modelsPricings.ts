import { ModelPricing } from '@/types/modelPricing';
import {
  OPENAI_AVAILABLE_MODELS,
  type OpenaiAvailableModels,
} from './availableModels';

// https://developers.openai.com/api/docs/pricing

export const OPENAI_MODELS_PRICINGS: Record<
  OpenaiAvailableModels,
  ModelPricing
> = {
  [OPENAI_AVAILABLE_MODELS.GPT_4_1]: {
    INPUT_TOKEN_PRICE: 2 / 1_000_000,
    OUTPUT_TOKEN_PRICE: 8 / 1_000_000,
  },
  [OPENAI_AVAILABLE_MODELS.GPT_4_1_MINI]: {
    INPUT_TOKEN_PRICE: 0.4 / 1_000_000,
    OUTPUT_TOKEN_PRICE: 1.6 / 1_000_000,
  },
  [OPENAI_AVAILABLE_MODELS.GPT_4_1_NANO]: {
    INPUT_TOKEN_PRICE: 0.1 / 1_000_000,
    OUTPUT_TOKEN_PRICE: 0.4 / 1_000_000,
  },
  [OPENAI_AVAILABLE_MODELS.GPT_4O]: {
    INPUT_TOKEN_PRICE: 2.5 / 1_000_000,
    OUTPUT_TOKEN_PRICE: 10 / 1_000_000,
  },
  [OPENAI_AVAILABLE_MODELS.GPT_4O_MINI]: {
    INPUT_TOKEN_PRICE: 0.15 / 1_000_000,
    OUTPUT_TOKEN_PRICE: 0.6 / 1_000_000,
  },
};

export function getOpenaiInputTokenPrice(model: OpenaiAvailableModels): number {
  return OPENAI_MODELS_PRICINGS[model].INPUT_TOKEN_PRICE;
}

export function getOpenaiOutputTokenPrice(
  model: OpenaiAvailableModels
): number {
  return OPENAI_MODELS_PRICINGS[model].OUTPUT_TOKEN_PRICE;
}
