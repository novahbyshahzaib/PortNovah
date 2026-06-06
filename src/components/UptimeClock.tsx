"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function UptimeClock() {
  const [time, setTime] = useState("");
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    // Check if we have a stored start time
    const start = localStorage.getItem('novah_uptime_start');
    const startTime = start ? parseInt(start, 10) : Date.now();
    if (!start) {
      localStorage.setItem('novah_uptime_start', startTime.toString());
    }

    const interval = setInterval(() => {
      // Local time
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      
      // Uptime
      const diff = Math.floor((Date.now() - startTime) / 1000);
      setUptime(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  if (!time) return null;

  return (
    <div className="flex items-center gap-4 font-mono text-xs text-gray-400 uppercase tracking-widest border border-gray-light bg-black px-4 py-2">
      <div className="flex items-center gap-2">
        <Clock className="w-3 h-3 text-neon" />
        <span>LOCAL: {time}</span>
      </div>
      <div className="w-px h-3 bg-gray-600"></div>
      <div className="flex items-center gap-2">
        <span className="text-neon animate-pulse">●</span>
        <span>UPTIME: {formatUptime(uptime)}</span>
      </div>
    </div>
  );
}
