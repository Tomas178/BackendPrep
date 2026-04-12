'use client';

import {
  AVAILABLE_MODELS,
  type AvailableModels,
} from '@/constants/openai/enums/availableModels';

type ModelsDropdownProps = {
  model: AvailableModels;
  onModelChange: (model: AvailableModels) => void;
};

const MODEL_LABELS: Record<AvailableModels, string> = {
  [AVAILABLE_MODELS.GPT_4_1]: 'GPT-4.1',
  [AVAILABLE_MODELS.GPT_4_1_MINI]: 'GPT-4.1 mini',
  [AVAILABLE_MODELS.GPT_4_1_NANO]: 'GPT-4.1 nano',
  [AVAILABLE_MODELS.GPT_4O]: 'GPT-4o',
  [AVAILABLE_MODELS.GPT_4O_MINI]: 'GPT-4o mini',
};

export default function ModelsDropdown({
  model,
  onModelChange,
}: ModelsDropdownProps) {
  return (
    <select
      value={model}
      onChange={(e) => onModelChange(e.target.value as AvailableModels)}
      className="border-border bg-surface-alt text-primary rounded-lg border px-3 py-1.5 text-sm focus:outline-none"
    >
      {Object.values(AVAILABLE_MODELS).map((value) => (
        <option key={value} value={value}>
          {MODEL_LABELS[value]}
        </option>
      ))}
    </select>
  );
}
