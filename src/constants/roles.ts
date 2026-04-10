import { ObjectValues } from '@/types/utils';

export const ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
} as const;

export type Roles = ObjectValues<typeof ROLES>;
