import { Species } from "./types";

/**
 * Selects a random species from the provided array
 */
export function getRandomSpecies(species: Species[]): Species {
  const randomIndex = Math.floor(Math.random() * species.length);
  return species[randomIndex];
}
