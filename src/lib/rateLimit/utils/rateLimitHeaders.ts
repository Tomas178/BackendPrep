import { RateLimitResult } from '../types';

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.resetSec),
    ...(result.allowed ? {} : { 'Retry-After': String(result.resetSec) }),
  };
}
