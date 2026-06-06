"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Terminal, Laptop, BookOpen, MessageSquare, TerminalSquare, User } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    const openMenu = () => setOpen(true);
    
    document.addEventListener("keydown", down);
    document.addEventListener("open-cmdk", openMenu);
    
    return () => {
      document.removeEventListener("keydown", down);
      document.removeEventListener("open-cmdk", openMenu);
    };
  }, []);

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm px-4" 
      onClick={() => setOpen(false)}
    >
      <Command 
        className="w-full max-w-2xl bg-black border-2 border-gray-light shadow-[8px_8px_0px_0px_#2E2E2E] overflow-hidden rounded-none text-white font-mono"
        onClick={(e) => e.stopPropagation()}
        loop
      >
        <div className="flex items-center border-b-2 border-gray-light px-4" cmdk-input-wrapper="">
          <Terminal className="w-5 h-5 text-neon mr-3" />
          <Command.Input 
            placeholder="Type a command or search..." 
            className="w-full bg-transparent border-none py-4 text-lg outline-none placeholder:text-gray-600 font-mono text-white"
            autoFocus
          />
        </div>
        
        <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-none">
          <Command.Empty className="py-6 text-center text-gray-500 font-mono">No results found.</Command.Empty>
          
          <Command.Group heading="Navigation" className="text-xs text-gray-500 font-bold uppercase tracking-wider px-2 py-3">
            <Command.Item 
              onSelect={() => { router.push('/'); setOpen(false); }} 
              className="flex items-center px-4 py-3 text-sm cursor-pointer transition-colors text-white"
            >
              <User className="w-4 h-4 mr-3 text-gray-400" /> Go to Identity
            </Command.Item>
            <Command.Item 
              onSelect={() => { router.push('/'); setTimeout(() => window.scrollTo({top: 800, behavior: 'smooth'}), 100); setOpen(false); }} 
              className="flex items-center px-4 py-3 text-sm cursor-pointer transition-colors text-white"
            >
              <Laptop className="w-4 h-4 mr-3 text-gray-400" /> View Projects
            </Command.Item>
            <Command.Item 
              onSelect={() => { router.push('/blog'); setOpen(false); }} 
              className="flex items-center px-4 py-3 text-sm cursor-pointer transition-colors text-white"
            >
              <BookOpen className="w-4 h-4 mr-3 text-gray-400" /> Read Blog
            </Command.Item>
            <Command.Item 
              onSelect={() => { router.push('/guestbook'); setOpen(false); }} 
              className="flex items-center px-4 py-3 text-sm cursor-pointer transition-colors text-white"
            >
              <MessageSquare className="w-4 h-4 mr-3 text-gray-400" /> Sign Guestbook
            </Command.Item>
          </Command.Group>

          <Command.Group heading="System Commands" className="text-xs text-gray-500 font-bold uppercase tracking-wider px-2 py-3 mt-2 border-t border-gray-light/30">
            <Command.Item 
              onSelect={() => { 
                document.body.classList.toggle('ascii-mode'); 
                setOpen(false); 
              }} 
              className="flex items-center px-4 py-3 text-sm cursor-pointer text-neon transition-colors"
            >
              <TerminalSquare className="w-4 h-4 mr-3 text-neon" /> Toggle ASCII Mode
            </Command.Item>
            <Command.Item
              onSelect={() => {
                window.dispatchEvent(new Event('toggle-matrix'));
                setOpen(false);
              }}
              className="flex items-center px-4 py-3 text-sm cursor-pointer text-neon transition-colors"
            >
              <Terminal className="w-4 h-4 mr-3 text-neon" /> Toggle Matrix Rain
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
