"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
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
  const [loadingStep, setLoadingStep] = useState<1 | 2 | 3>(1);

  const handleSpin = useCallback(() => {
    setGameState("spinning");
    setLoadingStep(1);

    // Step 1: "Lecture de l'empreinte digitale" (2 seconds)
    setTimeout(() => {
      setLoadingStep(2);
    }, 2000);

    // Step 2: "Récupération de l'ADN" (2 more seconds = 4 total)
    setTimeout(() => {
      setLoadingStep(3);
    }, 4000);

    // Step 3: "Analyse de l'ADN" (2 more seconds = 6 total)
    setTimeout(() => {
      const species = getRandomSpecies((speciesDatabase as SpeciesDatabase).species);
      setSelectedSpecies(species);
      setGameState("result");
    }, 6000);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setSelectedSpecies(null);
    setLoadingStep(1);
    setGameState("idle");
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 safe-area-inset overflow-hidden">
      <DnaBackground />

      {/* Header */}
      <motion.div
        className="relative z-10 text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <Image
            src="/icon.svg"
            alt=""
            aria-hidden="true"
            width={80}
            height={80}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-20 lg:h-20"
            priority
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gradient">
            ADN Roulette
          </h1>
        </div>
        <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-md mx-auto px-2">
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

              {/* Progress dots */}
              <div className="flex gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  animate={{
                    backgroundColor: loadingStep >= 1 ? "#A78BFA" : "#334155",
                    scale: loadingStep === 1 ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    scale: { repeat: Infinity, duration: 1 },
                  }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full"
                  animate={{
                    backgroundColor: loadingStep >= 2 ? "#22D3EE" : "#334155",
                    scale: loadingStep === 2 ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    scale: { repeat: Infinity, duration: 1 },
                  }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full"
                  animate={{
                    backgroundColor: loadingStep >= 3 ? "#F472B6" : "#334155",
                    scale: loadingStep === 3 ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    scale: { repeat: Infinity, duration: 1 },
                  }}
                />
              </div>

              {/* Animated loading message */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={loadingStep}
                  className="text-foreground/60 text-lg text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {loadingStep === 1 && "👆 Lecture de l'empreinte digitale..."}
                    {loadingStep === 2 && "🧫 Récupération de l'ADN..."}
                    {loadingStep === 3 && "🔬 Analyse de l'ADN..."}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {gameState === "result" && selectedSpecies && (
            <motion.div
              key="result"
              className="flex justify-center w-full"
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
        className="absolute bottom-4 safe-area-bottom text-center text-foreground/40 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Fait avec 🧬 et un brin d&apos;humour
      </motion.footer>
    </main>
  );
}
