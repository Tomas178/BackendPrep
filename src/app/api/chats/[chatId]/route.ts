import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '@/lib/api/errorResponse';
import { getSession } from '@/lib/api/getSession';
import logger from '@/lib/logger';
import { deleteUserChat, getChatWithMessages } from '@/lib/db/queries/chat';

type Params = { params: Promise<{ chatId: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return errorResponse('Unauthorized', StatusCodes.UNAUTHORIZED);
    }

    const { chatId } = await params;
    const chat = await getChatWithMessages(chatId, session.user.id);

    if (!chat) {
      return errorResponse('Chat not found', StatusCodes.NOT_FOUND);
    }

    return NextResponse.json(chat);
  } catch (error) {
    logger.error('Get chat error:', error);
    return errorResponse(
      'Failed to fetch chat',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return errorResponse('Unauthorized', StatusCodes.UNAUTHORIZED);
    }

    const { chatId } = await params;
    const deleted = await deleteUserChat(chatId, session.user.id);

    if (!deleted) {
      return errorResponse('Chat not found', StatusCodes.NOT_FOUND);
    }

    return new NextResponse(null, { status: StatusCodes.NO_CONTENT });
  } catch (error) {
    logger.error('Delete chat error:', error);
    return errorResponse(
      'Failed to delete chat',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
