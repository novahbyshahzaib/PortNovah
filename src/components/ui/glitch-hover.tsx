"use client";

import { ReactNode } from "react";

export function GlitchHover({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`group relative ${className}`}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none z-10">
        <div className="absolute inset-0 bg-[#0f0]/10 mix-blend-color-burn" />
        <div 
          className="absolute inset-0 border border-[#0f0] animate-pulse" 
          style={{ transform: 'translate(2px, -2px)', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }} 
        />
        <div 
          className="absolute inset-0 border border-red-500/50" 
          style={{ transform: 'translate(-2px, 2px)', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }} 
        />
      </div>
      <div className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-200">
        {children}
      </div>
    </div>
  );
}
