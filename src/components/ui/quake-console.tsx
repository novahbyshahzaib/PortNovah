"use client";

import { useEffect, useRef, useState } from 'react';
import { Terminal } from 'lucide-react';

const FAKE_LOGS = [
  "Mounting core systems...",
  "Loading neural network weights: [OK]",
  "Establishing secure uplink via proxy node 0x4A9B...",
  "[WARN] High memory usage detected in Sector 7",
  "Bypassing firewall protocols...",
  "Injecting payload 0x8891...",
  "Syncing distributed ledgers: [DONE]",
  "Fetching remote telemetry data...",
  "Compiling WebGL shaders...",
  "[ERROR] Unrecognized signature from host.",
  "Retrying handshake...",
  "Handshake successful. Encrypted tunnel established."
];

export function QuakeConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    let idx = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLogs = [...prev, `[${new Date().toISOString().split('T')[1]}] ${FAKE_LOGS[idx % FAKE_LOGS.length]}`];
        if (newLogs.length > 50) newLogs.shift();
        return newLogs;
      });
      idx++;
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[50vh] bg-black/90 backdrop-blur-md border-b-2 border-[#0f0] z-[100] shadow-[0_0_30px_rgba(0,255,0,0.2)] font-mono text-xs md:text-sm animate-in slide-in-from-top duration-300">
      <div className="flex items-center justify-between bg-[#0f0] text-black px-4 py-1 font-bold">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          <span>DEV_CONSOLE v2.0.4</span>
        </div>
        <span>[PRESS ~ TO CLOSE]</span>
      </div>
      <div className="p-4 h-[calc(50vh-32px)] overflow-y-auto text-[#0f0]">
        <div className="mb-4 opacity-50">
          <p>Novah System Console. Type 'help' for a list of commands.</p>
          <p>WARNING: Unauthorized access will be logged.</p>
        </div>
        {logs.map((log, i) => (
          <div key={i} className="mb-1 leading-tight">
            {log}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#0f0] animate-pulse">root@novah:~#</span>
          <input 
            type="text" 
            autoFocus 
            className="bg-transparent border-none outline-none text-white w-full caret-[#0f0]"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
