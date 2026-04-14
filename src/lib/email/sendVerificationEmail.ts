import type nodemailer from 'nodemailer';

export function sendVerificationEmail(
  transporter: nodemailer.Transporter,
  from: string,
  to: string,
  url: string
) {
  void transporter.sendMail({
    from,
    to,
    subject: 'Verify your email address',
    html: `<p>Click the link below to verify your email address:</p>
           <p><a href="${url}">Verify Email</a></p>`,
  });
}
