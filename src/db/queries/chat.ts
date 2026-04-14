import { db } from '@/db';
import { chat, chatMessage } from '@/db/schema';
import { eq, and, desc, asc } from 'drizzle-orm';

const MAX_TITLE_LENGTH = 80;

export async function getUserChats(userId: string) {
  return db.query.chat.findMany({
    where: eq(chat.userId, userId),
    orderBy: [desc(chat.updatedAt)],
  });
}

export async function getChatWithMessages(chatId: string, userId: string) {
  return db.query.chat.findFirst({
    where: and(eq(chat.id, chatId), eq(chat.userId, userId)),
    with: {
      messages: {
        orderBy: [asc(chatMessage.createdAt)],
      },
    },
  });
}

export async function createChat(data: {
  userId: string;
  title: string;
  provider: string;
  model: string;
}) {
  const [newChat] = await db
    .insert(chat)
    .values({
      ...data,
      title: data.title.slice(0, MAX_TITLE_LENGTH),
    })
    .returning();
  return newChat;
}

export async function addMessages(
  messages: {
    chatId: string;
    role: string;
    content: string;
    promptTokens?: number;
    completionTokens?: number;
    cost?: string;
  }[]
) {
  return db.insert(chatMessage).values(messages);
}

export async function touchChat(chatId: string) {
  await db
    .update(chat)
    .set({ updatedAt: new Date() })
    .where(eq(chat.id, chatId));
}

export async function deleteUserChat(chatId: string, userId: string) {
  const [deleted] = await db
    .delete(chat)
    .where(and(eq(chat.id, chatId), eq(chat.userId, userId)))
    .returning({ id: chat.id });
  return deleted;
}
