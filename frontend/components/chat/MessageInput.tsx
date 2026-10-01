'use client';
import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasText = value.trim().length > 0;

  return (
    <div className="p-3 md:p-4 border-t border-slate-800/70 bg-slate-950/50 backdrop-blur-md">
      <div
        className={`
          max-w-3xl mx-auto flex items-end gap-2 md:gap-3
          rounded-2xl border bg-slate-900/60 backdrop-blur-md px-3 md:px-4 py-2.5
          transition-all duration-300
          ${hasText
            ? 'border-violet-500/50 shadow-[0_0_24px_-6px_rgba(139,92,246,0.4)]'
            : 'border-slate-800'}
        `}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask a question about your PDF..."
          rows={1}
          className="
            flex-1 resize-none bg-transparent text-white placeholder-slate-500
            text-sm outline-none py-1.5
            disabled:opacity-50 disabled:cursor-not-allowed
            max-h-40 overflow-y-auto
          "
        />
        <button
          onClick={handleSend}
          disabled={!hasText || disabled}
          aria-label="Send message"
          className={`
            w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
            transition-all duration-300
            ${hasText && !disabled
              ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_18px_rgba(124,58,237,0.55)] hover:scale-105 active:scale-95'
              : 'bg-slate-800/80 text-slate-600 cursor-not-allowed border border-slate-700/50'}
          `}
        >
          <SendHorizonal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
