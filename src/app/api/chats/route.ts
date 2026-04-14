import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '@/lib/api/errorResponse';
import { getSession } from '@/lib/api/getSession';
import { getUserChats } from '@/db/queries/chat';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return errorResponse('Unauthorized', StatusCodes.UNAUTHORIZED);
    }

    const chats = await getUserChats(session.user.id);
    return NextResponse.json(chats);
  } catch (error) {
    console.error('List chats error:', error);
    return errorResponse(
      'Failed to fetch chats',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
