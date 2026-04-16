import OpenAI from 'openai';
import config from '@/lib/config';
import logger from '@/lib/logger';

export const openai = new OpenAI({
  apiKey: config.auth.openai.apiKey,
});

logger.info('OpenAI client initialized');
