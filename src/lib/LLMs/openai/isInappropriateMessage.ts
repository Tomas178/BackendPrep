import { ROLES } from '@/constants/LLMs/roles';
import { ChatMessage } from '@/types/chat';
import { openai } from './client';
import { isMessageFlagged } from './moderate';

export async function isInappropriateMessage(
  message: ChatMessage
): Promise<boolean> {
  return (
    message.role === ROLES.USER &&
    (await isMessageFlagged(openai, message.content))
  );
}
