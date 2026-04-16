import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { getRouteLimit } from './config';
import { consume } from './consume';
import { rateLimitHeaders } from './utils/rateLimitHeaders';
import type { EnforceArgs, EnforceResult } from './types';

export async function enforceRouteLimit({
  req,
  pathname,
  identifier,
}: EnforceArgs): Promise<EnforceResult> {
  const path = pathname ?? req.nextUrl.pathname;
  const routeLimit = getRouteLimit(path);
  if (!routeLimit) {
    return { ok: true, result: null };
  }

  const result = await consume(`${path}:${identifier}`, routeLimit);

  if (!result.allowed) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        {
          status: StatusCodes.TOO_MANY_REQUESTS,
          headers: rateLimitHeaders(result),
        }
      ),
    };
  }

  return { ok: true, result };
}
