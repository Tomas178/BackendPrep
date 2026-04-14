import { db } from '@/lib/db';
import { chats, chatMessages } from '@/lib/db/schema';
import { eq, and, desc, asc } from 'drizzle-orm';

const MAX_TITLE_LENGTH = 80;

export async function getUserChats(userId: string) {
  return db.query.chats.findMany({
    where: eq(chats.userId, userId),
    orderBy: [desc(chats.updatedAt)],
  });
}

export async function getChatWithMessages(chatId: string, userId: string) {
  return db.query.chats.findFirst({
    where: and(eq(chats.id, chatId), eq(chats.userId, userId)),
    with: {
      messages: {
        orderBy: [asc(chatMessages.createdAt)],
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
    .insert(chats)
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
  return db.insert(chatMessages).values(messages);
}

export async function touchChat(chatId: string) {
  await db
    .update(chats)
    .set({ updatedAt: new Date() })
    .where(eq(chats.id, chatId));
}

export async function deleteUserChat(chatId: string, userId: string) {
  const [deleted] = await db
    .delete(chats)
    .where(and(eq(chats.id, chatId), eq(chats.userId, userId)))
    .returning({ id: chats.id });
  return deleted;
}
