
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white selection:bg-red-600 selection:text-white">
      <header className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 p-4 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div>
              <h1 className="text-2xl font-comic tracking-wider text-red-500">PHARAOH'S <span className="text-white">PITCH</span></h1>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold -mt-1">National Team Caricatures</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-full border border-zinc-700">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-zinc-300">Live AI Studio</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 relative">
        {children}
      </main>

      <footer className="p-8 bg-zinc-900/50 border-t border-zinc-800 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">Powered by Gemini AI • Egypt National Team Fan App</p>
        </div>
      </footer>
    </div>
  );
};
