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
  socialProviders: {
    google: {
      clientId: config().oauth.google.clientId,
      clientSecret: config().oauth.google.clientSecret,
    },
    github: {
      clientId: config().oauth.github.clientId,
      clientSecret: config().oauth.github.clientSecret,
    },
  },
  plugins: [nextCookies()],
  secret: config().betterAuth.secret,
  advanced: {
    cookiePrefix: config().betterAuth.cookiePrefix,
  },
});
