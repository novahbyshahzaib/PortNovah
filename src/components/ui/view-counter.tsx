"use client";

import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/views')
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(console.error);
  }, []);

  if (views === null) return null;

  return (
    <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest border border-zinc-800 bg-black px-3 py-1.5 rounded-none">
      <Activity className="w-3 h-3 text-[#0f0] animate-pulse" />
      <span>System_Queries:</span>
      <span className="text-[#0f0] font-bold">{views}</span>
    </div>
  );
}
