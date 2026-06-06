"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, Save, AlertCircle } from 'lucide-react';
import { CustomCursor } from '@/components/ui/cursor';
import { NoiseOverlay } from '@/components/ui/noise';
import Link from 'next/link';

export default function CreateBlog() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, content, secret }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to publish');
      
      router.push(`/blog/${slug}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-[#0f0] font-mono selection:bg-[#0f0] selection:text-black overflow-hidden relative">
      <NoiseOverlay />
      <CustomCursor />
      
      <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        <Link href="/blog" className="inline-flex items-center gap-2 mb-8 text-zinc-500 hover:text-[#0f0] transition-colors uppercase tracking-widest text-sm">
          &lt; Back to Feed
        </Link>

        <div className="flex items-center gap-4 mb-12 border-b border-[#0f0]/20 pb-8">
          <Terminal className="w-10 h-10" />
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            Initialize_Post
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 border border-red-500 bg-red-500/10 text-red-500 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm tracking-wider uppercase">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm uppercase tracking-widest text-zinc-400">Post Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={handleTitleChange}
              className="w-full bg-black border border-[#0f0]/30 text-[#0f0] px-4 py-3 focus:outline-none focus:border-[#0f0] transition-colors placeholder:text-zinc-700"
              placeholder="e.g. The Future of Edge Computing"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-zinc-400">URL Slug</label>
              <input 
                type="text" 
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-black border border-[#0f0]/30 text-[#0f0] px-4 py-3 focus:outline-none focus:border-[#0f0] transition-colors placeholder:text-zinc-700"
                placeholder="the-future-of-edge"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-zinc-400">Dev Secret (Optional)</label>
              <input 
                type="password" 
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full bg-black border border-[#0f0]/30 text-[#0f0] px-4 py-3 focus:outline-none focus:border-[#0f0] transition-colors placeholder:text-zinc-700"
                placeholder="DEV_NOVAH_2026 for pinned dev post"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm uppercase tracking-widest text-zinc-400">Markdown Content</label>
            <textarea 
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-96 bg-black border border-[#0f0]/30 text-[#0f0] p-4 focus:outline-none focus:border-[#0f0] transition-colors font-mono resize-y placeholder:text-zinc-700"
              placeholder="# Heading 1&#10;Write your post content using standard markdown syntax..."
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-4 bg-[#0f0] text-black font-bold uppercase tracking-widest hover:bg-[#0f0]/80 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Transmit Data'}
            <Save className="w-5 h-5" />
          </button>
        </form>
      </div>
    </main>
  );
}
