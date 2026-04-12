import * as z from 'zod';

const schema = z
  .object({
    env: z.enum(['development', 'production', 'test']).default('development'),
    port: z.coerce.number().default(3000),
    auth: z.object({
      openai: z.object({
        apiKey: z.string().min(1, 'OPENAI_API_KEY is required'),
      }),
    }),
  })
  .readonly();

let cached: z.infer<typeof schema> | null = null;

export default function config() {
  if (!cached) {
    cached = schema.parse({
      env: process.env.NODE_ENV,
      port: process.env.PORT,
      auth: {
        openai: {
          apiKey: process.env.OPENAI_API_KEY,
        },
      },
    });
  }

  return cached;
}
