"use client";

import { useState, useSyncExternalStore, useCallback } from "react";
import { motion } from "framer-motion";
import { Species } from "@/lib/types";
import { Share2, MessageCircle, Link, Check } from "lucide-react";

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
            <Share2 className="w-5 h-5 text-white" />
          </motion.button>
        )}

        {/* Twitter/X */}
        <motion.a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} bg-black`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Partager sur X"
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
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
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
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
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
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
          <MessageCircle className="w-5 h-5 text-white" />
        </motion.a>

        {/* Copy Link */}
        <motion.button
          onClick={handleCopyLink}
          className={`${buttonClass} bg-surface-light`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Copier le lien"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-400" />
          ) : (
            <Link className="w-5 h-5 text-white" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
