'use client';

import { useEffect, useRef, useState } from 'react';
import { Cpu, ChevronDown, Check } from 'lucide-react';
import type { AvailableLLMs } from '@/constants/LLMs/availableLLMs';
import { PROVIDER_OPTIONS } from './config';

type ProviderDropdownProps = {
  provider: AvailableLLMs;
  onProviderChange: (provider: AvailableLLMs) => void;
};

export default function ProviderDropdown({
  provider,
  onProviderChange,
}: ProviderDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = PROVIDER_OPTIONS.find(
    (option) => option.value === provider
  )!;

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="border-border hover:bg-hover text-primary flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors"
      >
        <Cpu size={16} className="text-muted" />
        {selectedOption.label}
        <ChevronDown
          size={14}
          className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="border-border bg-surface absolute top-full left-0 z-50 mt-1.5 w-44 overflow-hidden rounded-xl border shadow-lg">
          {PROVIDER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onProviderChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                option.value === provider
                  ? 'bg-hover text-primary'
                  : 'text-secondary hover:bg-hover'
              }`}
            >
              <span className="text-sm font-medium">{option.label}</span>
              {option.value === provider && (
                <Check size={16} className="text-accent ml-auto shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
