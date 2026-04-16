import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';
import { enforceByIp } from '@/lib/rateLimit/utils/enforcements/custom/enforceByIp';

const handlers = toNextJsHandler(auth);

export const GET = handlers.GET;

export async function POST(req: NextRequest) {
  const rateLimit = await enforceByIp(req);
  if (!rateLimit.ok) {
    return rateLimit.response;
  }

  return handlers.POST(req);
}
