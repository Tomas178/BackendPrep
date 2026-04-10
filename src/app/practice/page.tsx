'use client';

import { useState } from 'react';
import Chat from '@/components/Chat';
import SettingsDropdown from '@/components/SettingsDropdown';

export default function Practice() {
  const [temperature, setTemperature] = useState(0.9);
  const [topP, setTopP] = useState(1.0);
  const [maxOutputTokens, setMaxOutputTokens] = useState(500);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.4);
  const [presencePenalty, setPresencePenalty] = useState(0.4);

  return (
    <div className="bg-surface-alt flex flex-1 flex-col font-sans">
      <SettingsDropdown
        temperature={temperature}
        topP={topP}
        maxOutputTokens={maxOutputTokens}
        frequencyPenalty={frequencyPenalty}
        presencePenalty={presencePenalty}
        onTemperatureChange={setTemperature}
        onTopPChange={setTopP}
        onMaxOutputTokensChange={setMaxOutputTokens}
        onFrequencyPenaltyChange={setFrequencyPenalty}
        onPresencePenaltyChange={setPresencePenalty}
      />

      <Chat
        temperature={temperature}
        topP={topP}
        maxOutputTokens={maxOutputTokens}
        frequencyPenalty={frequencyPenalty}
        presencePenalty={presencePenalty}
      />
    </div>
  );
}
