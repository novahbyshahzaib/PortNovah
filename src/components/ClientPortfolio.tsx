"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GitBranch, ExternalLink, Star, Code, Cpu, Terminal as TerminalIcon, Layers } from "lucide-react";
import { CustomCursor } from "./ui/cursor";
import { NoiseOverlay } from "./ui/noise";
import { SmoothScroll } from "./ui/smooth-scroll";
import { Magnetic } from "./ui/magnetic";
import { Marquee } from "./ui/marquee";
import { Terminal } from "./ui/terminal";
import { LiveData } from "./ui/live-data";
import { PhysicsGrid } from "./ui/physics-grid";
import { WebGLBackground } from "./ui/webgl-background";
import ViewCounter from "./ui/view-counter";

type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string;
  stargazers_count: number;
};

type ExtraLink = {
  title: string;
  url: string;
  description: string;
};

export default function ClientPortfolio({
  repos,
  extraLinks,
}: {
  repos: Repo[];
  extraLinks: ExtraLink[];
}) {
  const [activeTab, setActiveTab] = useState<"ABOUT" | "PROJECTS">("ABOUT");
  
  // Parallax calculations (extended for longer scroll)
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <SmoothScroll>
      <CustomCursor />
      <NoiseOverlay />
      
      <div className="min-h-screen bg-black text-white font-body selection:bg-neon selection:text-black overflow-hidden relative">
        {/* Background Parallax Grid */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: "linear-gradient(#2E2E2E 1px, transparent 1px), linear-gradient(90deg, #2E2E2E 1px, transparent 1px)", 
               backgroundSize: "40px 40px" 
             }}>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] lg:grid-cols-[100px_1fr] min-h-screen relative z-10">
          
          {/* Rail / Sidebar */}
          <aside className="border-b-4 md:border-b-0 md:border-r-4 border-gray-light bg-black/80 backdrop-blur-md flex flex-col items-center py-6 sticky top-0 z-50 h-auto md:h-screen">
            <Magnetic>
              <div className="font-display font-bold text-2xl tracking-tighter md:-rotate-90 md:origin-center whitespace-nowrap md:mt-24 cursor-pointer hover:text-neon transition-colors">
                NOVAH SYSTEM
              </div>
            </Magnetic>
          </aside>

          {/* Main Content Area */}
          <main className="p-6 md:p-12 lg:p-24 max-w-[1440px]">
            
            {/* HERO SECTION with Extended Parallax */}
            <div className="h-[150vh] relative w-full">
              <WebGLBackground />
              <motion.section 
                style={{ y: yHero, opacity: opacityHero, scale: scaleHero }}
                className="space-y-6 pt-24 sticky top-24"
              >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block border-2 border-neon px-3 py-1 mb-4 bg-neon/10 backdrop-blur-sm"
              >
                <span className="font-mono text-neon text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon"></div>
                  STATUS: ONLINE
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-5xl md:text-8xl lg:text-9xl font-bold uppercase leading-none tracking-tighter"
              >
                NOVAH <br />
                <span className="text-transparent stroke-white" style={{ WebkitTextStroke: "2px #2E2E2E" }}>SYSTEM_</span><br />
                DEVELOPER
              </motion.h1>
              </motion.section>
            </div>

            {/* INTERACTIVE EXPANSION SECTION */}
            <motion.div style={{ y: yContent }} className="space-y-12 mb-24">
              <Marquee />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Terminal />
                <LiveData />
              </div>

              <PhysicsGrid />
            </motion.div>

            {/* TAB NAVIGATION */}
            <motion.div 
              style={{ y: yContent }}
              className="sticky top-0 md:top-6 z-40 bg-black/90 backdrop-blur-md border-y-2 md:border-2 border-gray-light py-2 px-4 mb-16 flex gap-4 w-full md:w-max"
            >
              <button 
                onClick={() => setActiveTab("ABOUT")}
                className={`font-mono text-sm md:text-base font-bold uppercase px-6 py-3 transition-colors ${activeTab === "ABOUT" ? "bg-neon text-black" : "text-gray-400 hover:text-white"}`}
              >
                SYS.ABOUT
              </button>
              <button 
                onClick={() => setActiveTab("PROJECTS")}
                className={`font-mono text-sm md:text-base font-bold uppercase px-6 py-3 transition-colors ${activeTab === "PROJECTS" ? "bg-neon text-black" : "text-gray-400 hover:text-white"}`}
              >
                SYS.PROJECTS
              </button>
            </motion.div>

            {/* TAB CONTENT: ABOUT */}
            {activeTab === "ABOUT" && (
              <motion.section 
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ y: yContent }}
                className="max-w-4xl space-y-8"
              >
                <div className="flex items-center space-x-4 mb-8">
                  <TerminalIcon className="text-neon w-8 h-8" />
                  <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">Identity</h2>
                  <div className="h-0.5 flex-1 bg-gray-light"></div>
                </div>

                <div className="border-l-4 border-neon pl-6 md:pl-10 space-y-6">
                  <p className="font-body text-xl md:text-3xl leading-relaxed text-gray-300">
                    Hey, I'm <span className="text-white font-bold">Shahzaib Muzaffar</span>, a full-stack web developer, vibe coder, web designer and full stack web app and android app developer.
                  </p>
                  <p className="font-body text-lg md:text-2xl leading-relaxed text-gray-400">
                    I specialize in building sleek applications using <span className="text-white border-b border-gray-light pb-1">React and Tailwind CSS</span> also with full stack capabilities for advanced backend apps.
                  </p>
                  <p className="font-mono text-sm md:text-base text-neon p-4 border-2 border-gray-light bg-neon/5 inline-block">
                    Beyond code and academics, I'm passionate about AI, crypto, code and a good game of chess.
                  </p>
                </div>
              </motion.section>
            )}

            {/* TAB CONTENT: PROJECTS */}
            {activeTab === "PROJECTS" && (
              <motion.div 
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ y: yContent }}
                className="space-y-24"
              >
                {/* MODULES / EXTRA LINKS SECTION */}
                <section className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <Layers className="text-neon w-8 h-8" />
                    <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">Modules</h2>
                    <div className="h-0.5 flex-1 bg-gray-light"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {extraLinks.map((link, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Magnetic>
                          <a 
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-black border-2 border-gray-light hover:border-neon hover:shadow-[8px_8px_0px_0px_#ccff00] transition-all duration-300 relative overflow-hidden h-full"
                          >
                            <div className="h-10 border-b-2 border-gray-light flex justify-between items-center px-4 group-hover:bg-neon group-hover:border-neon transition-colors duration-300">
                              <span className="font-mono text-gray-400 group-hover:text-black font-bold text-sm transition-colors">SYS.0{idx + 1}</span>
                              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                            </div>
                            <div className="p-6">
                              <h3 className="font-display text-2xl font-bold uppercase mb-2 group-hover:text-neon transition-colors duration-300">{link.title}</h3>
                              <p className="font-mono text-sm text-gray-400">{link.description}</p>
                            </div>
                          </a>
                        </Magnetic>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* GITHUB REPOSITORIES SECTION */}
                <section className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <Cpu className="text-neon w-8 h-8" />
                    <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">Repositories</h2>
                    <div className="h-0.5 flex-1 bg-gray-light"></div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {repos.map((repo, idx) => (
                      <motion.div
                        key={repo.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (idx % 4) * 0.1 }}
                      >
                        <div className="group block bg-black border-2 border-gray-light shadow-[4px_4px_0px_0px_#2E2E2E] hover:shadow-[4px_4px_0px_0px_#ccff00] hover:border-neon transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                          {/* Animated line on hover */}
                          <div className="absolute top-0 left-0 w-full h-1 bg-neon -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                          
                          <div className="p-6 space-y-4 flex-1 flex flex-col">
                            <div className="flex justify-between items-start">
                              <h3 className="font-mono text-xl font-bold text-white group-hover:text-neon transition-colors duration-300 flex items-center gap-2">
                                <GitBranch className="w-5 h-5" />
                                {repo.name}
                              </h3>
                              <div className="flex space-x-3 font-mono text-xs text-gray-400">
                                {repo.language && (
                                  <span className="border border-gray-light px-2 py-1 flex items-center gap-1">
                                    <Code className="w-3 h-3" />
                                    {repo.language}
                                  </span>
                                )}
                                <span className="border border-gray-light px-2 py-1 flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                  {repo.stargazers_count}
                                </span>
                              </div>
                            </div>
                            <p className="font-body text-gray-400 flex-1">
                              {repo.description}
                            </p>
                            
                            {/* Actions / Links */}
                            <div className="pt-4 border-t border-gray-light/50 flex gap-4">
                              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                                <GitBranch className="w-4 h-4" /> Source
                              </a>
                              {repo.homepage && (
                                <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-neon hover:text-white flex items-center gap-2 transition-colors">
                                  <ExternalLink className="w-4 h-4" /> Live Preview
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {/* FOOTER */}
            <motion.footer 
              style={{ y: yContent }}
              className="mt-24 pt-8 border-t-2 border-gray-light flex flex-col md:flex-row justify-between items-start md:items-center relative z-20"
            >
              <div className="font-display text-4xl font-bold tracking-tighter mb-4 md:mb-0 text-white/20">
                NOVAH
              </div>
              <div className="flex items-center gap-4">
                <ViewCounter />
                <div className="font-mono text-sm text-gray-500 text-right">
                  © {new Date().getFullYear()} ALL RIGHTS RESERVED.<br/>
                  SYSTEM_VERSION: 2.0.0
                </div>
              </div>
            </motion.footer>

          </main>
        </div>
        
        {/* Floating Action Button for CMDK (Mobile & Desktop) */}
        <button 
          onClick={() => document.dispatchEvent(new Event("open-cmdk"))}
          className="fixed bottom-6 right-6 z-[60] bg-neon text-black px-4 py-3 font-mono font-bold uppercase flex items-center gap-2 hover:bg-white transition-colors border-2 border-black shadow-[4px_4px_0px_0px_#2E2E2E]"
        >
          <TerminalIcon className="w-5 h-5" />
          <span className="hidden md:inline">CMD + K</span>
          <span className="md:hidden">MENU</span>
        </button>
      </div>
    </SmoothScroll>
  );
}
