import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { chatRequestSchema } from '@/schemas/chatRequestSchema';
import { errorResponse } from '@/lib/api/errorResponse';
import { isMessageFlagged } from '@/lib/openai/moderate';
import { handleOpenai } from '@/lib/openai/handleChat';
import { handleAnthropic } from '@/lib/anthropic/handleChat';
import { handleGoogle } from '@/lib/google/handleChat';
import { ROLES } from '@/constants/LLMs/roles';
import { AVAILABLE_LLMS } from '@/constants/LLMs/availableLLMs';
import type { ChatResponse } from '@/types/chat';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = chatRequestSchema.safeParse(body);

    if (!result.success) {
      return errorResponse('Invalid request', StatusCodes.BAD_REQUEST);
    }

    const { messages, provider, settings } = result.data;

    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage?.role === ROLES.USER &&
      (await isMessageFlagged(lastMessage.content))
    ) {
      return errorResponse(
        'Your message was flagged as inappropriate. Please keep the conversation professional.',
        StatusCodes.BAD_REQUEST
      );
    }

    let response: ChatResponse;

    switch (provider) {
      case AVAILABLE_LLMS.OPENAI:
        response = await handleOpenai(messages, settings);
        break;
      case AVAILABLE_LLMS.ANTHROPIC:
        response = await handleAnthropic(messages, settings);
        break;
      case AVAILABLE_LLMS.GOOGLE:
        response = await handleGoogle(messages, settings);
        break;
    }

    return NextResponse.json(response);
  } catch {
    return errorResponse(
      'Failed to process request',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
