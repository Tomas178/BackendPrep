'use client';

import { useState } from 'react';
import Chat from '@/components/Chat';
import SettingsDropdown from '@/components/Dropdowns/Settings';
import ModelsDropdown from '@/components/Dropdowns/Models';
import ProviderDropdown from '@/components/Dropdowns/Provider';
import {
  DEFAULT_FREQUENCY_PENALTY,
  DEFAULT_MAX_OUTPUT_TOKENS,
  DEFAULT_PRESENCE_PENALTY,
  DEFAULT_TEMPERATURE,
  DEFAULT_TOP_P,
} from '@/constants/LLMs/settings';
import { OPENAI_AVAILABLE_MODELS } from '@/constants/LLMs/openai/availableModels';
import { ANTHROPIC_AVAILABLE_MODELS } from '@/constants/LLMs/anthropic/availableModels';
import { GOOGLE_AVAILABLE_MODELS } from '@/constants/LLMs/google/availableModels';
import {
  AVAILABLE_LLMS,
  type AvailableLLMs,
} from '@/constants/LLMs/availableLLMs';
import type { AllModels } from '@/constants/LLMs/allModels';

const DEFAULT_MODELS: Record<AvailableLLMs, AllModels> = {
  [AVAILABLE_LLMS.OPENAI]: OPENAI_AVAILABLE_MODELS.GPT_4O,
  [AVAILABLE_LLMS.ANTHROPIC]: ANTHROPIC_AVAILABLE_MODELS.CLAUDE_SONNET_4_6,
  [AVAILABLE_LLMS.GOOGLE]: GOOGLE_AVAILABLE_MODELS.GEMINI_2_5_FLASH,
};

export default function Practice() {
  const [provider, setProvider] = useState<AvailableLLMs>(
    AVAILABLE_LLMS.OPENAI
  );
  const [model, setModel] = useState<AllModels>(OPENAI_AVAILABLE_MODELS.GPT_4O);
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

  function handleProviderChange(newProvider: AvailableLLMs) {
    setProvider(newProvider);
    setModel(DEFAULT_MODELS[newProvider]);
  }

  return (
    <div className="bg-surface-alt flex flex-1 flex-col font-sans">
      <div className="border-border bg-surface border-b px-4 py-2">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-2">
            <SettingsDropdown
              provider={provider}
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
            <ProviderDropdown
              provider={provider}
              onProviderChange={handleProviderChange}
            />
          </div>
          <ModelsDropdown
            provider={provider}
            model={model}
            onModelChange={setModel}
          />
        </div>
      </div>

      <Chat
        provider={provider}
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
