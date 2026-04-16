import { ObjectValues } from '@/types/utils';

export const GracefulShutdownPriority = {
  CRITICAL: 0,
  HIGH: 10,
  NORMAL: 20,
  LOW: 30,
} as const;

export type GracefulShutdownPriority = ObjectValues<
  typeof GracefulShutdownPriority
>;
