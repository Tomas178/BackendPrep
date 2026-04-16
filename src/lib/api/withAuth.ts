import { NextRequest } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '@/lib/api/errorResponse';
import { getSession } from '@/lib/api/getSession';

type RouteHandler<TContext = unknown> = (
  req: NextRequest,
  context: TContext
) => Promise<Response>;

type AuthedHandler<TContext = unknown> = (
  session: NonNullable<Awaited<ReturnType<typeof getSession>>>,
  req: NextRequest,
  context: TContext
) => Promise<Response>;

export function withAuth<TContext>(
  handler: AuthedHandler<TContext>
): RouteHandler<TContext> {
  return async (req, context) => {
    const session = await getSession();

    if (!session) {
      return errorResponse('Unauthorized', StatusCodes.UNAUTHORIZED);
    }

    return handler(session, req, context);
  };
}
