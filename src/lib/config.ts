import * as z from 'zod';

const schema = z
  .object({
    env: z.enum(['development', 'production', 'test']).default('development'),
    port: z.coerce.number().default(3000),
    databaseUrl: z.string().min(1, 'DATABASE_URL is required'),
    betterAuth: z.object({
      secret: z
        .string()
        .min(32, 'BETTER_AUTH_SECRET must be at least 32 characters'),
      url: z.url('BETTER_AUTH_URL must be a valid URL'),
      cookiePrefix: z.string().default('backendprep'),
    }),
    oauth: z.object({
      google: z.object({
        clientId: z.string().min(1, 'GOOGLE_OAUTH_CLIENT_ID is required'),
        clientSecret: z
          .string()
          .min(1, 'GOOGLE_OAUTH_CLIENT_SECRET is required'),
      }),
      github: z.object({
        clientId: z.string().min(1, 'GITHUB_OAUTH_CLIENT_ID is required'),
        clientSecret: z
          .string()
          .min(1, 'GITHUB_OAUTH_CLIENT_SECRET is required'),
      }),
    }),
    mail: z.object({
      host: z.string().min(1, 'MAIL_HOST is required'),
      port: z.coerce.number().default(1025),
      secure: z
        .enum(['true', 'false'])
        .default('false')
        .transform((v) => v === 'true'),
      email: z.string().min(1, 'EMAIL is required'),
      appPassword: z.string().min(1, 'EMAIL_APP_PASS is required'),
    }),
    auth: z.object({
      openai: z.object({
        apiKey: z.string().min(1, 'OPENAI_API_KEY is required'),
      }),
      anthropic: z.object({
        apiKey: z.string().min(1, 'ANTHROPIC_API_KEY is required'),
      }),
      google: z.object({
        apiKey: z.string().min(1, 'GOOGLE_API_KEY is required'),
      }),
    }),
  })
  .readonly();

const config = schema.parse({
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  betterAuth: {
    secret: process.env.BETTER_AUTH_SECRET,
    url: process.env.BETTER_AUTH_URL,
  },
  oauth: {
    google: {
      clientId: process.env.OAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.OAUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
    },
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    email: process.env.EMAIL,
    appPassword: process.env.EMAIL_APP_PASS,
  },
  auth: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY,
    },
    google: {
      apiKey: process.env.GOOGLE_API_KEY,
    },
  },
});

export default config;
