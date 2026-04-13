'use client';

import { useRef, useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

const THEMES = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
] as const;

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
        aria-label="Toggle theme"
        className="text-secondary hover:bg-hover relative cursor-pointer rounded-full p-2 transition-colors"
      >
        <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute top-2 left-2 h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      </button>

      {open && (
        <div className="border-border bg-surface absolute top-full right-0 z-50 mt-1.5 min-w-32 rounded-xl border py-1 shadow-lg">
          {THEMES.map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setTheme(value);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-sm transition-colors ${
                theme === value
                  ? 'text-primary font-medium'
                  : 'text-secondary hover:bg-hover'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
