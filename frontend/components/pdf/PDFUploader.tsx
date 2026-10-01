'use client';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { CheckCircle2, FileText, Loader2, Upload, X } from 'lucide-react';
import { usePDFUpload } from '@/hooks/usePDFUpload';

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function PDFUploader() {
  const router = useRouter();
  const { uploadPDF, uploading, progress, error } = usePDFUpload();
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    async (files: File[]) => {
      const selected = files[0];
      if (!selected) return;
      setFile(selected);
      const result = await uploadPDF(selected);
      if (result) {
        router.push(
          `/chat/${result.namespace}?filename=${encodeURIComponent(result.filename)}&pages=${result.pages}&chunks=${result.chunks}`,
        );
      }
    },
    [uploadPDF, router],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled: uploading,
  });

  return (
    <div className="w-full max-w-lg px-4">
      {/* File preview banner */}
      {file && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 backdrop-blur-md px-4 py-3 animate-fade-in-up">
          <span className="w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-violet-300" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{file.name}</p>
            <p className="text-slate-500 text-xs mt-0.5">{formatSize(file.size)}</p>
          </div>
          {uploading ? (
            <Loader2 className="w-4 h-4 text-violet-400 animate-spin shrink-0" />
          ) : (
            !error && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          {!uploading && (
            <button
              onClick={() => setFile(null)}
              className="text-slate-500 hover:text-white transition-colors shrink-0"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          relative rounded-2xl p-10 md:p-12 text-center cursor-pointer outline-none
          transition-all duration-300
          backdrop-blur-md bg-white/[0.03] border-2 border-dashed
          ${isDragActive
            ? 'border-violet-400 bg-violet-500/10 shadow-[0_0_40px_-8px_rgba(139,92,246,0.55)] scale-[1.01]'
            : 'border-slate-700/80 hover:border-violet-500/50 hover:bg-white/[0.05]'}
          ${uploading ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          {uploading ? (
            <>
              <Loader2 className="w-12 h-12 text-violet-400 animate-spin" />
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Processing PDF...</span>
                  <span className="text-violet-300 font-medium tabular-nums">{progress}%</span>
                </div>
                <div className="relative w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="relative bg-gradient-to-r from-violet-600 to-fuchsia-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <span
                  className={`absolute inset-0 rounded-2xl animate-pulse-ring ${isDragActive ? 'bg-violet-500/20' : ''}`}
                  aria-hidden
                />
                <div
                  className={`
                    relative w-16 h-16 rounded-2xl flex items-center justify-center
                    transition-colors duration-300
                    ${isDragActive ? 'bg-violet-500/30' : 'bg-violet-500/15'}
                  `}
                >
                  {isDragActive ? (
                    <FileText className="w-8 h-8 text-violet-300" />
                  ) : (
                    <Upload className="w-8 h-8 text-violet-400" />
                  )}
                </div>
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  {isDragActive ? 'Drop your PDF here' : 'Upload your PDF'}
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  Drag & drop or click to browse • Max 20MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-3 text-red-400 text-sm text-center animate-fade-in-up">{error}</p>
      )}
    </div>
  );
}
