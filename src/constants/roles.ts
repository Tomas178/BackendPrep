import { ObjectValues } from '@/types/utils';

export const ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
} as const;

export type Roles = ObjectValues<typeof ROLES>;
export type RolesWithoutSystem = Exclude<Roles, 'system'>;
