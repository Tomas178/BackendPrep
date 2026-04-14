import nodemailer from 'nodemailer';
import config from '../config';

export const transporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  secure: config.mail.secure,
  auth: {
    user: config.mail.email,
    pass: config.mail.appPassword,
  },
});
