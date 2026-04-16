import type { UsageData } from '@/types/chat';

export function buildUsage(
  promptTokens: number,
  completionTokens: number,
  inputTokenPrice: number,
  outputTokenPrice: number
): UsageData {
  return {
    promptTokens,
    completionTokens,
    cost: promptTokens * inputTokenPrice + completionTokens * outputTokenPrice,
  };
}
