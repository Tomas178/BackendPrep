'use client';

import { useState } from 'react';
import Chat from '@/components/Chat';
import Settings from '@/components/Settings';

export default function Practice() {
  const [temperature, setTemperature] = useState(0.9);
  const [topP, setTopP] = useState(1.0);

  return (
    <div className="bg-surface-alt flex flex-1 flex-col font-sans">
      <Settings
        temperature={temperature}
        topP={topP}
        onTemperatureChange={setTemperature}
        onTopPChange={setTopP}
      />
      <Chat temperature={temperature} topP={topP} />
    </div>
  );
}
