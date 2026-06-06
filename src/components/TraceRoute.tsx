"use client";

import { useEffect, useState } from 'react';

export function TraceRoute() {
  const [ipData, setIpData] = useState<{ ip: string; city: string; country: string } | null>(null);
  const [typedText, setTypedText] = useState("");
  const fullText = ipData 
    ? `> Uplink established.\n> Tracing route...\n> Target identified at IP: ${ipData.ip}\n> Location: ${ipData.city}, ${ipData.country}\n> Connection secure.`
    : "> Establishing uplink...\n> Tracing route...\n> Awaiting response...";

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.ip) {
          setIpData({ ip: data.ip, city: data.city, country: data.country_name });
        }
      })
      .catch(() => {
        // Fallback if adblocker or error
        setIpData({ ip: "UNKNOWN", city: "CLASSIFIED", country: "TERRA" });
      });
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 40); // typing speed
    
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="font-mono text-xs md:text-sm text-[#0f0]/60 whitespace-pre-wrap mt-6 min-h-[100px] border-l-2 border-[#0f0]/30 pl-4 py-2">
      {typedText}
      <span className="animate-pulse">_</span>
    </div>
  );
}
