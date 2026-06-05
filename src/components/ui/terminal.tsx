"use client";
import { useEffect, useState } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

export function Terminal() {
  const [text, setText] = useState("");
  const fullText = `> INITIALIZING SYSTEM...
> LOADING NOVAH_CORE_v2.0...
> MODULES LOADED: [FRONTEND, BACKEND, AI, MOBILE]
> CONNECTION ESTABLISHED.
> READY FOR INPUT_`;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black border-2 border-gray-light p-6 font-mono text-sm md:text-base text-neon shadow-[4px_4px_0px_0px_#2E2E2E] relative h-48 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-8 border-b-2 border-gray-light flex items-center px-4 bg-gray-dark justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-light"></div>
          <div className="w-3 h-3 rounded-full bg-gray-light"></div>
          <div className="w-3 h-3 rounded-full bg-gray-light"></div>
        </div>
        <span className="text-gray-400 text-xs flex items-center gap-2"><TerminalIcon className="w-3 h-3"/> bash</span>
      </div>
      <div className="mt-8 whitespace-pre-wrap">
        {text}
        <span className="animate-pulse inline-block w-2 h-4 bg-neon ml-1 align-middle"></span>
      </div>
    </div>
  );
}
