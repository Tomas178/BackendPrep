import { ModelPricing } from '@/types/modelPricing';
import {
  ANTHROPIC_AVAILABLE_MODELS,
  type AnthropicAvailableModels,
} from './availableModels';

export const ANTHROPIC_MODELS_PRICINGS: Record<
  AnthropicAvailableModels,
  ModelPricing
> = {
  [ANTHROPIC_AVAILABLE_MODELS.CLAUDE_OPUS_4_7]: {
    INPUT_TOKEN_PRICE: 5 / 1_000_000,
    OUTPUT_TOKEN_PRICE: 25 / 1_000_000,
  },
  [ANTHROPIC_AVAILABLE_MODELS.CLAUDE_OPUS_4_6]: {
    INPUT_TOKEN_PRICE: 5 / 1_000_000,
    OUTPUT_TOKEN_PRICE: 25 / 1_000_000,
  },
  [ANTHROPIC_AVAILABLE_MODELS.CLAUDE_SONNET_4_6]: {
    INPUT_TOKEN_PRICE: 3 / 1_000_000,
    OUTPUT_TOKEN_PRICE: 15 / 1_000_000,
  },
  [ANTHROPIC_AVAILABLE_MODELS.CLAUDE_HAIKU_4_5]: {
    INPUT_TOKEN_PRICE: 1 / 1_000_000,
    OUTPUT_TOKEN_PRICE: 5 / 1_000_000,
  },
};

export function getAnthropicInputTokenPrice(
  model: AnthropicAvailableModels
): number {
  return ANTHROPIC_MODELS_PRICINGS[model].INPUT_TOKEN_PRICE;
}
export function getAnthropicOutputTokenPrice(
  model: AnthropicAvailableModels
): number {
  return ANTHROPIC_MODELS_PRICINGS[model].OUTPUT_TOKEN_PRICE;
}
