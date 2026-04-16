export async function* parseSSEStream<T>(
  response: Response
): AsyncGenerator<T> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split('\n\n');
    buffer = parts.pop()!;

    for (const part of parts) {
      if (!part.startsWith('data: ')) continue;
      yield JSON.parse(part.slice(6));
    }
  }
}
