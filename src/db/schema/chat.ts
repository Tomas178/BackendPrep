import {
  pgTable,
  text,
  uuid,
  timestamp,
  integer,
  numeric,
  index,
  check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { user } from './auth';

export const chat = pgTable(
  'chat',
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    title: text(),
    provider: text().notNull(),
    model: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('chat_userId_idx').on(table.userId)]
);

export const chatMessage = pgTable(
  'chatMessage',
  {
    id: uuid().primaryKey().defaultRandom(),
    chatId: uuid()
      .notNull()
      .references(() => chat.id, { onDelete: 'cascade' }),
    role: text().notNull(),
    content: text().notNull(),
    promptTokens: integer(),
    completionTokens: integer(),
    cost: numeric({ precision: 12, scale: 8 }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('chatMessage_chatId_idx').on(table.chatId),
    check(
      'chatMessage_role_check',
      sql`${table.role} IN ('user', 'assistant')`
    ),
  ]
);
