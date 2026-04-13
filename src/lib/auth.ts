import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { Pool } from 'pg';
import config from './config';

export const auth = betterAuth({
  database: new Pool({
    connectionString: config().databaseUrl,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
  secret: config().betterAuth.secret,
  advanced: {
    cookiePrefix: config().betterAuth.cookiePrefix,
  },
});
