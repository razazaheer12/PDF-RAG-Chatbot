import { Message } from '@/types';
import { Bot, FileText, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-2 md:gap-3 animate-fade-in-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`
          w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border
          ${isUser
            ? 'bg-gradient-to-br from-indigo-500 to-violet-600 border-violet-400/30 shadow-lg shadow-violet-950/50'
            : 'bg-slate-800/80 border-slate-700/60 backdrop-blur-sm'}
        `}
      >
        {isUser
          ? <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
          : <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-300" />
        }
      </div>

      <div
        className={`
          max-w-[82%] md:max-w-[75%] rounded-2xl px-3 md:px-4 py-2.5 md:py-3 text-sm leading-relaxed
          ${isUser
            ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-tr-sm border border-violet-500/30 shadow-lg shadow-indigo-950/40'
            : 'bg-slate-900/60 backdrop-blur-md border border-slate-800/80 text-slate-100 rounded-tl-sm'}
        `}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1 marker:text-violet-400">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1 marker:text-violet-400">{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
              code: ({ children }) => (
                <code className="bg-slate-950/80 border border-slate-800 px-1.5 py-0.5 rounded text-violet-300 text-xs font-mono">
                  {children}
                </code>
              ),
            }}
          >
            {message.content || (message.isStreaming ? '▋' : '')}
          </ReactMarkdown>
        )}

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-800/80">
            {message.sources.map((source, i) => (
              <span
                key={i}
                title={`"${source.excerpt}…" (relevance ${Math.round(source.score * 100)}%)`}
                className="
                  inline-flex items-center gap-1 px-2 py-0.5 rounded-full cursor-default
                  bg-purple-950/40 border border-purple-500/30 text-purple-300 text-[11px] font-medium
                  backdrop-blur-sm transition-all duration-200
                  hover:-translate-y-0.5 hover:border-purple-400/50 hover:bg-purple-900/40 hover:shadow-md hover:shadow-purple-950/50
                "
              >
                <FileText className="w-3 h-3 text-purple-400" />
                Source: Chunk {source.chunkIndex + 1}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
