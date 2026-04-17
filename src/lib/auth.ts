import { betterAuth } from 'better-auth/minimal';
import { nextCookies } from 'better-auth/next-js';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import config from '@/lib/config';
import { EmailTemplate } from '@/constants/emailTemplate';
import { addEmailJob } from '@/lib/queues/email';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
      strategy: 'compact',
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await addEmailJob({
        emailType: EmailTemplate.VERIFY_EMAIL,
        to: user.email,
        username: user.name,
        url,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: config.oauth.google.clientId,
      clientSecret: config.oauth.google.clientSecret,
    },
    github: {
      clientId: config.oauth.github.clientId,
      clientSecret: config.oauth.github.clientSecret,
    },
  },

  plugins: [nextCookies()],
  secret: config.betterAuth.secret,
  advanced: {
    cookiePrefix: config.betterAuth.cookiePrefix,
  },
});
