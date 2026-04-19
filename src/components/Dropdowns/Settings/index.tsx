'use client';

import { useEffect, useRef, useState } from 'react';
import { Settings as SettingsIcon, ChevronDown } from 'lucide-react';
import type { AvailableLLMs } from '@/constants/LLMs/availableLLMs';
import type { AllModels } from '@/constants/LLMs/allModels';
import Slider from './Slider';
import { SLIDER_CONFIGS, type SettingKey } from './config';

type SettingsProps = {
  provider: AvailableLLMs;
  model: AllModels;
  values: Record<SettingKey, number>;
  onChange: Record<SettingKey, (value: number) => void>;
};

export default function Settings({
  provider,
  model,
  values,
  onChange,
}: SettingsProps) {
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
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setShowSettings((prev) => !prev)}
        className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
          showSettings
            ? 'bg-accent text-accent-foreground'
            : 'text-muted hover:text-primary hover:bg-hover'
        }`}
      >
        <SettingsIcon size={16} />
        Settings
        <ChevronDown
          size={14}
          className={`transition-transform ${showSettings ? 'rotate-180' : ''}`}
        />
      </button>

      {showSettings && (
        <div className="border-border bg-surface absolute top-full left-0 z-50 mt-1.5 w-80 rounded-xl border p-4 shadow-lg">
          <div className="space-y-4">
            {SLIDER_CONFIGS.map(
              ({
                key,
                unsupportedProviders,
                unsupportedModels,
                maxValueOverrides,
                ...sliderProps
              }) => {
                const maxValue =
                  maxValueOverrides?.[provider] ?? sliderProps.maxValue;
                const disabled =
                  unsupportedProviders?.includes(provider) ||
                  unsupportedModels?.includes(model);
                return (
                  <Slider
                    key={key}
                    {...sliderProps}
                    maxValue={maxValue}
                    parameter={Math.min(values[key], maxValue)}
                    onParameterChange={onChange[key]}
                    disabled={disabled}
                  />
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}
