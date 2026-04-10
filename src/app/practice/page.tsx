'use client';

import { useState } from 'react';
import Chat from '@/components/Chat';
import SettingsDropdown from '@/components/SettingsDropdown';
import {
  DEFAULT_FREQUENCY_PENALTY,
  DEFAULT_MAX_OUTPUT_TOKENS,
  DEFAULT_PRESENCE_PENALTY,
  DEFAULT_TEMPERATURE,
  DEFAULT_TOP_P,
} from '@/constants/openai/settings';

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

  return (
    <div className="bg-surface-alt flex flex-1 flex-col font-sans">
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

      <Chat
        settings={{
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
