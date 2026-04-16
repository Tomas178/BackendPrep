import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import config from '@/lib/config';
import logger from '@/lib/logger';
import * as schema from './schema';

export const pool = new Pool({
  connectionString: config.databaseUrl,
});

pool.on('connect', () => logger.info('PostgreSQL pool: client connected'));
pool.on('error', (err) => logger.error('PostgreSQL pool error:', err));

export const db = drizzle(pool, { schema, casing: 'snake_case' });
