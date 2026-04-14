import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import { ROUTES } from './constants/routes';
import appConfig from '@/lib/config';

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: appConfig.betterAuth.cookiePrefix,
  });
  if (!sessionCookie) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN.PATH, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/practice'],
};
