import { NextRequest } from 'next/server';
import { getSession } from '@/lib/api/getSession';
import UnauthorizedError from '@/lib/errors/UnauthorizedError';

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
      throw new UnauthorizedError();
    }

    return handler(session, req, context);
  };
}
