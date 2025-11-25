"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface DnaButtonProps {
  onClick: () => void;
  isSpinning: boolean;
}

export function DnaButton({ onClick, isSpinning }: DnaButtonProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.button
      onClick={onClick}
      disabled={isSpinning}
      aria-label={isSpinning ? "Analyse ADN en cours" : "Lancer l'analyse ADN"}
      aria-busy={isSpinning}
      className={`
        relative px-12 py-6 rounded-2xl text-xl font-bold
        bg-linear-to-r from-primary-500 via-secondary-500 to-accent-500
        text-white cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-70
        ${!isSpinning && !prefersReducedMotion ? "animate-pulse-glow" : ""}
      `}
      whileHover={!isSpinning && !prefersReducedMotion ? { scale: 1.05 } : {}}
      whileTap={!isSpinning ? { scale: 0.95 } : {}}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      {/* Animated border */}
      <span className="absolute inset-0 rounded-2xl bg-linear-to-r from-primary-400 via-secondary-400 to-accent-400 opacity-0 hover:opacity-100 transition-opacity blur-sm -z-10" />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-3">
        {isSpinning ? (
          <>
            <motion.span
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 1, repeat: Infinity, ease: "linear" }
              }
            >
              🧬
            </motion.span>
            Analyse ADN...
          </>
        ) : (
          <>
            <span>🎰</span>
            Fais tourner la roulette ADN
          </>
        )}
      </span>
    </motion.button>
  );
}
