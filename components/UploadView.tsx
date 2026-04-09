
import React from 'react';

interface UploadViewProps {
  onUpload: (base64: string) => void;
  onSwitchToCamera: () => void;
}

export const UploadView: React.FC<UploadViewProps> = ({ onUpload, onSwitchToCamera }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="group relative bg-zinc-900 rounded-3xl border-4 border-dashed border-zinc-800 p-12 transition-all hover:border-red-600/50 hover:bg-zinc-900/80 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        
        <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">Drop your selfie here</h3>
        <p className="text-zinc-400 text-lg mb-8">Or click to browse your files</p>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg text-sm text-zinc-500 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          JPG, PNG or WEBP (Max 10MB)
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="w-px h-8 bg-zinc-800"></div>
        <button 
          onClick={onSwitchToCamera}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          Use Camera Instead
        </button>
      </div>
    </div>
  );
};
