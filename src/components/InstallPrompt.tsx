"use client";

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Optional: Add a slight delay before showing the prompt
      setTimeout(() => setShowPrompt(true), 2000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-[9999] bg-black/80 backdrop-blur-md border border-[#0f0] p-4 flex items-center justify-between gap-4 max-w-sm ml-auto animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-[#0f0]/20 flex items-center justify-center shrink-0 border border-[#0f0]/50">
          <Download className="w-5 h-5 text-[#0f0]" />
        </div>
        <div className="flex flex-col">
          <span className="text-[#0f0] font-bold text-sm tracking-widest uppercase">Install App</span>
          <span className="text-zinc-400 text-xs tracking-wider">Install Novah for standalone access.</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleInstallClick}
          className="px-3 py-1 bg-[#0f0] text-black font-bold text-xs tracking-widest hover:bg-[#0f0]/80 transition-colors uppercase"
        >
          Install
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="p-1 text-zinc-500 hover:text-[#0f0] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
