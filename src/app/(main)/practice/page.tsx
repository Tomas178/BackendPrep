'use client';

import { useState, useCallback, useEffect } from 'react';
import Chat from '@/components/Chat';
import ChatHistory, { type ChatSummary } from '@/components/ChatHistory';
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
import type { ChatMessage } from '@/types/chat';

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

  const [chatId, setChatId] = useState<string | null>(null);
  const [initialMessages, setInitialMessages] = useState<ChatMessage[]>([]);
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [isChatsLoading, setIsChatsLoading] = useState(true);
  const [loadingChatId, setLoadingChatId] = useState<string | null>(null);
  const [hasUserMessages, setHasUserMessages] = useState(false);
  const [chatResetKey, setChatResetKey] = useState(0);
  const [pendingProvider, setPendingProvider] = useState<AvailableLLMs | null>(
    null
  );
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  async function fetchChats() {
    setIsChatsLoading(true);
    try {
      const res = await fetch('/api/chats');
      if (res.ok) setChats(await res.json());
    } catch {
      /* sidebar fetch is non-critical */
    } finally {
      setIsChatsLoading(false);
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  async function loadChat(id: string) {
    setLoadingChatId(id);
    try {
      const res = await fetch(`/api/chats/${id}`);
      if (!res.ok) return;

      const data = await res.json();
      setChatId(data.id);
      setProvider(data.provider as AvailableLLMs);
      setModel(data.model as AllModels);
      setInitialMessages(
        data.messages.map(
          (msg: {
            role: string;
            content: string;
            promptTokens: number | null;
            completionTokens: number | null;
            cost: string | null;
          }) => ({
            role: msg.role,
            content: msg.content,
            usage:
              msg.promptTokens != null
                ? {
                    promptTokens: msg.promptTokens,
                    completionTokens: msg.completionTokens!,
                    cost: parseFloat(msg.cost!),
                  }
                : undefined,
          })
        )
      );
      setHasUserMessages(true);
      setChatResetKey((prev) => prev + 1);
    } catch {
      /* load error is non-critical */
    } finally {
      setLoadingChatId(null);
    }
  }

  function startNewChat() {
    setChatId(null);
    setInitialMessages([]);
    setHasUserMessages(false);
    setChatResetKey((prev) => prev + 1);
  }

  function handleChatCreated(newChatId: string) {
    setChatId(newChatId);
    fetchChats();
  }

  async function confirmDeleteChat() {
    if (!pendingDeleteId) return;
    try {
      await fetch(`/api/chats/${pendingDeleteId}`, { method: 'DELETE' });
      setChats((prev) => prev.filter((chat) => chat.id !== pendingDeleteId));
      if (chatId === pendingDeleteId) {
        startNewChat();
      }
    } catch {
      /* delete error is non-critical */
    } finally {
      setPendingDeleteId(null);
    }
  }

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
    setChatId(null);
    setInitialMessages([]);
    setChatResetKey((prev) => prev + 1);
    setHasUserMessages(false);
    setPendingProvider(null);
  }

  const handleUserMessageSent = useCallback(() => {
    setHasUserMessages(true);
  }, []);

  return (
    <div className="flex min-h-0 flex-1 font-sans">
      <ChatHistory
        chats={chats}
        activeChatId={chatId}
        isLoading={isChatsLoading}
        loadingChatId={loadingChatId}
        onSelectChat={loadChat}
        onNewChat={startNewChat}
        onDeleteChat={(id) => setPendingDeleteId(id)}
      />

      <div className="bg-surface-alt flex flex-1 flex-col">
        <div className="border-border bg-surface border-b px-4 py-2">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <div className="flex items-center gap-2">
              <SettingsDropdown
                provider={provider}
                model={model}
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
          chatId={chatId}
          provider={provider}
          settings={{
            model,
            temperature,
            topP,
            maxOutputTokens,
            frequencyPenalty,
            presencePenalty,
          }}
          initialMessages={initialMessages}
          onUserMessageSent={handleUserMessageSent}
          onChatCreated={handleChatCreated}
        />
      </div>

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

      {pendingDeleteId && (
        <ConfirmDialog
          title="Delete conversation?"
          description="This will permanently delete this conversation and all its messages."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={confirmDeleteChat}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}
    </div>
  );
}
