import { ObjectValues } from '@/types/utils';

export const SUPPORTED_OAUTH_PROVIDERS = {
  GITHUB: 'github',
  GOOGLE: 'google',
} as const;

export type SupportedOAuthProviders = ObjectValues<
  typeof SUPPORTED_OAUTH_PROVIDERS
>;
