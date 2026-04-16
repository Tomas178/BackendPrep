export type RouteLimit = {
  requests: number;
  window: number;
};

export const SECURITY_LIMITS: Record<string, RouteLimit> = {
  '/api/chat': { requests: 20, window: 60 },

  '/api/auth/sign-up/email': { requests: 3, window: 60 },
  '/api/auth/sign-in/email': { requests: 5, window: 60 },
  '/api/auth/forget-password': { requests: 2, window: 300 },
  '/api/auth/reset-password': { requests: 3, window: 300 },
  '/api/auth/send-verification-email': { requests: 3, window: 300 },
  '/api/auth/verify-email': { requests: 10, window: 60 },
};

export function getRouteLimit(pathname: string): RouteLimit | null {
  return SECURITY_LIMITS[pathname] ?? null;
}
