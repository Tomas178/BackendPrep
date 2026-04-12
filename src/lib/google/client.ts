import { GoogleGenAI } from '@google/genai';
import config from '@/lib/config';

let cached: GoogleGenAI | null = null;

export function google() {
  if (!cached) {
    cached = new GoogleGenAI({
      apiKey: config().auth.google.apiKey,
    });
  }

  return cached;
}
