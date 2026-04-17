import { Job, Worker } from 'bullmq';
import { EmailSubject } from '@/constants/emailTemplate';
import { GracefulShutdownPriority } from '@/constants/gracefulShutdownPriority';
import { gracefulShutdownManager } from '@/lib/gracefulShutdown/GracefulShutdownManager';
import logger from '@/lib/logger';
import { transporter } from '@/lib/email/client';
import { renderTemplate } from '@/lib/email/renderTemplate';
import { sendMail } from '@/lib/email/sendMail';
import { EMAIL_QUEUE_NAME, type EmailJobData } from '@/lib/queues/email';
import { bullmqConnection } from '@/lib/queues/connection';

const CONCURRENT_PROCESSES = 5;

export async function processEmailJob(job: Job<EmailJobData>) {
  const { emailType, to, username, url } = job.data;

  logger.info(`Processing email job ${job.id}: ${emailType} for ${to}`);

  const html = renderTemplate(emailType, { username, url });
  const subject = EmailSubject[emailType];

  try {
    await sendMail(transporter, { to, subject, html });
    logger.info(`Email sent successfully to ${to}`);
  } catch (err) {
    logger.error(`Email failed to ${to}: ${err}`);
    throw err;
  }
}

const globalForEmailWorker = globalThis as unknown as {
  emailWorker?: Worker<EmailJobData>;
};

export const emailWorker =
  globalForEmailWorker.emailWorker ??
  new Worker<EmailJobData>(EMAIL_QUEUE_NAME, processEmailJob, {
    connection: bullmqConnection,
    concurrency: CONCURRENT_PROCESSES,
  });

if (!globalForEmailWorker.emailWorker) {
  gracefulShutdownManager.registerCleanup(
    'email-worker',
    async () => {
      await emailWorker.close();
    },
    GracefulShutdownPriority.LOW
  );

  emailWorker.on('ready', () => {
    logger.info(`Email worker ready. Listening on ${EMAIL_QUEUE_NAME}`);
  });

  emailWorker.on('failed', (job, err) => {
    logger.error(
      `Email job ${job?.id} failed (attempt ${job?.attemptsMade}): ${err.message}`
    );
  });

  emailWorker.on('error', (err) => {
    logger.error(`Email worker error: ${err.message}`);
  });

  globalForEmailWorker.emailWorker = emailWorker;
}
