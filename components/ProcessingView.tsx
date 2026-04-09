
import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Stitching the Pharaoh's kit...",
  "Sketching your caricature face...",
  "Applying Egypt National Team colors...",
  "Blowing up the bubbly character body...",
  "Adding high-contrast B&W artistic touch...",
  "Preparing for the kick-off..."
];

export const ProcessingView: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8 animate-in fade-in duration-700">
      <div className="relative w-48 h-48">
        {/* Animated Soccer Ball / Loading Indicator */}
        <div className="absolute inset-0 bg-red-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-32 h-32 border-8 border-t-red-600 border-r-zinc-800 border-b-zinc-800 border-l-zinc-800 rounded-full animate-spin"></div>
          <div className="absolute w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center border-4 border-zinc-800 overflow-hidden">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
                <div className="grid grid-cols-2 gap-1 w-8 h-8 opacity-40">
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="text-center max-w-sm">
        <h3 className="text-3xl font-comic tracking-widest text-red-500 mb-2">GENERATING...</h3>
        <p className="text-zinc-400 text-lg font-medium animate-pulse">{MESSAGES[msgIndex]}</p>
      </div>
      
      <div className="w-full max-w-xs h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-red-600 animate-[loading-bar_15s_ease-in-out_infinite]"></div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
