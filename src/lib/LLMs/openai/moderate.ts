import { openai } from './client';

export async function isMessageFlagged(content: string): Promise<boolean> {
  const response = await openai().moderations.create({ input: content });
  return response.results[0].flagged;
}
