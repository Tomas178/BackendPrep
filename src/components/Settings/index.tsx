'use client';

import { useState } from 'react';

type SettingsProps = {
  temperature: number;
  topP: number;
  onTemperatureChange: (value: number) => void;
  onTopPChange: (value: number) => void;
};

export default function Settings({
  temperature,
  topP,
  onTemperatureChange,
  onTopPChange,
}: SettingsProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="border-border bg-surface border-b px-4 py-2">
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
          <div>
            <div className="flex items-center justify-between">
              <label className="text-secondary text-xs font-medium">
                Temperature
              </label>
              <span className="text-muted text-xs">
                {temperature.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={2}
              step={0.01}
              value={temperature}
              onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
              className="accent-accent mt-1 w-full"
            />
            <div className="text-muted flex justify-between text-[10px]">
              <span>Precise</span>
              <span>Creative</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-secondary text-xs font-medium">
                Top-P
              </label>
              <span className="text-muted text-xs">{topP.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={topP}
              onChange={(e) => onTopPChange(parseFloat(e.target.value))}
              className="accent-accent mt-1 w-full"
            />
            <div className="text-muted flex justify-between text-[10px]">
              <span>Narrow</span>
              <span>Broad</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
