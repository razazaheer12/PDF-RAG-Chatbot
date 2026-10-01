import Link from 'next/link';
import { ArrowRight, FileText, Zap, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative max-w-2xl w-full text-center space-y-8 md:space-y-10">
        <div className="space-y-5 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-violet-300 text-sm">
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            Powered by OpenRouter + RAG
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Chat with your
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent"> PDF</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto">
            Upload any PDF and ask questions. Get instant answers powered by OpenRouter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-left animate-fade-in-up [animation-delay:120ms]">
          {[
            { icon: FileText, title: 'Any PDF', desc: 'Upload research, books, reports' },
            { icon: Zap, title: 'Instant Answers', desc: 'Streaming responses in real-time' },
            { icon: Shield, title: 'Context-Aware', desc: 'Answers strictly from your document' },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="
                backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4
                hover:border-purple-500/50 hover:-translate-y-0.5 hover:bg-white/[0.07]
                transition-all duration-300
              "
            >
              <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-violet-300" />
              </div>
              <p className="text-white text-sm font-semibold">{title}</p>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="relative inline-flex animate-fade-in-up [animation-delay:240ms]">
          <div
            className="absolute -inset-4 bg-gradient-to-r from-violet-600/40 via-fuchsia-500/30 to-indigo-600/40 rounded-2xl blur-xl animate-glow"
            aria-hidden
          />
          <Link
            href="/upload"
            className="
              relative inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500
              text-white font-semibold px-8 py-4 rounded-xl text-base
              shadow-lg shadow-violet-950/60 border border-violet-500/40
              transition-all duration-200 group hover:scale-[1.02] active:scale-[0.98]
            "
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}
