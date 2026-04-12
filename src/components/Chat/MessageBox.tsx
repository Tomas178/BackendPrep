import { ROLES } from '@/constants/LLMs/roles';
import { ChatMessage } from '@/types/chat';

type MessageBoxProps = {
  message: ChatMessage;
};

export default function MessageBox({ message }: MessageBoxProps) {
  const isUser = message.role === ROLES.USER;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-4/5">
        <div
          className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
            isUser
              ? 'bg-accent text-accent-foreground'
              : 'border-border bg-surface text-primary border'
          }`}
        >
          {message.content || <span className="animate-pulse">...</span>}
        </div>
        {message.usage && (
          <p className="text-muted mt-1 px-1 text-xs">
            {`${message.usage.promptTokens + message.usage.completionTokens} tokens`}
            &middot; ${message.usage.cost.toFixed(4)}
          </p>
        )}
      </div>
    </div>
  );
}
