'use client';

import { useState, useCallback } from 'react';
import Chat from '@/components/Chat';
import SettingsDropdown from '@/components/Dropdowns/Settings';
import ModelsDropdown from '@/components/Dropdowns/Models';
import ProviderDropdown from '@/components/Dropdowns/Provider';
import ConfirmDialog from '@/components/ConfirmDialog';
import {
  DEFAULT_FREQUENCY_PENALTY,
  DEFAULT_MAX_OUTPUT_TOKENS,
  DEFAULT_PRESENCE_PENALTY,
  DEFAULT_TEMPERATURE,
  DEFAULT_TOP_P,
} from '@/constants/LLMs/settings';
import {
  AVAILABLE_LLMS,
  type AvailableLLMs,
} from '@/constants/LLMs/availableLLMs';
import {
  ALL_AVAILABLE_MODELS,
  type AllModels,
} from '@/constants/LLMs/allModels';

const DEFAULT_MODELS: Record<AvailableLLMs, AllModels> = {
  [AVAILABLE_LLMS.OPENAI]: ALL_AVAILABLE_MODELS.OPENAI.GPT_4O,
  [AVAILABLE_LLMS.ANTHROPIC]: ALL_AVAILABLE_MODELS.ANTHROPIC.CLAUDE_SONNET_4_6,
  [AVAILABLE_LLMS.GOOGLE]: ALL_AVAILABLE_MODELS.GOOGLE.GEMINI_2_5_FLASH,
};

export default function Practice() {
  const [provider, setProvider] = useState<AvailableLLMs>(
    AVAILABLE_LLMS.OPENAI
  );
  const [model, setModel] = useState<AllModels>(
    ALL_AVAILABLE_MODELS.OPENAI.GPT_4O
  );
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

  const [hasUserMessages, setHasUserMessages] = useState(false);
  const [chatResetKey, setChatResetKey] = useState(0);
  const [pendingProvider, setPendingProvider] = useState<AvailableLLMs | null>(
    null
  );

  function handleProviderChange(newProvider: AvailableLLMs) {
    if (hasUserMessages) {
      setPendingProvider(newProvider);
      return;
    }
    setProvider(newProvider);
    setModel(DEFAULT_MODELS[newProvider]);
  }

  function confirmProviderSwitch() {
    if (!pendingProvider) return;
    setProvider(pendingProvider);
    setModel(DEFAULT_MODELS[pendingProvider]);
    setChatResetKey((prev) => prev + 1);
    setHasUserMessages(false);
    setPendingProvider(null);
  }

  const handleUserMessageSent = useCallback(() => {
    setHasUserMessages(true);
  }, []);

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
        key={chatResetKey}
        provider={provider}
        settings={{
          model,
          temperature,
          topP,
          maxOutputTokens,
          frequencyPenalty,
          presencePenalty,
        }}
        onUserMessageSent={handleUserMessageSent}
      />

      {pendingProvider && (
        <ConfirmDialog
          title="Switch provider?"
          description="Switching the LLM provider will clear your current conversation. This action cannot be undone."
          confirmLabel="Switch"
          cancelLabel="Cancel"
          onConfirm={confirmProviderSwitch}
          onCancel={() => setPendingProvider(null)}
        />
      )}
    </div>
  );
}
