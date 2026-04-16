import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { deleteUserChat, getChatWithMessages } from '@/lib/db/queries/chat';
import { withAuth } from '@/lib/api/withAuth';
import { withErrorHandling } from '@/lib/api/withErrorHandling';
import ChatNotFoundError from '@/lib/errors/chat/ChatNotFoundError';

type RouteContext = { params: Promise<{ chatId: string }> };

export const GET = withErrorHandling(
  withAuth<RouteContext>(async (session, _req, { params }) => {
    const { chatId } = await params;

    const chat = await getChatWithMessages(chatId, session.user.id);
    if (!chat) {
      throw new ChatNotFoundError();
    }

    return NextResponse.json(chat);
  })
);

export const DELETE = withErrorHandling(
  withAuth<RouteContext>(async (session, _req, { params }) => {
    const { chatId } = await params;

    const deleted = await deleteUserChat(chatId, session.user.id);
    if (!deleted) {
      throw new ChatNotFoundError();
    }

    return new NextResponse(null, { status: StatusCodes.NO_CONTENT });
  })
);
