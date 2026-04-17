import { ObjectValues } from '@/types/utils';

export const EmailTemplate = {
  VERIFY_EMAIL: 'verify-email',
  RESET_PASSWORD: 'reset-password',
} as const;

export type EmailTemplate = ObjectValues<typeof EmailTemplate>;

export const EmailSubject: Record<EmailTemplate, string> = {
  [EmailTemplate.VERIFY_EMAIL]: 'Verify your email address',
  [EmailTemplate.RESET_PASSWORD]: 'Reset your password',
};
