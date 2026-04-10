'use client';

import { useState } from 'react';
import Slider from './Slider';

type SettingsProps = {
  temperature: number;
  topP: number;
  maxOutputTokens: number;
  frequencyPenalty: number;
  presencePenalty: number;
  onTemperatureChange: (value: number) => void;
  onTopPChange: (value: number) => void;
  onMaxOutputTokensChange: (value: number) => void;
  onFrequencyPenaltyChange: (value: number) => void;
  onPresencePenaltyChange: (value: number) => void;
};

export default function Settings({
  temperature,
  topP,
  maxOutputTokens,
  frequencyPenalty,
  presencePenalty,
  onTemperatureChange,
  onTopPChange,
  onMaxOutputTokensChange,
  onFrequencyPenaltyChange,
  onPresencePenaltyChange,
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
          <Slider
            label="Temperature"
            parameter={temperature}
            minValue={0}
            maxValue={2}
            stepValue={0.01}
            onParameterChange={onTemperatureChange}
            leftSide="Precise"
            rightSide="Creative"
          />
          <Slider
            label="Top-P"
            parameter={topP}
            minValue={0}
            maxValue={1}
            stepValue={0.01}
            onParameterChange={onTopPChange}
            leftSide="Narrow"
            rightSide="Broad"
          />
          <Slider
            label="Max Output Tokens"
            parameter={maxOutputTokens}
            minValue={1}
            maxValue={4000}
            stepValue={1}
            onParameterChange={onMaxOutputTokensChange}
            leftSide="Short"
            rightSide="Long"
            fixed={false}
          />
          <Slider
            label="Frequency Penalty"
            parameter={frequencyPenalty}
            minValue={-2}
            maxValue={2}
            stepValue={0.01}
            onParameterChange={onFrequencyPenaltyChange}
            leftSide="Repetitive"
            rightSide="Varied"
          />
          <Slider
            label="Presence Penalty"
            parameter={presencePenalty}
            minValue={-2}
            maxValue={2}
            stepValue={0.01}
            onParameterChange={onPresencePenaltyChange}
            leftSide="Focused"
            rightSide="Exploratory"
          />
        </div>
      )}
    </div>
  );
}
