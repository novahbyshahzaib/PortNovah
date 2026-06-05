"use client";
import { useEffect, useState } from "react";
import { Activity, Clock } from "lucide-react";

export function LiveData() {
  const [time, setTime] = useState("");
  const [load, setLoad] = useState(42);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }) + ":" + now.getMilliseconds().toString().padStart(3, '0'));
    };
    
    const intervalId = setInterval(updateTime, 50);
    
    // Simulate fluctuating load
    const loadInterval = setInterval(() => {
      setLoad(prev => {
        const fluctuation = Math.floor(Math.random() * 15) - 7;
        return Math.max(10, Math.min(98, prev + fluctuation));
      });
    }, 2000);

    return () => {
      clearInterval(intervalId);
      clearInterval(loadInterval);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="flex-1 border-2 border-gray-light bg-black p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="font-mono text-sm text-gray-400 uppercase">SYS.TIME</span>
        </div>
        <span className="font-mono text-lg font-bold text-white w-32 text-right">{time}</span>
      </div>
      
      <div className="flex-1 border-2 border-gray-light bg-black p-4 flex flex-col justify-center gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-gray-400" />
            <span className="font-mono text-sm text-gray-400 uppercase">SYS.LOAD</span>
          </div>
          <span className="font-mono text-sm text-neon">{load}%</span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-dark overflow-hidden">
          <div 
            className="h-full bg-neon transition-all duration-1000 ease-out"
            style={{ width: `${load}%` }}
          />
        </div>
      </div>
    </div>
  );
}
