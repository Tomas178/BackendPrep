import Anthropic from '@anthropic-ai/sdk';
import config from '@/lib/config';

export const anthropic = new Anthropic({
  apiKey: config.auth.anthropic.apiKey,
});
