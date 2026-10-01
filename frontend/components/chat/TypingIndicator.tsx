import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-2 md:gap-3 animate-fade-in-up">
      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-800/80 border border-slate-700/60 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
        <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-300" />
      </div>
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-5">
          <span className="w-2 h-2 bg-violet-400/70 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-violet-400/70 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-violet-400/70 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
