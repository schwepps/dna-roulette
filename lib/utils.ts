import { Species } from "./types";

/**
 * Selects a random species from the provided array
 */
export function getRandomSpecies(species: Species[]): Species {
  const randomIndex = Math.floor(Math.random() * species.length);
  return species[randomIndex];
}

/**
 * Seeded pseudo-random number generator for consistent, deterministic values
 * Used for particle animations to ensure consistency across renders
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}
