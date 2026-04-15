import { redis } from '@/lib/redis';
import { formatRateLimitKey } from './utils/formatRateLimitKey';
import type { RouteLimit } from './config';
import type { RateLimitResult } from './types';

export async function consume(
  key: string,
  limit: RouteLimit
): Promise<RateLimitResult> {
  const redisKey = formatRateLimitKey(key);
  const [countEntry, ttlEntry] = (await redis
    .multi()
    .incr(redisKey)
    .ttl(redisKey)
    .exec())!;

  console.log({
    redis: {
      countEntry,
      ttlEntry,
    },
  });

  const count = Number(countEntry[1]);
  const ttl = Number(ttlEntry[1]);

  if (ttl < 0) {
    await redis.expire(redisKey, limit.window);
  }

  const resetSec = ttl < 0 ? limit.window : ttl;
  const remaining = Math.max(0, limit.requests - count);

  return {
    allowed: count <= limit.requests,
    remaining,
    limit: limit.requests,
    resetSec,
  };
}
