import type { NextRequest } from 'next/server';
import { enforceRouteLimit } from '../..';
import type { EnforceResult } from '../../types';

type IdentifierResolver<TArgs extends unknown[]> = (
  req: NextRequest,
  ...args: TArgs
) => string;

export function createEnforcement<TArgs extends unknown[] = []>(
  resolveIdentifier: IdentifierResolver<TArgs>
): (req: NextRequest, ...args: TArgs) => Promise<EnforceResult> {
  return (req, ...args) =>
    enforceRouteLimit({ req, identifier: resolveIdentifier(req, ...args) });
}
