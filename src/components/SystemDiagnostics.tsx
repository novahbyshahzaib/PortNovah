"use client";

import { useEffect, useState } from "react";

export function SystemDiagnostics() {
  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(45);
  const [net, setNet] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu((prev) => Math.max(2, Math.min(98, prev + (Math.random() * 20 - 10))));
      setRam((prev) => Math.max(30, Math.min(85, prev + (Math.random() * 5 - 2.5))));
      setNet(Math.floor(Math.random() * 500) + 50);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-24 right-4 md:right-8 z-40 bg-black/60 backdrop-blur-sm border border-[#0f0]/30 p-3 font-mono text-[10px] md:text-xs text-[#0f0]/80 hidden lg:block shadow-[0_0_10px_rgba(0,255,0,0.1)]">
      <div className="border-b border-[#0f0]/30 pb-1 mb-2 font-bold tracking-widest uppercase">
        Telemetry
      </div>
      <div className="space-y-2">
        <div>
          <div className="flex justify-between w-32 mb-1">
            <span>CPU</span>
            <span>{cpu.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-[#0f0]/20 h-1.5 rounded-sm overflow-hidden">
            <div className="bg-[#0f0] h-full transition-all duration-1000" style={{ width: `${cpu}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between w-32 mb-1">
            <span>RAM</span>
            <span>{ram.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-[#0f0]/20 h-1.5 rounded-sm overflow-hidden">
            <div className="bg-[#0f0] h-full transition-all duration-1000" style={{ width: `${ram}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between w-32">
            <span>NET I/O</span>
            <span>{net} KB/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
