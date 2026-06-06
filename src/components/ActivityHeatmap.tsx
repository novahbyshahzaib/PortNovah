"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

export function ActivityHeatmap() {
  const [grid, setGrid] = useState<number[]>([]);

  useEffect(() => {
    // Generate a fake but realistic-looking heatmap activity grid for 52 weeks * 7 days
    const newGrid = Array.from({ length: 364 }, () => {
      // Heavily weighted towards 0 to make it realistic
      const rand = Math.random();
      if (rand > 0.8) return Math.floor(Math.random() * 4) + 1; // 1-4 commits
      return 0; // 0 commits
    });
    setGrid(newGrid);
  }, []);

  const getColor = (level: number) => {
    switch(level) {
      case 0: return 'bg-[#111]';
      case 1: return 'bg-[#0f0]/30';
      case 2: return 'bg-[#0f0]/60';
      case 3: return 'bg-[#0f0]/80';
      case 4: return 'bg-[#0f0]';
      default: return 'bg-[#111]';
    }
  };

  if (grid.length === 0) return null;

  return (
    <div className="mt-16 w-full max-w-4xl border border-gray-light bg-black/50 p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-neon" />
        <h3 className="font-mono text-sm text-white uppercase font-bold tracking-widest">System Activity Protocol</h3>
      </div>
      
      {/* Scrollable grid on mobile */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex flex-col gap-1 min-w-max" style={{ height: 'calc(7 * 12px + 6 * 4px)' }}>
          {Array.from({ length: 7 }).map((_, day) => (
            <div key={day} className="flex gap-1">
              {Array.from({ length: 52 }).map((_, week) => {
                const index = week * 7 + day;
                const level = grid[index];
                return (
                  <div 
                    key={week}
                    className={`w-3 h-3 rounded-[1px] transition-colors duration-300 hover:bg-white cursor-crosshair ${getColor(level)}`}
                    title={`Activity Level: ${level}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-gray-500 uppercase">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-[#111]" />
          <div className="w-3 h-3 bg-[#0f0]/30" />
          <div className="w-3 h-3 bg-[#0f0]/60" />
          <div className="w-3 h-3 bg-[#0f0]/80" />
          <div className="w-3 h-3 bg-[#0f0]" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
