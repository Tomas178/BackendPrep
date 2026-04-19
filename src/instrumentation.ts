export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  if (process.env.NODE_ENV === 'production') {
    const { drizzle } = await import('drizzle-orm/node-postgres');
    const { migrate } = await import('drizzle-orm/node-postgres/migrator');

    const db = drizzle(process.env.DATABASE_URL!);
    await migrate(db, { migrationsFolder: './drizzle' });

    const { default: logger } = await import('@/lib/logger');
    logger.info('Database migrations applied!');
  }

  await import('@/lib/db');
  await import('@/lib/redis');
  await import('@/lib/email/client');
  await import('@/lib/queues/email');
  await import('@/lib/workers/email');

  const { setupGracefulShutdown } = await import('@/lib/gracefulShutdown');
  setupGracefulShutdown();
}
