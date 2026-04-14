import type OpenAI from 'openai';

export async function isMessageFlagged(
  client: OpenAI,
  content: string
): Promise<boolean> {
  const response = await client.moderations.create({ input: content });
  return response.results[0].flagged;
}
