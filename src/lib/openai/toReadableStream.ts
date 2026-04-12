import type OpenAI from 'openai';

export function toReadableStream(
  stream: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>
) {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });
}
