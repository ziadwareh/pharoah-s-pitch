
import React, { useRef, useState, useCallback, useEffect } from 'react';

interface CameraViewProps {
  onCapture: (base64: string) => void;
  onSwitchToUpload: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture, onSwitchToUpload }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setHasPermission(false);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        onCapture(dataUrl);
      }
    }
  };

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-zinc-900 rounded-3xl border-2 border-dashed border-zinc-800 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Camera Access Denied</h3>
        <p className="text-zinc-400 mb-6 max-w-sm">We need camera access to take your selfie. You can also upload a photo instead.</p>
        <button 
          onClick={onSwitchToUpload}
          className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-zinc-200 transition-colors"
        >
          Upload Photo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-black border-4 border-zinc-800 shadow-2xl mx-auto max-w-2xl">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          onLoadedMetadata={() => setIsCameraReady(true)}
          className="w-full h-full object-cover mirror transform -scale-x-100"
        />
        
        {/* Face Overlay Guideline */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-48 h-64 border-2 border-dashed border-white/30 rounded-[100px] flex items-center justify-center">
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Position Face Here</span>
            </div>
        </div>

        {/* Action Controls */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center items-center gap-6">
          <button 
            onClick={onSwitchToUpload}
            className="w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 transition-all text-white"
            title="Switch to upload"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </button>

          <button 
            onClick={captureImage}
            disabled={!isCameraReady}
            className="group relative w-20 h-20 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 disabled:opacity-50"
          >
            <div className="w-16 h-16 rounded-full border-4 border-black border-opacity-20 flex items-center justify-center">
               <div className="w-10 h-10 rounded-full bg-red-600 group-hover:bg-red-500 transition-colors"></div>
            </div>
          </button>

          <div className="w-12 h-12 invisible"></div>
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="text-center">
        <h2 className="text-3xl font-comic tracking-wide text-white uppercase">Take a Selfie</h2>
        <p className="text-zinc-400 mt-2">Make sure your face is well lit for the best caricature!</p>
      </div>
    </div>
  );
};
