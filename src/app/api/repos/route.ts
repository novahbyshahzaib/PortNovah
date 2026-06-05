import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'novahbyshahzaib';

// List of repos to exclude from the portfolio
const EXCLUDED_REPOS = [
  'claw-code-novah',
  'Crow-Vault',
  'Kryptonite-',
  'NovahEvolve',
  'SnoahLive',
];

export async function GET() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=updated`, {
      next: { revalidate: 3600 }, // Cache for 1 hour to save Vercel usage
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch repos: ${res.statusText}`);
    }

    const data = await res.json();

    const filteredRepos = data.filter(
      (repo: any) => !EXCLUDED_REPOS.includes(repo.name)
    ).map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description provided.',
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      topics: repo.topics,
      updated_at: repo.updated_at,
    }));

    return NextResponse.json(filteredRepos);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
  }
}
