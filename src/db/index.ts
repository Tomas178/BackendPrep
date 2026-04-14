import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import config from '@/lib/config';
import * as schema from './schema';

export const pool = new Pool({
  connectionString: config.databaseUrl,
});

export const db = drizzle(pool, { schema, casing: 'snake_case' });
