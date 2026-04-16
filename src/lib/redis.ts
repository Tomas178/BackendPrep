import Redis from 'ioredis';
import config from '@/lib/config';
import logger from '@/lib/logger';

export const redis = new Redis(config.redisUrl, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
});

redis.on('ready', () => logger.info('Redis connected and ready'));
redis.on('error', (err) => logger.error('Redis error:', err));
