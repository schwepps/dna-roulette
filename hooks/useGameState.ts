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
const RECENT_EXCLUSION_COUNT = 5;

export function useGameState(): UseGameStateReturn {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [loadingStep, setLoadingStep] = useState<LoadingStep>(1);
  const [recentSpecies, setRecentSpecies] = useState<Species[]>([]);

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
        (speciesDatabase as SpeciesDatabase).species,
        recentSpecies
      );
      setSelectedSpecies(species);
      setRecentSpecies((prev) => [species, ...prev].slice(0, RECENT_EXCLUSION_COUNT));
      setGameState("result");
    }, GAME_TIMING.RESULT_DELAY);
  }, [recentSpecies]);

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
