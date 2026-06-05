"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, MessageSquare, Send } from 'lucide-react';
import { CustomCursor } from '@/components/ui/cursor';
import { NoiseOverlay } from '@/components/ui/noise';
import { SmoothScroll } from '@/components/ui/smooth-scroll';

type Entry = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      if (Array.isArray(data)) {
        setEntries(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      if (res.ok) {
        setName('');
        setMessage('');
        await fetchEntries();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      <NoiseOverlay />
      
      <div className="min-h-screen bg-black text-white font-body selection:bg-neon selection:text-black overflow-hidden relative">
        <div className="p-6 md:p-12 lg:p-24 max-w-4xl mx-auto space-y-16">
          
          <header className="space-y-4">
            <Link href="/" className="inline-block border-2 border-gray-light px-4 py-2 hover:border-neon hover:text-neon transition-colors font-mono text-sm uppercase">
              ← Return Home
            </Link>
            <div className="flex items-center space-x-4 mt-8">
              <MessageSquare className="text-neon w-8 h-8" />
              <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter">Guestbook</h1>
            </div>
            <p className="font-mono text-gray-400">Leave a permanent mark on the system database.</p>
          </header>

          <main className="space-y-12">
            
            {/* Input Form */}
            <form onSubmit={handleSubmit} className="border-2 border-gray-light bg-gray-dark/50 p-6 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-neon -translate-x-full group-focus-within:translate-x-0 transition-transform duration-500"></div>
              
              <div className="space-y-2">
                <label className="font-mono text-sm text-neon font-bold uppercase">Identity / Handle</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  placeholder="Anonymous" 
                  className="w-full bg-black border-2 border-gray-light p-3 font-mono text-white outline-none focus:border-neon transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-sm text-neon font-bold uppercase">Message</label>
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={100}
                  placeholder="SYS_INITIALIZE_SUCCESS" 
                  className="w-full bg-black border-2 border-gray-light p-3 font-mono text-white outline-none focus:border-neon transition-colors"
                  required
                />
                <div className="text-right text-xs text-gray-500 font-mono">{message.length}/100</div>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="bg-neon text-black font-bold font-mono uppercase px-6 py-3 flex items-center gap-2 hover:bg-white transition-colors disabled:opacity-50"
              >
                {submitting ? 'Transmitting...' : 'Sign Database'} <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Entries List */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 border-b-2 border-gray-light pb-4">
                <Terminal className="text-gray-400 w-5 h-5" />
                <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-gray-400">Recent Logs</h2>
              </div>

              {loading ? (
                <div className="font-mono text-gray-500 animate-pulse">Loading database records...</div>
              ) : (
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <div key={entry.id} className="border-l-4 border-gray-light pl-4 py-2 hover:border-neon transition-colors group">
                      <div className="flex items-baseline space-x-3 mb-1">
                        <span className="font-bold text-white group-hover:text-neon transition-colors">{entry.name}</span>
                        <span className="font-mono text-xs text-gray-600">{new Date(entry.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="font-body text-gray-300">{entry.message}</p>
                    </div>
                  ))}
                  {entries.length === 0 && (
                    <div className="font-mono text-gray-500 border-2 border-dashed border-gray-light p-8 text-center">
                      DATABASE EMPTY. BE THE FIRST.
                    </div>
                  )}
                </div>
              )}
            </div>

          </main>
        </div>
      </div>
    </SmoothScroll>
  );
}
