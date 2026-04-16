import {
  getAnthropicInputTokenPrice,
  getAnthropicOutputTokenPrice,
} from '@/constants/LLMs/anthropic/modelsPricings';
import type { AnthropicAvailableModels } from '@/constants/LLMs/anthropic/availableModels';
import type { ChatMessage, ChatSettings, StreamChunk } from '@/types/chat';
import { getStream } from './getStream';
import { anthropic } from './client';
import { buildUsage } from '../utils';

export async function* streamAnthropic(
  messages: ChatMessage[],
  settings: ChatSettings
): AsyncGenerator<StreamChunk> {
  const stream = getStream(anthropic, messages, settings);

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      yield { type: 'delta', content: event.delta.text };
    }
  }

  const finalMessage = await stream.finalMessage();
  const model = settings.model as AnthropicAvailableModels;
  const { input_tokens, output_tokens } = finalMessage.usage;

  yield {
    type: 'done',
    usage: buildUsage(
      input_tokens,
      output_tokens,
      getAnthropicInputTokenPrice(model),
      getAnthropicOutputTokenPrice(model)
    ),
  };
}
