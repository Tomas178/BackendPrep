import nodemailer, { type TransportOptions } from 'nodemailer';
import config from '@/lib/config';
import logger from '@/lib/logger';
import { gracefulShutdownManager } from '@/lib/gracefulShutdown/GracefulShutdownManager';
import { GracefulShutdownPriority } from '@/constants/gracefulShutdownPriority';

const globalForTransporter = globalThis as unknown as {
  mailTransporter?: nodemailer.Transporter;
};

function createTransporter() {
  const options = {
    port: config.mail.port,
    service: config.mail.service,
    secure: config.mail.secure,
    auth: {
      user: config.mail.email,
      pass: config.mail.pass,
    },
  };

  return nodemailer.createTransport(options as TransportOptions);
}

export const transporter =
  globalForTransporter.mailTransporter ?? createTransporter();

if (!globalForTransporter.mailTransporter) {
  gracefulShutdownManager.registerCleanup(
    'nodemailer',
    () => transporter.close(),
    GracefulShutdownPriority.NORMAL
  );
  logger.info('E-mail transporter initialised');
  globalForTransporter.mailTransporter = transporter;
}
