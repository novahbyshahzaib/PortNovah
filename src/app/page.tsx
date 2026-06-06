import ClientPortfolio from "@/components/ClientPortfolio";
import { extraLinks } from "@/data/links";

const GITHUB_USERNAME = "novahbyshahzaib";
const EXCLUDED_REPOS = [
  "claw-code-novah",
  "Crow-Vault",
  "Kryptonite-",
  "NovahEvolve",
  "SnoahLive",
];

const CUSTOM_DESCRIPTIONS: Record<string, string> = {
  "ConvertAl": "AI-powered universal format converter with rapid processing capabilities.",
  "MathMind": "Advanced mathematical logic engine and problem solver.",
  "MindFlash": "Interactive learning platform utilizing spaced repetition algorithms.",
  "Novah-TaskMaster": "High-performance task orchestration and productivity suite.",
  "NovahClaude": "Sophisticated AI assistant interface bridging Anthropic's Claude models.",
  "sChess": "Real-time multiplayer chess engine with advanced move validation.",
  "Snoah-Agent": "Autonomous AI agent framework for complex reasoning tasks.",
  "SnoahAi-": "Next-generation generative AI platform and chatbot interface.",
  "SnoahTune": "Intelligent audio processing and music recommendation system.",
};

async function getRepos() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=updated`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    console.error("Failed to fetch repos");
    return [];
  }

  const data = await res.json();
  const formattedRepos = data
    .filter((repo: any) => !EXCLUDED_REPOS.includes(repo.name))
    .map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: CUSTOM_DESCRIPTIONS[repo.name] || repo.description || "No description provided.",
      html_url: repo.html_url,
      homepage: repo.homepage, // Vercel / Live links
      language: repo.language,
      stargazers_count: repo.stargazers_count,
    }));

  // Manually add the missing AWP repository
  formattedRepos.push({
    id: 999999999,
    name: "AWP",
    description: "Advanced Web Programming application with sophisticated frontend architecture.",
    html_url: "https://github.com/novahbyshahzaib/AWP",
    homepage: "https://awp-livid.vercel.app",
    language: "TypeScript",
    stargazers_count: 0,
  });

  return formattedRepos;
}

export default async function Home() {
  const repos = await getRepos();

  return <ClientPortfolio repos={repos} extraLinks={extraLinks} />;
}
