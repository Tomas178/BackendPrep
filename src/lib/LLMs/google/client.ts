import { GoogleGenAI } from '@google/genai';
import config from '@/lib/config';

export const google = new GoogleGenAI({
  apiKey: config.auth.google.apiKey,
});
