"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DnaBackground } from "@/components/DnaBackground";
import { DnaButton } from "@/components/DnaButton";
import { ResultCard } from "@/components/ResultCard";
import { getRandomSpecies } from "@/lib/utils";
import { Species, SpeciesDatabase } from "@/lib/types";
import speciesDatabase from "@/data/species-dna-database.json";

type GameState = "idle" | "spinning" | "result";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  const handleSpin = useCallback(() => {
    setGameState("spinning");

    // Simulate DNA analysis with a fun delay
    setTimeout(() => {
      const species = getRandomSpecies((speciesDatabase as SpeciesDatabase).species);
      setSelectedSpecies(species);
      setGameState("result");
    }, 2000);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setSelectedSpecies(null);
    setGameState("idle");
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <DnaBackground />

      {/* Header */}
      <motion.div
        className="relative z-10 text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
          DNA Roulette
        </h1>
        <p className="text-xl text-foreground/70 max-w-md mx-auto">
          Fais tourner la roue et découvre avec quelle espèce tu partages le plus d&apos;ADN !
        </p>
      </motion.div>

      {/* Game Area */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px]">
        <AnimatePresence mode="wait">
          {gameState === "idle" && (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <DnaButton onClick={handleSpin} isSpinning={false} />
            </motion.div>
          )}

          {gameState === "spinning" && (
            <motion.div
              key="spinning"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DnaButton onClick={() => {}} isSpinning={true} />
              <motion.div
                className="text-foreground/60 text-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Séquençage de ton code génétique...
              </motion.div>
            </motion.div>
          )}

          {gameState === "result" && selectedSpecies && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultCard
                species={selectedSpecies}
                onPlayAgain={handlePlayAgain}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-4 text-center text-foreground/40 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Fait avec 🧬 et un brin d&apos;humour
      </motion.footer>
    </main>
  );
}
