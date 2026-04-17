import { Queue, type DefaultJobOptions } from 'bullmq';
import { EmailTemplate } from '@/constants/emailTemplate';
import { GracefulShutdownPriority } from '@/constants/gracefulShutdownPriority';
import { gracefulShutdownManager } from '@/lib/gracefulShutdown/GracefulShutdownManager';
import { bullmqConnection } from '@/lib/queues/connection';

export interface EmailJobData {
  emailType: EmailTemplate;
  to: string;
  username: string;
  url: string;
}

export const EMAIL_QUEUE_NAME = 'email-queue';
export const EMAIL_JOB_NAME = 'send-email';

export const defaultEmailJobOptions: DefaultJobOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
  removeOnComplete: true,
  removeOnFail: 100,
};

const globalForEmailQueue = globalThis as unknown as {
  emailQueue?: Queue<EmailJobData>;
};

export const emailQueue =
  globalForEmailQueue.emailQueue ??
  new Queue<EmailJobData>(EMAIL_QUEUE_NAME, {
    connection: bullmqConnection,
  });

if (!globalForEmailQueue.emailQueue) {
  gracefulShutdownManager.registerCleanup(
    'email-queue',
    async () => {
      await emailQueue.close();
    },
    GracefulShutdownPriority.LOW
  );
  globalForEmailQueue.emailQueue = emailQueue;
}

export async function addEmailJob(data: EmailJobData) {
  await emailQueue.add(EMAIL_JOB_NAME, data, defaultEmailJobOptions);
}
