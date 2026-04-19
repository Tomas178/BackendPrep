'use client';

import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

type CopyButtonProps = {
  text: string;
};

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (copied) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      className="text-muted hover:text-primary cursor-pointer"
    >
      {copied ? <ClipboardCheck size={14} /> : <Clipboard size={14} />}
    </button>
  );
}
