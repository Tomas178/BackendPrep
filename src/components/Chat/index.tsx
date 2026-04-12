'use client';

import { ROLES } from '@/constants/roles';
import type { ChatMessage, ChatSettings, UsageData } from '@/types/chat';
import { USAGE_SEPARATOR } from '@/lib/openai/toReadableStream';
import MessageBox from './MessageBox';
import { useState, useRef, useEffect, useMemo, KeyboardEvent } from 'react';

type ChatProps = {
  settings: ChatSettings;
};

export default function Chat({ settings }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const totalCost = useMemo(
    () => messages.reduce((sum, msg) => sum + (msg.usage?.cost ?? 0), 0),
    [messages]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: ROLES.USER, content: trimmed };
    const newMessages = [...messages, userMessage];

    setMessages([...newMessages, { role: 'assistant', content: '' }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          settings,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'Request failed');
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        const separatorIndex = fullContent.indexOf(USAGE_SEPARATOR);
        const displayContent =
          separatorIndex === -1
            ? fullContent
            : fullContent.slice(0, separatorIndex);

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: displayContent,
          };
          return updated;
        });
      }

      const separatorIndex = fullContent.indexOf(USAGE_SEPARATOR);
      if (separatorIndex !== -1) {
        const usage: UsageData = JSON.parse(
          fullContent.slice(separatorIndex + 1)
        );
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            usage,
          };
          return updated;
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.message !== 'Request failed'
          ? error.message
          : 'Something went wrong. Please try again.';

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: ROLES.ASSISTANT,
          content: errorMessage,
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-4">
        {messages.length === 0 ? (
          <div className="text-muted flex h-full items-center justify-center">
            <p>Send a message to start your interview practice.</p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-4 py-6">
            {messages.map((msg, i) => (
              <MessageBox key={i} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="border-border bg-surface border-t px-4 py-4">
        {totalCost > 0 && (
          <p className="text-muted mx-auto mb-2 max-w-3xl text-xs">
            Session total: ${totalCost.toFixed(4)}
          </p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="mx-auto flex max-w-3xl items-end gap-2"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer..."
            rows={1}
            disabled={isLoading}
            className="border-border bg-surface-alt text-primary placeholder:text-muted focus:border-accent flex-1 resize-none rounded-xl border px-4 py-3 text-sm focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-accent text-accent-foreground rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
