import { EmailTemplate } from '@/constants/emailTemplate';

interface TemplateData {
  username: string;
  url: string;
}

export function renderTemplate(
  template: EmailTemplate,
  { username, url }: TemplateData
): string {
  switch (template) {
    case EmailTemplate.VERIFY_EMAIL:
      return `
        <p>Hi ${username},</p>
        <p>Click the link below to verify your email address:</p>
        <p><a href="${url}">Verify Email</a></p>
      `;
    case EmailTemplate.RESET_PASSWORD:
      return `
        <p>Hi ${username},</p>
        <p>Click the link below to reset your password:</p>
        <p><a href="${url}">Reset Password</a></p>
      `;
  }
}
