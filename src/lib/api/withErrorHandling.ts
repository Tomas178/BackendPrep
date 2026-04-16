import { NextRequest } from 'next/server';
import logger from '@/lib/logger';
import { errorResponse } from '@/lib/api/errorResponse';
import ApiError from '@/lib/errors/ApiError';
import { StatusCodes } from 'http-status-codes';

type RouteHandler<TContext = unknown> = (
  req: NextRequest,
  context: TContext
) => Promise<Response>;

export function withErrorHandling<TContext>(
  handler: RouteHandler<TContext>
): RouteHandler<TContext> {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      if (error instanceof ApiError) {
        return errorResponse(error.message, error.status, error.headers);
      }

      logger.error('Unexpected API error:', error);
      return errorResponse(
        'Internal Server Error',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };
}
