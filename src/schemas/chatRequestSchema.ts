import {
  DEFAULT_FREQUENCY_PENALTY,
  DEFAULT_MAX_OUTPUT_TOKENS,
  DEFAULT_PRESENCE_PENALTY,
  DEFAULT_TEMPERATURE,
  DEFAULT_TOP_P,
  MAX_MAX_OUTPUT_TOKENS,
  MAX_PRESENCE_PENALTY,
  MAX_TEMPERATURE,
  MAX_TOP_P,
  MIN_FREQUENCY_PENALTY,
  MIN_MAX_OUTPUT_TOKENS,
  MIN_PRESENCE_PENALTY,
  MIN_TEMPERATURE,
  MIN_TOP_P,
} from '@/constants/LLMs/settings';
import {
  AVAILABLE_MODEL_VALUES,
  AVAILABLE_MODELS,
} from '@/constants/LLMs/openai/availableModels';
import { ROLES } from '@/constants/LLMs/roles';
import * as z from 'zod';
import { MAX_FREQUENCY_PENALTY } from '@/constants/LLMs/settings';

export const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum([ROLES.USER, ROLES.ASSISTANT]),
      content: z.string(),
    })
  ),
  settings: z.object({
    model: z.enum(AVAILABLE_MODEL_VALUES).default(AVAILABLE_MODELS.GPT_4O),
    temperature: z
      .number()
      .min(MIN_TEMPERATURE)
      .max(MAX_TEMPERATURE)
      .default(DEFAULT_TEMPERATURE),
    topP: z.number().min(MIN_TOP_P).max(MAX_TOP_P).default(DEFAULT_TOP_P),
    maxOutputTokens: z
      .number()
      .int()
      .min(MIN_MAX_OUTPUT_TOKENS)
      .max(MAX_MAX_OUTPUT_TOKENS)
      .default(DEFAULT_MAX_OUTPUT_TOKENS),
    frequencyPenalty: z
      .number()
      .min(MIN_FREQUENCY_PENALTY)
      .max(MAX_FREQUENCY_PENALTY)
      .default(DEFAULT_FREQUENCY_PENALTY),
    presencePenalty: z
      .number()
      .min(MIN_PRESENCE_PENALTY)
      .max(MAX_PRESENCE_PENALTY)
      .default(DEFAULT_PRESENCE_PENALTY),
  }),
});
