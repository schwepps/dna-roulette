import { useSyncExternalStore } from "react";

/**
 * Hook to detect user's reduced motion preference
 * Returns true if the user prefers reduced motion (accessibility setting)
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    // Subscribe to media query changes
    (callback) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    // Get snapshot for client
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    // Get snapshot for server (default to false - show animations)
    () => false
  );
}
