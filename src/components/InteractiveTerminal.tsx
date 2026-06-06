"use client";

import { useState, useRef, useEffect } from 'react';

export function InteractiveTerminal() {
  const [history, setHistory] = useState<{ command: string; output: string }[]>([
    { command: "boot", output: "SYSTEM_INITIALIZED\nWelcome to Novah Terminal v6.0.\nType 'help' for available commands." }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output = "";

    switch (cmd) {
      case "help":
        output = "Available commands:\n  whoami   - Display user info\n  projects - List repositories\n  clear    - Clear terminal\n  sudo     - Request root access\n  matrix   - Enter the matrix";
        break;
      case "whoami":
        output = "User: GUEST_01\nAccess Level: UNRESTRICTED\nLocation: UNKNOWN";
        break;
      case "projects":
        output = "Redirecting to /projects...";
        window.location.hash = "projects";
        break;
      case "sudo":
        output = "Permission denied. This incident will be reported.";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "matrix":
        output = "Executing protocol: DIGITAL_RAIN...\nSystem override initiated.";
        window.dispatchEvent(new Event('toggle-matrix'));
        break;
      default:
        output = `Command not found: ${cmd}`;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="bg-black/80 backdrop-blur-md border border-[#0f0]/30 p-4 md:p-6 rounded-sm w-full font-mono text-sm shadow-[0_0_15px_rgba(0,255,0,0.1)] h-[300px] flex flex-col">
      <div className="flex-1 overflow-y-auto overflow-x-hidden text-[#0f0]/80 pr-2">
        {history.map((line, i) => (
          <div key={i} className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#0f0] font-bold">visitor@novah:~$</span>
              <span className="text-white">{line.command}</span>
            </div>
            <div className="whitespace-pre-wrap text-[#0f0]/70 pl-2 border-l-2 border-[#0f0]/30">
              {line.output}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      
      <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4 pt-2 border-t border-[#0f0]/30">
        <span className="text-[#0f0] font-bold">visitor@novah:~$</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-white w-full caret-[#0f0]"
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
