"use client";

import { useState, useSyncExternalStore, useCallback } from "react";
import { motion } from "framer-motion";
import { Species } from "@/lib/types";

interface ShareButtonsProps {
  species: Species;
}

// Custom hook for browser-only values to avoid hydration mismatch
function useClientValue<T>(getClientValue: () => T, serverValue: T): T {
  return useSyncExternalStore(
    () => () => {},
    getClientValue,
    () => serverValue
  );
}

export function ShareButtons({ species }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `🧬 Je viens de découvrir que je suis ${species.percentage}% ${species.name} ! ${species.emoji}\n\n${species.funFact}\n\nTrouve ton match ADN :`;

  // Use client-side values safely
  const shareUrl = useClientValue(
    () => window.location.href,
    ""
  );

  const canShare = useClientValue(
    () => typeof navigator.share === "function",
    false
  );

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Résultat DNA Roulette",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    }
  }, [shareText, shareUrl]);

  const handleCopyLink = useCallback(async () => {
    const fullText = `${shareText} ${shareUrl}`;
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareText, shareUrl]);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
  };

  const buttonClass = `
    p-3 rounded-xl transition-all cursor-pointer
    hover:scale-110 active:scale-95
  `;

  return (
    <div className="space-y-4">
      <p className="text-sm text-foreground/60 uppercase tracking-wider">
        Partage ton résultat
      </p>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        {/* Native Share (mobile/desktop) */}
        {canShare && (
          <motion.button
            onClick={handleNativeShare}
            className={`${buttonClass} bg-linear-to-r from-primary-500 to-secondary-500`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Partager"
          >
            <span className="text-xl">📤</span>
          </motion.button>
        )}

        {/* Twitter/X */}
        <motion.a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} bg-[#1DA1F2]`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Partager sur X"
        >
          <span className="text-xl">𝕏</span>
        </motion.a>

        {/* Facebook */}
        <motion.a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} bg-[#1877F2]`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Partager sur Facebook"
        >
          <span className="text-xl">📘</span>
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} bg-[#0A66C2]`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Partager sur LinkedIn"
        >
          <span className="text-xl">💼</span>
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} bg-[#25D366]`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Partager sur WhatsApp"
        >
          <span className="text-xl">💬</span>
        </motion.a>

        {/* Copy Link */}
        <motion.button
          onClick={handleCopyLink}
          className={`${buttonClass} bg-surface-light`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Copier le lien"
        >
          <span className="text-xl">{copied ? "✅" : "🔗"}</span>
        </motion.button>
      </div>
    </div>
  );
}
