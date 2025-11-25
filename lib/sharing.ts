import { Species } from "./types";

export type SharePlatform = "twitter" | "whatsapp" | "facebook" | "linkedin";

/**
 * Generate platform-specific share text
 */
export function getShareText(
  species: Species,
  platform: SharePlatform | "default"
): string {
  switch (platform) {
    case "twitter":
      // Shorter, punchier with hashtag
      return `🧬 Je suis ${species.percentage}% ${species.name} ! ${species.emoji}\n\n${species.funFact}\n\n#DNARoulette`;
    case "whatsapp":
      // More conversational for chat
      return `Hey ! 🧬 Je viens de découvrir que je suis ${species.percentage}% ${species.name} ! ${species.emoji}\n\n${species.funFact}\n\nEssaie toi aussi :`;
    default:
      return `🧬 Je suis ${species.percentage}% ${species.name} ! ${species.emoji}\n\n${species.funFact}\n\nTrouve ton match ADN :`;
  }
}

/**
 * Generate share URLs for each platform
 */
export function getShareLinks(species: Species, shareUrl: string) {
  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText(species, "twitter"))}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(getShareText(species, "default"))}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${getShareText(species, "whatsapp")} ${shareUrl}`)}`,
  };
}
