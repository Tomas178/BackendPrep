import { timestamp } from 'drizzle-orm/pg-core';

export const myTimestamptz = () => timestamp({ withTimezone: true });
