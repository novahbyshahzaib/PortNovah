"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

export function PhysicsGrid() {
  const constraintsRef = useRef(null);

  const skills = [
    { name: "React", size: "w-24 h-24", bg: "bg-black" },
    { name: "Next.js", size: "w-32 h-32", bg: "bg-gray-dark" },
    { name: "Tailwind", size: "w-28 h-20", bg: "bg-black" },
    { name: "TypeScript", size: "w-36 h-24", bg: "bg-gray-dark" },
    { name: "Node.js", size: "w-24 h-24", bg: "bg-black" },
    { name: "AI Agents", size: "w-40 h-28", bg: "bg-neon border-black text-black" },
    { name: "Android", size: "w-28 h-28", bg: "bg-gray-dark" },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-sm text-gray-400 uppercase">SYS.SKILLS_MATRIX [Interactive]</h3>
        <span className="font-mono text-xs text-neon border border-neon px-2 py-0.5">DRAG ELEMENTS</span>
      </div>
      <motion.div 
        ref={constraintsRef} 
        className="w-full h-[400px] border-2 border-gray-light bg-black/50 relative overflow-hidden"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: "linear-gradient(#2E2E2E 1px, transparent 1px), linear-gradient(90deg, #2E2E2E 1px, transparent 1px)", 
               backgroundSize: "20px 20px" 
             }}>
        </div>

        {skills.map((skill, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
            initial={{ 
              x: Math.random() * 200 + 50, 
              y: Math.random() * 150 + 50,
              rotate: Math.random() * 20 - 10 
            }}
            className={`absolute flex items-center justify-center border-2 border-gray-light shadow-[4px_4px_0px_0px_#2E2E2E] hover:shadow-[4px_4px_0px_0px_#ccff00] hover:border-neon transition-colors duration-200 cursor-grab active:cursor-grabbing ${skill.size} ${skill.bg}`}
          >
            <span className={`font-mono font-bold text-sm md:text-base ${skill.bg.includes('text-black') ? 'text-black' : 'text-white'}`}>
              {skill.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
