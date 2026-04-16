import { GoogleGenAI } from '@google/genai';
import config from '@/lib/config';
import logger from '@/lib/logger';

export const google = new GoogleGenAI({
  apiKey: config.auth.google.apiKey,
});

logger.info('Google GenAI client initialized');
