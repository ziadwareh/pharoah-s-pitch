
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { CameraView } from './components/CameraView';
import { UploadView } from './components/UploadView';
import { ProcessingView } from './components/ProcessingView';
import { ResultView } from './components/ResultView';
import { generateCaricature } from './services/gemini';
import { AppState } from './types';

export default function App() {
  const [state, setState] = useState<AppState>('camera');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageInput = useCallback(async (base64: string) => {
    setState('processing');
    setError(null);
    try {
      const result = await generateCaricature(base64);
      setResultImage(result);
      setState('result');
    } catch (err) {
      console.error(err);
      setError("Failed to generate caricature. Please try again with a different photo.");
      setState('upload'); // Fallback to upload if processing fails
    }
  }, []);

  const reset = () => {
    setState('camera');
    setResultImage(null);
    setError(null);
  };

  return (
    <Layout>
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-2xl text-red-500 text-sm flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}

      {state === 'camera' && (
        <CameraView 
          onCapture={handleImageInput} 
          onSwitchToUpload={() => setState('upload')} 
        />
      )}

      {state === 'upload' && (
        <UploadView 
          onUpload={handleImageInput} 
          onSwitchToCamera={() => setState('camera')} 
        />
      )}

      {state === 'processing' && (
        <ProcessingView />
      )}

      {state === 'result' && resultImage && (
        <ResultView 
          imageUrl={resultImage} 
          onReset={reset} 
        />
      )}
    </Layout>
  );
}
