export interface Species {
  id: number;
  name: string;
  scientificName: string;
  percentage: number;
  emoji: string;
  category: string;
  funFact: string;
}

export interface SpeciesDatabase {
  metadata: {
    title: string;
    description: string;
    sources: string[];
    total_species: number;
    last_updated: string;
  };
  species: Species[];
}
