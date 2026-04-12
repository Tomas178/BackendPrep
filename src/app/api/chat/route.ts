import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { chatRequestSchema } from '@/schemas/chatRequestSchema';
import { errorResponse } from '@/lib/api/errorResponse';
import { isMessageFlagged } from '@/lib/openai/moderate';
import { getChatCompletion } from '@/lib/openai/getChatCompletion';
import {
  getInputTokenPrice,
  getOutputTokenPrice,
} from '@/constants/LLMs/openai/modelsPricings';
import { ROLES } from '@/constants/LLMs/roles';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = chatRequestSchema.safeParse(body);

    if (!result.success) {
      return errorResponse('Invalid request', StatusCodes.BAD_REQUEST);
    }

    const { messages, settings } = result.data;

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

    const completion = await getChatCompletion(messages, settings);
    const content = completion.choices[0]?.message?.content ?? '';
    const usage = completion.usage;

    return NextResponse.json({
      content,
      usage: usage
        ? {
            promptTokens: usage.prompt_tokens,
            completionTokens: usage.completion_tokens,
            cost:
              usage.prompt_tokens * getInputTokenPrice(settings.model) +
              usage.completion_tokens * getOutputTokenPrice(settings.model),
          }
        : undefined,
    });
  } catch {
    return errorResponse(
      'Failed to process request',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
