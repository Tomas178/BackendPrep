import { StatusCodes } from 'http-status-codes';
import ApiError from './ApiError';
import { rateLimitHeaders } from '@/lib/rateLimit/utils/rateLimitHeaders';
import type { RateLimitResult } from '@/lib/rateLimit/types';

export default class RateLimitError extends ApiError {
  constructor(result: RateLimitResult) {
    super(
      'Too many requests. Please slow down.',
      StatusCodes.TOO_MANY_REQUESTS,
      rateLimitHeaders(result)
    );
  }
}
