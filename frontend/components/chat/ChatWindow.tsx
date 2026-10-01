'use client';
import { useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { useModels } from '@/hooks/useModels';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import ModelSelector from './ModelSelector';

interface Props {
  namespace: string;
  pdfName: string;
}

export default function ChatWindow({ namespace, pdfName }: Props) {
  const { messages, isStreaming, sendMessage } = useChat(namespace);
  const { models, selectedModel, setSelectedModel } = useModels();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSend = (question: string) => {
    sendMessage(question, selectedModel);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header — z-30 keeps the model dropdown above the animated message list */}
      <div className="relative z-30 px-4 md:px-6 py-4 border-b border-slate-800/70 bg-slate-950/50 backdrop-blur-md pl-14 md:pl-6 flex flex-wrap items-center justify-between gap-2 md:gap-3">
        <div className="min-w-0 flex-1 basis-32">
          <h2 className="text-white font-semibold text-sm truncate">{pdfName}</h2>
          <p className="text-slate-500 text-xs mt-0.5 truncate">Ask anything about this document</p>
        </div>
        <div className="w-44 sm:w-52 md:w-56 shrink-0 ml-auto">
          <ModelSelector
            models={models}
            selectedModel={selectedModel}
            onChange={setSelectedModel}
            disabled={isStreaming}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-0 flex-1 overflow-y-auto px-3 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="max-w-3xl mx-auto w-full space-y-4 md:space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isStreaming && messages[messages.length - 1]?.content === '' && (
            <TypingIndicator />
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} disabled={isStreaming} />
    </div>
  );
}
