'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, ChevronDown, Check } from 'lucide-react';
import type { OpenaiAvailableModels } from '@/constants/LLMs/openai/availableModels';
import { OPENAI_MODEL_OPTIONS } from './config';

type ModelsDropdownProps = {
  model: OpenaiAvailableModels;
  onModelChange: (model: OpenaiAvailableModels) => void;
};

export default function ModelsDropdown({
  model,
  onModelChange,
}: ModelsDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = OPENAI_MODEL_OPTIONS.find(
    (option) => option.value === model
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
        <Box size={16} className="text-muted" />
        {selectedOption.label}
        <ChevronDown
          size={14}
          className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="border-border bg-surface absolute top-full right-0 z-50 mt-1.5 w-56 overflow-hidden rounded-xl border shadow-lg">
          {OPENAI_MODEL_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onModelChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                option.value === model
                  ? 'bg-hover text-primary'
                  : 'text-secondary hover:bg-hover'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{option.label}</div>
                <div className="text-muted text-xs">{option.description}</div>
              </div>
              {option.value === model && (
                <Check size={16} className="text-accent shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
