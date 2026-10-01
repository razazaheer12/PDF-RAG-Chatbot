'use client';
import { useEffect, useRef, useState } from 'react';
import { Activity, BookOpenText, Brain, Check, ChevronDown, Cpu, Gauge, Zap } from 'lucide-react';
import { ModelOption } from '@/types';

interface Props {
  models: ModelOption[];
  selectedModel: string;
  onChange: (modelId: string) => void;
  disabled?: boolean;
}

const TAG_STYLES: Record<string, { badge: string; icon: typeof Zap }> = {
  Fast: { badge: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300', icon: Zap },
  Balanced: { badge: 'bg-sky-500/10 border-sky-500/25 text-sky-300', icon: Gauge },
  Large: { badge: 'bg-amber-500/10 border-amber-500/25 text-amber-300', icon: Gauge },
  'Most Powerful': { badge: 'bg-violet-500/10 border-violet-500/25 text-violet-300', icon: Brain },
  'RAG Specialist': { badge: 'bg-teal-500/10 border-teal-500/25 text-teal-300', icon: BookOpenText },
  '1M Context': { badge: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-300', icon: Zap },
  'Always Online': { badge: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300', icon: Activity },
};

export default function ModelSelector({ models, selectedModel, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = models.find((m) => m.id === selectedModel);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (models.length === 0) return null;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`
          w-full flex items-center gap-2 rounded-xl px-3 py-2 text-left
          bg-slate-900/80 border border-slate-800 backdrop-blur-sm
          hover:border-violet-500/40 transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-800
        `}
      >
        <Cpu className="w-3.5 h-3.5 text-violet-400 shrink-0" />
        <span className="text-slate-200 text-xs font-medium truncate flex-1 min-w-0">
          {selected?.label ?? 'Select model'}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="
            absolute right-0 top-full mt-2 z-[100]
            w-[calc(100vw-2rem)] max-w-xs sm:w-72
            max-h-[60vh] overflow-y-auto overscroll-contain
            bg-slate-900/95 backdrop-blur-xl border border-slate-800
            rounded-xl shadow-2xl shadow-black/60 p-1.5
            animate-fade-in-up
          "
        >
          <p className="px-2.5 pt-1.5 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Switch model
          </p>
          {models.map((m) => {
            const active = m.id === selectedModel;
            const tagStyle = m.tag ? TAG_STYLES[m.tag] : undefined;
            const TagIcon = tagStyle?.icon ?? Cpu;
            return (
              <button
                key={m.id}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(m.id);
                  setOpen(false);
                }}
                className={`
                  w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left
                  transition-colors duration-150
                  ${active ? 'bg-violet-500/10 border border-violet-500/25' : 'border border-transparent hover:bg-slate-800/70'}
                `}
              >
                <span
                  className={`
                    w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border
                    ${active
                      ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
                      : 'bg-slate-800/80 border-slate-700/60 text-slate-400'}
                  `}
                >
                  <TagIcon className="w-3.5 h-3.5" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className={`block text-xs font-medium truncate ${active ? 'text-white' : 'text-slate-300'}`}>
                    {m.label}
                  </span>
                  {m.tag && (
                    <span
                      className={`
                        inline-flex items-center mt-0.5 px-1.5 py-px rounded-full
                        text-[9px] font-semibold border leading-tight
                        ${tagStyle?.badge ?? 'bg-slate-500/10 border-slate-500/25 text-slate-300'}
                      `}
                    >
                      {m.tag}
                    </span>
                  )}
                </span>
                {active && <Check className="w-3.5 h-3.5 text-violet-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
