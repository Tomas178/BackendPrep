import Redis from 'ioredis';
import config from '@/lib/config';

const globalForBullmq = globalThis as unknown as {
  bullmqConnection?: Redis;
};

export const bullmqConnection =
  globalForBullmq.bullmqConnection ??
  new Redis(config.redisUrl, {
    maxRetriesPerRequest: null,
  });

if (!globalForBullmq.bullmqConnection) {
  globalForBullmq.bullmqConnection = bullmqConnection;
}
