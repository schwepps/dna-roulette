"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Species } from "@/lib/types";
import { ShareButtons } from "./ShareButtons";

interface ResultCardProps {
  species: Species;
  onPlayAgain: () => void;
}

// Seeded pseudo-random for consistent confetti positions
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

const CONFETTI_EMOJIS = ["🎉", "✨", "🧬", "🎊", "💫"];

interface ConfettiConfig {
  x: number;
  y: number;
  rotate: number;
  emoji: string;
}

export function ResultCard({ species, onPlayAgain }: ResultCardProps) {
  // Pre-compute confetti positions
  const confetti = useMemo<ConfettiConfig[]>(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      x: (seededRandom(i * 7) - 0.5) * 300,
      y: (seededRandom(i * 13) - 0.5) * 300,
      rotate: seededRandom(i * 17) * 360,
      emoji: CONFETTI_EMOJIS[i % 5],
    }));
  }, []);

  return (
    <motion.div
      className="glass rounded-3xl p-8 max-w-md w-full mx-4 text-center"
      initial={{ scale: 0, rotate: -10, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
    >
      {/* Confetti burst effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        {confetti.map((particle, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            style={{
              left: "50%",
              top: "50%",
            }}
            initial={{ x: 0, y: 0, scale: 0 }}
            animate={{
              x: particle.x,
              y: particle.y,
              scale: [0, 1, 0],
              rotate: particle.rotate,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          >
            {particle.emoji}
          </motion.span>
        ))}
      </motion.div>

      {/* Species emoji */}
      <motion.div
        className="text-8xl mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {species.emoji}
      </motion.div>

      {/* Result text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-secondary-400 text-sm uppercase tracking-wider mb-2">
          Tu es
        </p>
        <h2 className="text-3xl font-bold text-gradient mb-1">
          {species.percentage}% {species.name}
        </h2>
        <p className="text-foreground/50 text-sm italic mb-4">
          {species.scientificName}
        </p>
        <p className="text-foreground/80 text-lg mb-6">
          {species.funFact}
        </p>
      </motion.div>

      {/* Share buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <ShareButtons species={species} />
      </motion.div>

      {/* Play again button */}
      <motion.button
        onClick={onPlayAgain}
        className="px-8 py-3 rounded-xl bg-surface-light hover:bg-surface-light/80
                   text-foreground font-medium transition-colors cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        🔄 Rejouer
      </motion.button>
    </motion.div>
  );
}
