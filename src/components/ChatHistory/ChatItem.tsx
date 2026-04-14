'use client';

import { Trash2 } from 'lucide-react';

type ChatItemProps = {
  id: string;
  title: string | null;
  model: string;
  updatedAt: string;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

function formatRelativeDate(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function ChatItem({
  id,
  title,
  model,
  updatedAt,
  isActive,
  onSelect,
  onDelete,
}: ChatItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`group flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
        isActive
          ? 'bg-accent/10 border-accent/30 border'
          : 'hover:bg-hover border border-transparent'
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-primary truncate font-medium">
          {title || 'New Chat'}
        </p>
        <p className="text-muted mt-0.5 text-xs">
          {model} &middot; {formatRelativeDate(updatedAt)}
        </p>
      </div>

      <Trash2
        size={14}
        className="text-muted hover:text-primary mt-0.5 shrink-0 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Delete chat"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
      />
    </button>
  );
}
