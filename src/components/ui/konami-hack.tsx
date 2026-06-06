"use client";

import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

export function KonamiHack() {
  const [hacked, setHacked] = useState(false);

  useEffect(() => {
    let inputSequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      // Add key to sequence
      inputSequence.push(e.key);
      
      // Keep only the last N keys
      if (inputSequence.length > KONAMI_CODE.length) {
        inputSequence.shift();
      }

      // Check match
      if (inputSequence.join('').toLowerCase() === KONAMI_CODE.join('').toLowerCase()) {
        setHacked(true);
        document.body.classList.add('hack-mode');
        // Play an alarm or show glitch if we wanted to
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!hacked) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none mix-blend-color-burn animate-pulse" style={{ backgroundColor: 'rgba(255, 0, 0, 0.4)' }}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-red-500 font-mono">
        <h1 className="text-6xl md:text-9xl font-bold tracking-widest uppercase glitch-text" data-text="SYSTEM COMPROMISED">
          SYSTEM COMPROMISED
        </h1>
        <p className="mt-4 text-xl tracking-widest bg-red-900/50 inline-block px-4 py-2 border border-red-500 animate-bounce">
          UNAUTHORIZED ROOT ACCESS DETECTED
        </p>
      </div>
      {/* Glitch overlay styling injected globally */}
      <style>{`
        .hack-mode {
          filter: contrast(150%) saturate(200%) hue-rotate(-90deg);
          animation: crt-shake 0.1s infinite;
        }
        @keyframes crt-shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .glitch-text {
          position: relative;
        }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 red;
          animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 blue;
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
      `}</style>
    </div>
  );
}
