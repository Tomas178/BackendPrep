import { AllModels } from '@/constants/LLMs/allModels';
import { RolesWithoutSystem } from '@/constants/LLMs/roles';

export type ChatSettings = {
  model: AllModels;
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

export type StreamChunk =
  | { type: 'delta'; content: string }
  | { type: 'done'; usage?: UsageData };

export type ChatStreamEvent =
  | { type: 'delta'; content: string }
  | { type: 'done'; chatId: string; usage?: UsageData }
  | { type: 'error'; message: string };
