import type { ObjectValues } from '@/types/utils';

export interface RouteDefinition {
  name: string;
  path: string;
}

export const ROUTES = {
  HOME: { name: 'Home', path: '/' },
  PRACTICE: { name: 'Practice', path: '/practice' },
} as const satisfies Record<string, RouteDefinition>;

export type AppRoute = ObjectValues<typeof ROUTES>;
export type RouteName = AppRoute['name'];
export type RoutePath = AppRoute['path'];
