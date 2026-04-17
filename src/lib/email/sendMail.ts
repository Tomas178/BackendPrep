import type { SendMailOptions, Transporter } from 'nodemailer';
import config from '@/lib/config';

export async function sendMail(
  transporter: Transporter,
  options: SendMailOptions
) {
  await transporter.sendMail({
    from: config.mail.email,
    ...options,
  });
}
