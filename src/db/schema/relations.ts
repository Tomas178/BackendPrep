import { relations } from 'drizzle-orm';
import { user, session, account } from './auth';
import { chat, chatMessage } from './chat';

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  chats: many(chat),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const chatRelations = relations(chat, ({ one, many }) => ({
  user: one(user, { fields: [chat.userId], references: [user.id] }),
  messages: many(chatMessage),
}));

export const chatMessageRelations = relations(chatMessage, ({ one }) => ({
  chat: one(chat, { fields: [chatMessage.chatId], references: [chat.id] }),
}));
