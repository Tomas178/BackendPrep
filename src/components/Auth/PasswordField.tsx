'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  minLength?: number;
  value: string;
  onChange: (value: string) => void;
};

export default function PasswordField({
  id,
  label,
  required,
  minLength,
  value,
  onChange,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="text-secondary block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          required={required}
          minLength={minLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-border bg-surface text-primary focus:ring-accent block w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:ring-2 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="text-muted hover:text-secondary absolute inset-y-0 right-0 flex h-auto w-auto cursor-pointer items-center p-2"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
