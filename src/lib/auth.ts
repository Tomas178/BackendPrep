import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { Pool } from 'pg';
import config from './config';
import { sendVerificationEmail } from './email';

function createAuth() {
  const cfg = config();

  return betterAuth({
    database: new Pool({
      connectionString: cfg.databaseUrl,
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url }) => {
        sendVerificationEmail(user.email, url);
      },
    },
    socialProviders: {
      google: {
        clientId: cfg.oauth.google.clientId,
        clientSecret: cfg.oauth.google.clientSecret,
      },
      github: {
        clientId: cfg.oauth.github.clientId,
        clientSecret: cfg.oauth.github.clientSecret,
      },
    },
    plugins: [nextCookies()],
    secret: cfg.betterAuth.secret,
    advanced: {
      cookiePrefix: cfg.betterAuth.cookiePrefix,
    },
  });
}

let _auth: ReturnType<typeof createAuth>;

export function getAuth() {
  if (!_auth) {
    _auth = createAuth();
  }
  return _auth;
}
