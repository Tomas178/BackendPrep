import { getRouteLimit } from './config';
import { consume } from './consume';
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
    return { ok: false, result };
  }

  return { ok: true, result };
}
