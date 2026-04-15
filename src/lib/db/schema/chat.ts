import {
  pgTable,
  text,
  uuid,
  integer,
  numeric,
  index,
  check,
} from 'drizzle-orm/pg-core';
import { sql, desc } from 'drizzle-orm';
import { users } from './auth';
import { createdTimestamptz, timestampstz } from './columns.helpers';
import { TABLES } from './tables';
import { ROLES } from '@/constants/LLMs/roles';

export const chats = pgTable(
  TABLES.CHATS,
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    title: text(),
    provider: text().notNull(),
    model: text().notNull(),
    ...timestampstz,
  },
  (table) => [
    index('chats_user_id_updated_at_idx').on(
      table.userId,
      desc(table.updatedAt)
    ),
  ]
);

export const chatMessages = pgTable(
  TABLES.CHAT_MESSAGES,
  {
    id: uuid().primaryKey().defaultRandom(),
    chatId: uuid()
      .notNull()
      .references(() => chats.id, { onDelete: 'cascade' }),
    role: text().notNull(),
    content: text().notNull(),
    promptTokens: integer(),
    completionTokens: integer(),
    cost: numeric({ precision: 12, scale: 8 }),
    ...createdTimestamptz,
  },
  (table) => [
    index('chat_messages_chat_id_created_at_idx').on(
      table.chatId,
      table.createdAt
    ),
    check(
      'chat_messages_role_check',
      sql`${table.role} IN (${ROLES.USER}, ${ROLES.ASSISTANT})`
    ),
  ]
);
