import { NextResponse } from 'next/server';
import { getUserChats } from '@/lib/db/queries/chat';
import { withAuth } from '@/lib/api/withAuth';
import { withErrorHandling } from '@/lib/api/withErrorHandling';

export const GET = withErrorHandling(
  withAuth(async (session) => {
    const chats = await getUserChats(session.user.id);
    return NextResponse.json(chats);
  })
);
