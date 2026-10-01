export interface SourceRef {
  chunkIndex: number;
  excerpt: string;
  score: number;
}

export interface ChatHistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  sources?: SourceRef[];
}

export interface PDFInfo {
  namespace: string;
  filename: string;
  pages: number;
  chunks: number;
}

export interface UploadResponse {
  success: boolean;
  namespace: string;
  filename: string;
  pages: number;
  chunks: number;
  message: string;
}
export interface ModelOption {
  id: string;
  label: string;
  tag?: string;
}