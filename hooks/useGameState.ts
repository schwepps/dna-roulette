"use client";

import { useState, useCallback } from "react";
import { Species, SpeciesDatabase } from "@/lib/types";
import { getRandomSpecies } from "@/lib/utils";
import { GAME_TIMING } from "@/lib/constants";
import speciesDatabase from "@/data/species-dna-database.json";

export type GameState = "idle" | "spinning" | "result";
export type LoadingStep = 1 | 2 | 3;

interface UseGameStateReturn {
  gameState: GameState;
  selectedSpecies: Species | null;
  loadingStep: LoadingStep;
  spin: () => void;
  reset: () => void;
}

/**
 * Custom hook to manage game state and spin orchestration
 */
export function useGameState(): UseGameStateReturn {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [loadingStep, setLoadingStep] = useState<LoadingStep>(1);

  const spin = useCallback(() => {
    setGameState("spinning");
    setLoadingStep(1);

    // Step 1: "Lecture de l'empreinte digitale"
    setTimeout(() => {
      setLoadingStep(2);
    }, GAME_TIMING.STEP_1_DELAY);

    // Step 2: "Récupération de l'ADN"
    setTimeout(() => {
      setLoadingStep(3);
    }, GAME_TIMING.STEP_2_DELAY);

    // Step 3: "Analyse de l'ADN" - show result
    setTimeout(() => {
      const species = getRandomSpecies(
        (speciesDatabase as SpeciesDatabase).species
      );
      setSelectedSpecies(species);
      setGameState("result");
    }, GAME_TIMING.RESULT_DELAY);
  }, []);

  const reset = useCallback(() => {
    setSelectedSpecies(null);
    setLoadingStep(1);
    setGameState("idle");
  }, []);

  return {
    gameState,
    selectedSpecies,
    loadingStep,
    spin,
    reset,
  };
}
