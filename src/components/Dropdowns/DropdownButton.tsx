import { ChevronDown, type LucideIcon } from 'lucide-react';

type DropdownButtonProps = {
  icon: LucideIcon;
  label: string;
  open: boolean;
  onClick: () => void;
};

export default function DropdownButton({
  icon: Icon,
  label,
  open,
  onClick,
}: DropdownButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-border hover:bg-hover text-primary flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors"
    >
      <Icon size={16} className="text-muted" />
      {label}
      <ChevronDown
        size={14}
        className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}
      />
    </button>
  );
}
