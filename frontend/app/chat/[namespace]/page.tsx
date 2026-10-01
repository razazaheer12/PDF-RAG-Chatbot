import ChatWindow from '@/components/chat/ChatWindow';
import Sidebar from '@/components/ui/Sidebar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ namespace: string }>;
  searchParams: Promise<{ filename?: string; pages?: string; chunks?: string }>;
}

export default async function ChatPage({ params, searchParams }: Props) {
  const { namespace } = await params;
  const { filename, pages, chunks } = await searchParams;

  const pdfName = decodeURIComponent(filename ?? 'Document');
  const pagesCount = parseInt(pages ?? '0', 10);
  const chunksCount = parseInt(chunks ?? '0', 10);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar pdfName={pdfName} pages={pagesCount} chunks={chunksCount} />
      <div className="flex flex-col flex-1 min-w-0">
        <div className="hidden md:flex items-center gap-3 px-4 py-3 border-b border-slate-800/70 bg-slate-950/40 backdrop-blur-md">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Upload new PDF
          </Link>
        </div>
        <ChatWindow namespace={namespace} pdfName={pdfName} />
      </div>
    </div>
  );
}
