'use client';

import { useEffect, useRef, useState } from 'react';
import { Box } from 'lucide-react';
import DropdownButton from '../DropdownButton';
import DropdownItem from '../DropdownItem';
import type { AllModels } from '@/constants/LLMs/allModels';
import type { AvailableLLMs } from '@/constants/LLMs/availableLLMs';
import { MODEL_OPTIONS } from './config';

type ModelsDropdownProps = {
  provider: AvailableLLMs;
  model: AllModels;
  onModelChange: (model: AllModels) => void;
};

export default function ModelsDropdown({
  provider,
  model,
  onModelChange,
}: ModelsDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const options = MODEL_OPTIONS[provider];
  const selectedOption = options.find((option) => option.value === model);

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
      <DropdownButton
        icon={Box}
        label={selectedOption?.label ?? model}
        open={open}
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="border-border bg-surface absolute top-full right-0 z-50 mt-1.5 w-56 overflow-hidden rounded-xl border shadow-lg">
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              label={option.label}
              description={option.description}
              selected={option.value === model}
              onClick={() => {
                onModelChange(option.value);
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
