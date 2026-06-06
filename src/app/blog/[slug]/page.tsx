import { sql } from '@vercel/postgres';
import Link from 'next/link';
import { Terminal, Calendar, ShieldAlert } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CustomCursor } from '@/components/ui/cursor';
import { NoiseOverlay } from '@/components/ui/noise';

export const revalidate = 0; // Dynamic DB fetch

async function getBlogBySlug(slug: string) {
  if (!process.env.POSTGRES_URL) return null;
  try {
    const { rows } = await sql`SELECT * FROM blogs WHERE slug = ${slug} LIMIT 1`;
    return rows[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-black text-[#0f0] font-mono flex items-center justify-center p-6">
        <NoiseOverlay />
        <CustomCursor />
        <div className="text-center space-y-6 relative z-10">
          <Terminal className="w-16 h-16 mx-auto opacity-50" />
          <h1 className="text-4xl font-bold uppercase tracking-widest">404_NOT_FOUND</h1>
          <p className="text-zinc-500 uppercase tracking-widest">Signal lost. The data block you requested does not exist.</p>
          <Link href="/blog" className="inline-block mt-8 border border-[#0f0] px-6 py-3 hover:bg-[#0f0] hover:text-black transition-colors uppercase tracking-widest">
            Return to Feed
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-[#0f0] font-mono selection:bg-[#0f0] selection:text-black overflow-hidden relative">
      <NoiseOverlay />
      <CustomCursor />
      
      <div className="max-w-3xl mx-auto px-6 py-24 relative z-10">
        <Link href="/blog" className="inline-flex items-center gap-2 mb-12 text-zinc-500 hover:text-[#0f0] transition-colors uppercase tracking-widest text-sm">
          &lt; Back_to_Feed
        </Link>

        <article>
          <header className="mb-12 space-y-6 border-b border-[#0f0]/20 pb-12">
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-zinc-500 tracking-widest uppercase">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              {post.is_dev && (
                <span className="flex items-center gap-2 text-black bg-[#0f0] px-3 py-1 font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  VERIFIED_DEV
                </span>
              )}
            </div>
          </header>

          <div className="prose prose-invert prose-green max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-[#0f0]/20 prose-a:text-[#0f0] prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
}
