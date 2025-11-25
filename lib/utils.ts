import { Species } from "./types";

/**
 * Selects a random species from the provided array, excluding recently selected ones
 * to prevent perceived repetition
 */
export function getRandomSpecies(
  species: Species[],
  recentSpecies: Species[] = []
): Species {
  // Filter out recently selected species
  const availableSpecies = species.filter(
    (s) => !recentSpecies.some((recent) => recent.id === s.id)
  );

  // Fallback to full list if too few remaining (edge case)
  const pool = availableSpecies.length > 0 ? availableSpecies : species;

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

/**
 * Seeded pseudo-random number generator for consistent, deterministic values
 * Used for particle animations to ensure consistency across renders
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}
