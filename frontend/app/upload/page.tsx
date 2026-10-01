import PDFUploader from '@/components/pdf/PDFUploader';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative w-full max-w-lg animate-fade-in-up">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Upload PDF</h1>
          <p className="text-slate-400 mt-2 text-sm">
            Your PDF will be processed and indexed for intelligent Q&A.
          </p>
        </div>

        <PDFUploader />
      </div>
    </main>
  );
}
