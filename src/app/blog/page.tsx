import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { Terminal } from 'lucide-react';
import { CustomCursor } from '@/components/ui/cursor';
import { NoiseOverlay } from '@/components/ui/noise';
import { SmoothScroll } from '@/components/ui/smooth-scroll';
import { CommandMenu } from '@/components/ui/command-menu';

export default function BlogIndex() {
  const posts = getBlogPosts();

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
              <Terminal className="text-neon w-8 h-8" />
              <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter">System Log</h1>
            </div>
            <p className="font-mono text-gray-400">Thoughts on code, crypto, AI, and architecture.</p>
          </header>

          <main className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="group border-2 border-gray-light p-6 hover:border-neon hover:shadow-[8px_8px_0px_0px_#ccff00] transition-all bg-black relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-neon -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <Link href={`/blog/${post.slug}`} className="block space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="font-display text-2xl md:text-3xl font-bold uppercase group-hover:text-neon transition-colors">{post.title}</h2>
                    <span className="font-mono text-xs text-gray-500 border border-gray-light px-2 py-1">{post.date}</span>
                  </div>
                  <p className="font-body text-gray-400">{post.description}</p>
                  <div className="font-mono text-sm text-neon flex items-center">
                    Read file <span className="ml-2">→</span>
                  </div>
                </Link>
              </article>
            ))}
            
            {posts.length === 0 && (
              <div className="font-mono text-gray-500 border-2 border-dashed border-gray-light p-12 text-center">
                NO LOGS FOUND.
              </div>
            )}
          </main>

        </div>
      </div>
    </SmoothScroll>
  );
}
