import nodemailer from 'nodemailer';
import config from './config';

let _transporter: nodemailer.Transporter;

function getTransporter() {
  if (!_transporter) {
    const { host, port, secure, email, appPassword } = config().mail;

    _transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: email,
        pass: appPassword,
      },
    });
  }
  return _transporter;
}

export function sendVerificationEmail(to: string, url: string) {
  void getTransporter().sendMail({
    from: config().mail.email,
    to,
    subject: 'Verify your email address',
    html: `<p>Click the link below to verify your email address:</p>
           <p><a href="${url}">Verify Email</a></p>`,
  });
}
