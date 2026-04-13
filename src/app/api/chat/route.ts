import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { chatRequestSchema } from '@/schemas/chatRequestSchema';
import { errorResponse } from '@/lib/api/errorResponse';
import { getResponse } from '@/lib/LLMs/getResponse';
import { isInappropriateMessage } from '@/lib/LLMs/openai/isInappropriateMessage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = chatRequestSchema.safeParse(body);

    if (!result.success) {
      return errorResponse('Invalid request', StatusCodes.BAD_REQUEST);
    }

    const { messages, provider, settings } = result.data;

    const lastMessage = messages.at(-1)!;
    const isFlaggedMessage = await isInappropriateMessage(lastMessage);
    if (isFlaggedMessage) {
      return errorResponse(
        'Your message was flagged as inappropriate. Please keep the conversation professional.',
        StatusCodes.BAD_REQUEST
      );
    }

    const response = await getResponse(provider, messages, settings);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return errorResponse(
      'Failed to process request',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
