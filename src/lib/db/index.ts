import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import config from '@/lib/config';
import logger from '@/lib/logger';
import { gracefulShutdownManager } from '@/lib/gracefulShutdown/GracefulShutdownManager';
import { GracefulShutdownPriority } from '@/constants/gracefulShutdownPriority';
import * as schema from './schema';

const globalForDb = globalThis as unknown as { pool?: Pool };

export const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: config.databaseUrl,
  });

if (!globalForDb.pool) {
  pool.on('connect', () => logger.info('PostgreSQL pool: client connected'));
  pool.on('error', (err) => logger.error('PostgreSQL pool error:', err));

  gracefulShutdownManager.registerCleanup(
    'postgres-pool',
    () => pool.end(),
    GracefulShutdownPriority.HIGH
  );

  globalForDb.pool = pool;
}

export const db = drizzle(pool, { schema, casing: 'snake_case' });
