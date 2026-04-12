import { Check } from 'lucide-react';

type DropdownItemProps = {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
};

export default function DropdownItem({
  label,
  description,
  selected,
  onClick,
}: DropdownItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left transition-colors ${
        selected ? 'bg-hover text-primary' : 'text-secondary hover:bg-hover'
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{label}</div>
        {description && <div className="text-muted text-xs">{description}</div>}
      </div>
      {selected && <Check size={16} className="text-accent shrink-0" />}
    </button>
  );
}
