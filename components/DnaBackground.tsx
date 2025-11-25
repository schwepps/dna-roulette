"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { seededRandom } from "@/lib/utils";
import { PARTICLES, EMOJIS } from "@/lib/constants";

interface ParticleConfig {
  initialX: number;
  initialY: number;
  animateY: number[];
  animateX: number[];
  duration: number;
  emoji: string;
}

export function DnaBackground() {
  // Pre-compute all random values using useMemo to avoid re-renders
  const particles = useMemo<ParticleConfig[]>(() => {
    return Array.from({ length: PARTICLES.DNA_PAIRS }).map((_, i) => ({
      initialX: seededRandom(i * 7) * 100,
      initialY: seededRandom(i * 13) * 100,
      animateY: [
        seededRandom(i * 17) * 100,
        seededRandom(i * 23) * 100,
        seededRandom(i * 29) * 100,
      ],
      animateX: [
        seededRandom(i * 31) * 100,
        seededRandom(i * 37) * 100,
        seededRandom(i * 41) * 100,
      ],
      duration: 20 + seededRandom(i * 47) * 10,
      emoji: EMOJIS.DNA[i % EMOJIS.DNA.length],
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Floating DNA particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-20"
          initial={{
            x: `${particle.initialX}vw`,
            y: `${particle.initialY}vh`,
          }}
          animate={{
            y: particle.animateY.map((v) => `${v}vh`),
            x: particle.animateX.map((v) => `${v}vw`),
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-3xl" />
    </div>
  );
}
