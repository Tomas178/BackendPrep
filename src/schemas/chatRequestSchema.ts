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
import { ROLES } from '@/constants/LLMs/roles';
import * as z from 'zod';
import { MAX_FREQUENCY_PENALTY } from '@/constants/LLMs/settings';
import {
  AVAILABLE_LLMS,
  AVAILABLE_LLMS_VALUES,
} from '@/constants/LLMs/availableLLMs';
import {
  ALL_AVAILABLE_MODELS,
  ALL_MODEL_VALUES,
  PROVIDER_MODEL_VALUES,
} from '@/constants/LLMs/allModels';

export const chatRequestSchema = z
  .object({
    messages: z.array(
      z.object({
        role: z.enum([ROLES.USER, ROLES.ASSISTANT]),
        content: z.string(),
      })
    ),
    provider: z.enum(AVAILABLE_LLMS_VALUES).default(AVAILABLE_LLMS.OPENAI),
    settings: z.object({
      model: z
        .enum(ALL_MODEL_VALUES)
        .default(ALL_AVAILABLE_MODELS.OPENAI.GPT_4O),
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
  })
  .refine(
    (data) =>
      (PROVIDER_MODEL_VALUES[data.provider] as readonly string[]).includes(
        data.settings.model
      ),
    {
      message: 'Model is not available for the selected provider',
      path: ['settings', 'model'],
    }
  );
