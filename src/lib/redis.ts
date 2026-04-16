import Redis from 'ioredis';
import config from '@/lib/config';
import logger from '@/lib/logger';
import { gracefulShutdownManager } from '@/lib/gracefulShutdown/GracefulShutdownManager';
import { GracefulShutdownPriority } from '@/constants/gracefulShutdownPriority';

const globalForRedis = globalThis as unknown as { redis?: Redis };

export const redis =
  globalForRedis.redis ??
  new Redis(config.redisUrl, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
  });

if (!globalForRedis.redis) {
  redis.on('ready', () => logger.info('Redis connected and ready'));
  redis.on('error', (err) => logger.error('Redis error:', err));

  gracefulShutdownManager.registerCleanup(
    'redis',
    async () => {
      await redis.quit();
    },
    GracefulShutdownPriority.NORMAL
  );

  globalForRedis.redis = redis;
}
