import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Create table if not exists
async function ensureTableExists() {
  if (!process.env.POSTGRES_URL) return;
  await sql`
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      content TEXT NOT NULL,
      is_dev BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function GET() {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json([
      { 
        id: 1, 
        title: 'Database not connected', 
        slug: 'db-not-connected', 
        content: 'Please connect a Postgres database to see blogs.', 
        is_dev: true,
        created_at: new Date().toISOString() 
      }
    ]);
  }

  try {
    await ensureTableExists();
    // Fetch blogs, order by is_dev first, then created_at
    const { rows } = await sql`
      SELECT id, title, slug, is_dev, created_at 
      FROM blogs 
      ORDER BY is_dev DESC, created_at DESC 
      LIMIT 100
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
  }

  try {
    const { title, slug, content, secret } = await request.json();
    
    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Rate limits (basic content length validation)
    if (title.length > 200 || content.length > 50000) {
      return NextResponse.json({ error: 'Content too long' }, { status: 400 });
    }

    // Dev secret check
    const is_dev = secret === 'DEV_NOVAH_2026';

    await ensureTableExists();
    
    // Insert, handle slug conflicts
    await sql`
      INSERT INTO blogs (title, slug, content, is_dev) 
      VALUES (${title}, ${slug}, ${content}, ${is_dev})
      ON CONFLICT (slug) DO UPDATE 
      SET title = EXCLUDED.title, content = EXCLUDED.content, is_dev = EXCLUDED.is_dev
    `;
    
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save blog' }, { status: 500 });
  }
}
