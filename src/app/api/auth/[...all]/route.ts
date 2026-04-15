import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';
import { enforceByIp } from '@/lib/rateLimit';

const handlers = toNextJsHandler(auth);

export const GET = handlers.GET;

export async function POST(req: NextRequest) {
  const limit = await enforceByIp(req);
  if (!limit.ok) return limit.response;
  return handlers.POST(req);
}
