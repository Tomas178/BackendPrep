import type { RolesWithoutSystem } from '../roles';
import type { ObjectValues } from '@/types/utils';

export const GOOGLE_ROLES = {
  USER: 'user',
  ASSISTANT: 'model',
} as const;

type GoogleRole = ObjectValues<typeof GOOGLE_ROLES>;

export const toGoogleRole: Record<RolesWithoutSystem, GoogleRole> = {
  user: GOOGLE_ROLES.USER,
  assistant: GOOGLE_ROLES.ASSISTANT,
};
