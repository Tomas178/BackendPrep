import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';
import { enforceByIp } from '@/lib/rateLimit/utils/enforcements/custom/enforceByIp';
import { withErrorHandling } from '@/lib/api/withErrorHandling';
import RateLimitError from '@/lib/errors/RateLimitError';

const handlers = toNextJsHandler(auth);

export const GET = handlers.GET;

export const POST = withErrorHandling(async (req: NextRequest) => {
  const rateLimit = await enforceByIp(req);
  if (!rateLimit.ok) {
    throw new RateLimitError(rateLimit.result);
  }

  return handlers.POST(req);
});
