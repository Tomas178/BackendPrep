export async function register() {
  if (
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.NODE_ENV === 'production'
  ) {
    const { drizzle } = await import('drizzle-orm/node-postgres');
    const { migrate } = await import('drizzle-orm/node-postgres/migrator');

    const db = drizzle(process.env.DATABASE_URL!);
    await migrate(db, { migrationsFolder: './drizzle' });

    console.log('Database migrations applied');
  }
}
