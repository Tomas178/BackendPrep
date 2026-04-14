import type { ObjectValues } from '@/types/utils';

export interface Route {
  NAME: string;
  PATH: string;
}

export const ROUTES = {
  HOME: { NAME: 'Home', PATH: '/' },
  PRACTICE: { NAME: 'Practice', PATH: '/practice' },
  SIGN_IN: { NAME: 'Sign In', PATH: '/sign-in' },
  SIGN_UP: { NAME: 'Sign Up', PATH: '/sign-up' },
} as const satisfies Record<string, Route>;

export type AppRoute = ObjectValues<typeof ROUTES>;
export type RouteName = AppRoute['NAME'];
export type RoutePath = AppRoute['PATH'];
