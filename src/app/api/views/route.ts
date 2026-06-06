import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 0;

async function ensureTableExists() {
  if (!process.env.POSTGRES_URL) return;
  await sql`
    CREATE TABLE IF NOT EXISTS site_stats (
      id SERIAL PRIMARY KEY,
      views INT DEFAULT 0
    );
  `;
  
  // Ensure at least one row exists
  const { rowCount } = await sql`SELECT * FROM site_stats LIMIT 1`;
  if (rowCount === 0) {
    await sql`INSERT INTO site_stats (views) VALUES (0)`;
  }
}

export async function GET() {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ views: 0 });
  }

  try {
    await ensureTableExists();
    // Increment view
    await sql`UPDATE site_stats SET views = views + 1 WHERE id = 1`;
    // Fetch new view count
    const { rows } = await sql`SELECT views FROM site_stats WHERE id = 1`;
    
    return NextResponse.json({ views: rows[0].views });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}
