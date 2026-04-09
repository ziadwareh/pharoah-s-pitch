
export interface CaricatureResult {
  imageUrl: string;
  status: 'idle' | 'processing' | 'success' | 'error';
  error?: string;
}

export type AppState = 'camera' | 'upload' | 'processing' | 'result';
