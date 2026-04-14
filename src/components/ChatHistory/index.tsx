import { Plus } from 'lucide-react';
import ChatItem from './ChatItem';

export type ChatSummary = {
  id: string;
  title: string | null;
  provider: string;
  model: string;
  createdAt: string;
  updatedAt: string;
};

type ChatHistoryProps = {
  chats: ChatSummary[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
};

export default function ChatHistory({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}: ChatHistoryProps) {
  return (
    <aside className="border-border bg-surface flex w-64 shrink-0 flex-col border-r">
      <div className="border-border border-b p-3">
        <button
          type="button"
          onClick={onNewChat}
          className="bg-accent text-accent-foreground flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:opacity-90"
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-2">
        {chats.length === 0 && (
          <p className="text-muted px-3 py-4 text-center text-xs">
            No conversations yet
          </p>
        )}
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            id={chat.id}
            title={chat.title}
            model={chat.model}
            updatedAt={chat.updatedAt}
            isActive={chat.id === activeChatId}
            onSelect={onSelectChat}
            onDelete={onDeleteChat}
          />
        ))}
      </div>
    </aside>
  );
}
