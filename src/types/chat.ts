import { RolesWithoutSystem } from '@/constants/roles';

export type ChatSettings = {
  temperature: number;
  topP: number;
  maxOutputTokens: number;
  frequencyPenalty: number;
  presencePenalty: number;
};

export type ChatMessage = {
  role: RolesWithoutSystem;
  content: string;
};
