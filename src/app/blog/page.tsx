import { sql } from '@vercel/postgres';
import Link from 'next/link';
import { Terminal, Calendar, PlusSquare, ShieldAlert } from 'lucide-react';
import { CustomCursor } from '@/components/ui/cursor';
import { NoiseOverlay } from '@/components/ui/noise';

export const revalidate = 0; // Disable static caching for dynamic DB

async function getBlogs() {
  if (!process.env.POSTGRES_URL) {
    return [];
  }
  try {
    const { rows } = await sql`
      SELECT id, title, slug, is_dev, created_at 
      FROM blogs 
      ORDER BY is_dev DESC, created_at DESC 
      LIMIT 100
    `;
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function BlogFeed() {
  const posts = await getBlogs();

  return (
    <main className="min-h-screen bg-black text-[#0f0] font-mono selection:bg-[#0f0] selection:text-black overflow-hidden relative">
      <NoiseOverlay />
      <CustomCursor />
      
      <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-zinc-500 hover:text-[#0f0] transition-colors uppercase tracking-widest text-sm">
          &lt; Return_to_Root
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#0f0]/20 pb-8">
          <div className="flex items-center gap-4">
            <Terminal className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
              Dev_Log
            </h1>
          </div>
          <Link 
            href="/blog/create"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#0f0]/50 hover:bg-[#0f0]/10 transition-colors uppercase tracking-widest text-sm"
          >
            <PlusSquare className="w-4 h-4" />
            Initialize Post
          </Link>
        </div>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="p-8 border border-zinc-800 bg-zinc-900/50 text-center">
              <p className="text-zinc-500 uppercase tracking-widest">No signals detected in database.</p>
            </div>
          ) : (
            posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group block p-6 border border-[#0f0]/20 hover:border-[#0f0] bg-black hover:bg-[#0f0]/5 transition-all duration-300"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 text-xs text-zinc-500 tracking-widest uppercase">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    {post.is_dev && (
                      <span className="flex items-center gap-1 text-black bg-[#0f0] px-2 py-0.5 font-bold">
                        <ShieldAlert className="w-3 h-3" />
                        VERIFIED_DEV
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight group-hover:text-white transition-colors">
                    {post.title}
                  </h2>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
