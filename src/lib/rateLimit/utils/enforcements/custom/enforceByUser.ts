import { createEnforcement } from '../factory';

export const enforceByUser = createEnforcement<[userId: string]>(
  (_req, userId) => `user:${userId}`
);
