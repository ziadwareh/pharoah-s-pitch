
import React from 'react';

interface ResultViewProps {
  imageUrl: string;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ imageUrl, onReset }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'pharaoh-pitch-caricature.png';
    link.click();
  };

  const shareImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'caricature.png', { type: 'image/png' });
      
      const shareData = {
        files: [file],
        title: 'My Pharaoh Pitch Caricature',
        text: 'Check out my Egypt National Team caricature created with AI!',
      };

      // Check if sharing is supported and if the specific data can be shared
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else if (navigator.share) {
        // Fallback for browsers that have .share but not .canShare or failed file check
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: window.location.href // Fallback to sharing the URL if file share fails
        });
      } else {
        downloadImage();
      }
    } catch (err: any) {
      // "AbortError" means the user cancelled the share, which is not a failure we need to log or fallback from.
      if (err.name !== 'AbortError') {
        console.error('Sharing failed:', err);
        // Fallback to download for real errors
        downloadImage();
      }
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
      <div className="relative group mx-auto max-w-lg">
        <div className="absolute -inset-4 bg-gradient-to-r from-red-600 via-zinc-900 to-black rounded-[40px] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div className="relative rounded-[32px] overflow-hidden border-8 border-zinc-900 shadow-2xl bg-zinc-900 aspect-square">
          <img 
            src={imageUrl} 
            alt="Your Caricature" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Badge Overlay */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-600 rounded-full border-4 border-zinc-900 flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
           <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-4xl font-comic tracking-wider text-white">YALLA EGYPT!</h2>
        <p className="text-zinc-400">Your national team kit is ready for the pitch.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
        <button 
          onClick={shareImage}
          className="bg-white text-black font-extrabold py-4 px-8 rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-white/10 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          SHARE & SAVE
        </button>
        <button 
          onClick={onReset}
          className="bg-zinc-800 text-white font-extrabold py-4 px-8 rounded-2xl border border-zinc-700 hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          TRY ANOTHER
        </button>
      </div>
    </div>
  );
};
