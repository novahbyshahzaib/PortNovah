"use client";
import { motion } from "framer-motion";

export function Marquee() {
  const items = [
    "REACT", "NEXT.JS", "TAILWIND", "TYPESCRIPT", "AI AGENTS", "NODE.JS", "ANDROID", "VIBE CODING", "SYSTEM DESIGN"
  ];

  return (
    <div className="relative w-full overflow-hidden border-y-2 border-gray-light bg-neon py-3 flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {/* Double the array for seamless infinite scroll */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center">
            <span className="text-black font-display font-bold text-2xl md:text-4xl mx-4 uppercase tracking-tighter">
              {item}
            </span>
            <span className="text-black/50 mx-2">{"//"}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
