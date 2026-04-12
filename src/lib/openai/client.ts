import OpenAI from 'openai';
import config from '@/lib/config';

let cached: OpenAI | null = null;

export function openai() {
  if (!cached) {
    cached = new OpenAI({
      apiKey: config().auth.openai.apiKey,
    });
  }

  return cached;
}
