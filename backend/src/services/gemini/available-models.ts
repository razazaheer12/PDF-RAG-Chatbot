export interface ModelOption {
  id: string;
  label: string;
  tag?: string;
}

export const AVAILABLE_MODELS: ModelOption[] = [
  { id: 'nvidia/nemotron-3-super-120b-a12b:free', label: 'Nemotron Super', tag: 'Large' },
  { id: 'nvidia/nemotron-3-ultra-550b-a55b:free', label: 'Nemotron Ultra', tag: 'Most Powerful' },
  { id: 'qwen/qwen-3.8-27b:free', label: 'Qwen 3.8 27B', tag: 'RAG Specialist' },
  { id: 'nvidia/nemotron-3.5-lightning:free', label: 'Nemotron 3.5 Lightning', tag: '1M Context' },
  { id: 'openrouter/free', label: 'Auto Router', tag: 'Always Online' },
];

export const DEFAULT_MODEL = AVAILABLE_MODELS[0].id;
