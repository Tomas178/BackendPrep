import { pgTable, text, boolean, index } from 'drizzle-orm/pg-core';
import { timestampstz } from './columns.helpers';
import { myTimestamptz } from './datatypes.helpers';
import { TABLES } from './tables';

export const users = pgTable(TABLES.USERS, {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().notNull(),
  image: text(),
  ...timestampstz,
});

export const sessions = pgTable(
  TABLES.SESSIONS,
  {
    id: text().primaryKey().notNull(),
    expiresAt: myTimestamptz().notNull(),
    token: text().notNull().unique(),
    ...timestampstz,
    ipAddress: text(),
    userAgent: text(),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => [index('sessions_user_id_idx').on(table.userId)]
);

export const accounts = pgTable(
  TABLES.ACCOUNTS,
  {
    id: text().primaryKey().notNull(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: myTimestamptz(),
    refreshTokenExpiresAt: myTimestamptz(),
    scope: text(),
    password: text(),
    ...timestampstz,
  },
  (table) => [index('accounts_user_id_idx').on(table.userId)]
);

export const verifications = pgTable(
  TABLES.VERIFICATIONS,
  {
    id: text().primaryKey().notNull(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: myTimestamptz().notNull(),
    ...timestampstz,
  },
  (table) => [index('verifications_identifier_idx').on(table.identifier)]
);
