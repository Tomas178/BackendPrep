'use client';

import { ROLES } from '@/constants/LLMs/roles';
import { ASSISTANT_WELCOME_MESSAGE } from '@/constants/LLMs/prompts';
import type { AvailableLLMs } from '@/constants/LLMs/availableLLMs';
import type { ChatMessage, ChatSettings, ChatStreamEvent } from '@/types/chat';
import MessageBox from './MessageBox';
import ErrorToast from '@/components/ErrorToast';
import { parseSSEStream } from '@/lib/sse';
import { useState, useRef, useEffect, useMemo, KeyboardEvent } from 'react';
import { StatusCodes } from 'http-status-codes';

const DEFAULT_MESSAGES: ChatMessage[] = [
  { role: ROLES.ASSISTANT, content: ASSISTANT_WELCOME_MESSAGE },
];

type ChatProps = {
  chatId: string | null;
  provider: AvailableLLMs;
  settings: ChatSettings;
  initialMessages?: ChatMessage[];
  onUserMessageSent?: () => void;
  onChatCreated?: (chatId: string) => void;
};

export default function Chat({
  chatId,
  provider,
  settings,
  initialMessages,
  onUserMessageSent,
  onChatCreated,
}: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    ...DEFAULT_MESSAGES,
    ...(initialMessages ?? []),
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rateLimitError) return;
    const timer = setTimeout(() => setRateLimitError(null), 5000);
    return () => clearTimeout(timer);
  }, [rateLimitError]);

  const totalCost = useMemo(
    () => messages.reduce((sum, msg) => sum + (msg.usage?.cost ?? 0), 0),
    [messages]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function updateLastMessage(updater: (msg: ChatMessage) => ChatMessage) {
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = updater(updated[updated.length - 1]);
      return updated;
    });
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: ROLES.USER, content: trimmed };
    const newMessages = [...messages, userMessage];

    onUserMessageSent?.();

    setMessages([...newMessages, { role: ROLES.ASSISTANT, content: '' }]);
    setInput('');
    setIsLoading(true);

    const apiMessages = newMessages.filter(
      (msg) => msg.content !== ASSISTANT_WELCOME_MESSAGE
    );

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId,
          messages: apiMessages,
          provider,
          settings,
        }),
      });

      if (response.status === StatusCodes.TOO_MANY_REQUESTS) {
        const data = await response.json().catch(() => null);
        setRateLimitError(
          data?.error || 'Too many requests. Please slow down.'
        );
        setMessages(messages);
        setInput(trimmed);
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'Request failed');
      }

      for await (const event of parseSSEStream<ChatStreamEvent>(response)) {
        if (event.type === 'delta') {
          updateLastMessage((msg) => ({
            ...msg,
            content: msg.content + event.content,
          }));
        } else if (event.type === 'done') {
          if (!chatId) onChatCreated?.(event.chatId);
          if (event.usage) {
            updateLastMessage((msg) => ({ ...msg, usage: event.usage }));
          }
        } else if (event.type === 'error') {
          throw new Error(event.message);
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.message !== 'Request failed'
          ? error.message
          : 'Something went wrong. Please try again.';

      updateLastMessage(() => ({
        role: ROLES.ASSISTANT,
        content: errorMessage,
      }));
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
      {rateLimitError && (
        <ErrorToast
          message={rateLimitError}
          onDismiss={() => setRateLimitError(null)}
        />
      )}

      <div className="flex-1 overflow-y-auto px-4">
        <div className="mx-auto max-w-3xl space-y-4 py-6">
          {messages.map((msg, i) => (
            <MessageBox key={i} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
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
            className="bg-accent text-accent-foreground cursor-pointer rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
