'use client';
import { FileText, Layers, BookOpen, Menu, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  pdfName: string;
  pages: number;
  chunks: number;
}

export default function Sidebar({ pdfName, pages, chunks }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="
          md:hidden fixed top-3 left-3 z-50 rounded-lg p-2
          bg-slate-900/80 backdrop-blur-md border border-slate-800
          hover:border-violet-500/40 transition-colors
        "
        onClick={() => setOpen(!open)}
        aria-label="Toggle document sidebar"
      >
        <Menu className="w-4 h-4 text-violet-400" />
      </button>

      {/* Overlay */}
      <div
        className={`
          md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-slate-950/80 backdrop-blur-xl border-r border-slate-800/80
          flex flex-col p-4 shrink-0
          transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-violet-300" />
            </span>
            <div className="min-w-0">
              <h1 className="text-white font-bold text-base leading-tight truncate">PDF Chat</h1>
              <p className="text-slate-500 text-[11px] mt-0.5">Powered by OpenRouter</p>
            </div>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors shrink-0"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {pdfName && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-4 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Active document
            </p>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400 shrink-0" />
              <span className="text-white text-sm font-medium truncate">{pdfName}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>{pages} pages</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>{chunks} chunks indexed</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
