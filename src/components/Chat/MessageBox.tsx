'use client';

import { ROLES } from '@/constants/LLMs/roles';
import { ChatMessage } from '@/types/chat';
import CopyButton from './CopyButton';

type MessageBoxProps = {
  message: ChatMessage;
};

export default function MessageBox({ message }: MessageBoxProps) {
  const isUser = message.role === ROLES.USER;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-4/5">
        <div
          className={`rounded-2xl px-4 py-3 text-sm wrap-break-word whitespace-pre-wrap ${
            isUser
              ? 'bg-accent text-accent-foreground'
              : 'border-border bg-surface text-primary border'
          }`}
        >
          {message.content || (
            <span className="animate-pulse text-2xl">...</span>
          )}
        </div>
        {(message.content || message.usage) && (
          <div className="mt-1 flex items-center justify-end gap-3 px-1">
            {message.usage && (
              <p className="text-muted text-xs">
                {`${message.usage.promptTokens + message.usage.completionTokens} tokens`}
                &middot; ${message.usage.cost.toFixed(4)}
              </p>
            )}
            {message.content && <CopyButton text={message.content} />}
          </div>
        )}
      </div>
    </div>
  );
}
