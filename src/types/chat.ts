import type { OpenaiAvailableModels } from '@/constants/LLMs/openai/availableModels';
import { RolesWithoutSystem } from '@/constants/LLMs/roles';

export type ChatSettings = {
  model: OpenaiAvailableModels;
  temperature: number;
  topP: number;
  maxOutputTokens: number;
  frequencyPenalty: number;
  presencePenalty: number;
};

export type UsageData = {
  promptTokens: number;
  completionTokens: number;
  cost: number;
};

export type ChatMessage = {
  role: RolesWithoutSystem;
  content: string;
  usage?: UsageData;
};
