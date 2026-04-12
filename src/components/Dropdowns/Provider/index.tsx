'use client';

import { useEffect, useRef, useState } from 'react';
import { Cpu } from 'lucide-react';
import DropdownButton from '../DropdownButton';
import DropdownItem from '../DropdownItem';
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
      <DropdownButton
        icon={Cpu}
        label={selectedOption.label}
        open={open}
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="border-border bg-surface absolute top-full left-0 z-50 mt-1.5 w-44 overflow-hidden rounded-xl border shadow-lg">
          {PROVIDER_OPTIONS.map((option) => (
            <DropdownItem
              key={option.value}
              label={option.label}
              selected={option.value === provider}
              onClick={() => {
                onProviderChange(option.value);
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
