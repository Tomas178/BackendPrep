import { AvailableModels } from '@/constants/openai/enums/availableModels';
import { RolesWithoutSystem } from '@/constants/openai/enums/roles';

export type ChatSettings = {
  model: AvailableModels;
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
