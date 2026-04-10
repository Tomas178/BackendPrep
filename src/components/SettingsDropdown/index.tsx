'use client';

import { useEffect, useRef, useState } from 'react';
import Slider from './Slider';
import { SLIDER_CONFIGS, type SettingKey } from './config';

type SettingsProps = {
  values: Record<SettingKey, number>;
  onChange: Record<SettingKey, (value: number) => void>;
};

export default function Settings({ values, onChange }: SettingsProps) {
  const [showSettings, setShowSettings] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showSettings) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSettings(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  return (
    <div
      ref={containerRef}
      className="border-border bg-surface border-b px-4 py-2"
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <button
          type="button"
          onClick={() => setShowSettings((prev) => !prev)}
          className="text-muted hover:text-primary cursor-pointer text-sm transition-colors"
        >
          {showSettings ? 'Hide settings' : 'Settings'}
        </button>
      </div>
      {showSettings && (
        <div className="mx-auto mt-3 max-w-3xl space-y-3 pb-2">
          {SLIDER_CONFIGS.map(({ key, ...sliderProps }) => (
            <Slider
              key={key}
              {...sliderProps}
              parameter={values[key]}
              onParameterChange={onChange[key]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
