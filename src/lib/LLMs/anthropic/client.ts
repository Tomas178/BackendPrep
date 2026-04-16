import Anthropic from '@anthropic-ai/sdk';
import config from '@/lib/config';
import logger from '@/lib/logger';

export const anthropic = new Anthropic({
  apiKey: config.auth.anthropic.apiKey,
});

logger.info('Anthropic client initialized');
