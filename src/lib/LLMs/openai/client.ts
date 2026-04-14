import OpenAI from 'openai';
import config from '@/lib/config';

export const openai = new OpenAI({
  apiKey: config.auth.openai.apiKey,
});
