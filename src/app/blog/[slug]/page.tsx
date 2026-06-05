import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';
import { CustomCursor } from '@/components/ui/cursor';
import { NoiseOverlay } from '@/components/ui/noise';
import { SmoothScroll } from '@/components/ui/smooth-scroll';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Minimalist brutalist components for MDX
const components = {
  h1: (props: any) => <h1 className="font-display text-4xl md:text-5xl font-bold uppercase mt-12 mb-6 tracking-tighter border-b-4 border-gray-light pb-4" {...props} />,
  h2: (props: any) => <h2 className="font-display text-2xl md:text-3xl font-bold uppercase mt-10 mb-4 tracking-tight" {...props} />,
  h3: (props: any) => <h3 className="font-display text-xl font-bold uppercase mt-8 mb-4" {...props} />,
  p: (props: any) => <p className="font-body text-lg leading-relaxed text-gray-300 mb-6" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside font-body text-lg text-gray-300 mb-6 space-y-2 border-l-2 border-neon pl-4" {...props} />,
  li: (props: any) => <li {...props} />,
  a: (props: any) => <a className="text-neon hover:underline underline-offset-4" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-neon bg-gray-light/20 p-6 italic my-8 font-serif text-xl" {...props} />,
  code: (props: any) => <code className="font-mono text-sm bg-gray-light/50 text-neon px-1 py-0.5" {...props} />,
  pre: (props: any) => <pre className="bg-gray-dark border-2 border-gray-light p-6 overflow-x-auto my-8"><code className="font-mono text-sm text-gray-300" {...props} /></pre>,
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <SmoothScroll>
      <CustomCursor />
      <NoiseOverlay />
      
      <div className="min-h-screen bg-black text-white font-body selection:bg-neon selection:text-black overflow-hidden relative">
        <div className="p-6 md:p-12 lg:p-24 max-w-3xl mx-auto space-y-12">
          
          <header className="space-y-8 border-b-2 border-gray-light pb-8">
            <Link href="/blog" className="inline-block border-2 border-gray-light px-4 py-2 hover:border-neon hover:text-neon transition-colors font-mono text-sm uppercase">
              ← Back to Logs
            </Link>
            
            <div className="space-y-4">
              <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">{post.title}</h1>
              <div className="flex items-center space-x-4 font-mono text-sm text-gray-400">
                <span className="border-2 border-gray-light px-2 py-1">TIMESTAMP: {post.date}</span>
                <span className="border-2 border-gray-light px-2 py-1 bg-neon text-black font-bold">AUTHOR: NOVAH</span>
              </div>
            </div>
          </header>

          <article className="pb-24">
            <MDXRemote source={post.content} components={components} />
          </article>

        </div>
      </div>
    </SmoothScroll>
  );
}
