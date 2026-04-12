import Anthropic from '@anthropic-ai/sdk';
import config from '@/lib/config';

let cached: Anthropic | null = null;

export function anthropic() {
  if (!cached) {
    cached = new Anthropic({
      apiKey: config().auth.anthropic.apiKey,
    });
  }

  return cached;
}
