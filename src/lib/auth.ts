import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { pool } from '@/db';
import config from '@/lib/config';
import { sendVerificationEmail } from '@/lib/email/sendVerificationEmail';
import { transporter } from '@/lib/email/transporter';

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      sendVerificationEmail(transporter, config.mail.email, user.email, url);
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
