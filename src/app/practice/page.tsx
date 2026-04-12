'use client';

import { useState } from 'react';
import Chat from '@/components/Chat';
import SettingsDropdown from '@/components/Dropdowns/Settings';
import ModelsDropdown from '@/components/Dropdowns/Models';
import {
  DEFAULT_FREQUENCY_PENALTY,
  DEFAULT_MAX_OUTPUT_TOKENS,
  DEFAULT_PRESENCE_PENALTY,
  DEFAULT_TEMPERATURE,
  DEFAULT_TOP_P,
} from '@/constants/LLMs/settings';
import {
  AVAILABLE_MODELS,
  AvailableModels,
} from '@/constants/LLMs/openai/availableModels';

export default function Practice() {
  const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);
  const [topP, setTopP] = useState(DEFAULT_TOP_P);
  const [maxOutputTokens, setMaxOutputTokens] = useState(
    DEFAULT_MAX_OUTPUT_TOKENS
  );
  const [frequencyPenalty, setFrequencyPenalty] = useState(
    DEFAULT_FREQUENCY_PENALTY
  );
  const [presencePenalty, setPresencePenalty] = useState(
    DEFAULT_PRESENCE_PENALTY
  );
  const [model, setModel] = useState<AvailableModels>(AVAILABLE_MODELS.GPT_4O);

  return (
    <div className="bg-surface-alt flex flex-1 flex-col font-sans">
      <div className="border-border bg-surface border-b px-4 py-2">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <SettingsDropdown
            values={{
              temperature,
              topP,
              maxOutputTokens,
              frequencyPenalty,
              presencePenalty,
            }}
            onChange={{
              temperature: setTemperature,
              topP: setTopP,
              maxOutputTokens: setMaxOutputTokens,
              frequencyPenalty: setFrequencyPenalty,
              presencePenalty: setPresencePenalty,
            }}
          />
          <ModelsDropdown model={model} onModelChange={setModel} />
        </div>
      </div>

      <Chat
        settings={{
          model,
          temperature,
          topP,
          maxOutputTokens,
          frequencyPenalty,
          presencePenalty,
        }}
      />
    </div>
  );
}
