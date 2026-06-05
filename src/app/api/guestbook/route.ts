import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Create table if not exists
async function ensureTableExists() {
  if (!process.env.POSTGRES_URL) return;
  await sql`
    CREATE TABLE IF NOT EXISTS guestbook (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      message VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function GET() {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json([{ id: 1, name: 'SYSTEM', message: 'Database not connected yet.', created_at: new Date().toISOString() }]);
  }

  try {
    await ensureTableExists();
    const { rows } = await sql`SELECT * FROM guestbook ORDER BY created_at DESC LIMIT 50`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch guestbook entries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
  }

  try {
    const { name, message } = await request.json();
    if (!name || !message || name.length > 50 || message.length > 100) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    await ensureTableExists();
    await sql`INSERT INTO guestbook (name, message) VALUES (${name}, ${message})`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save entry' }, { status: 500 });
  }
}
