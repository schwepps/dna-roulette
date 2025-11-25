import type { Transition, TargetAndTransition } from "framer-motion";

/**
 * Reusable animation scale presets
 */
export const HOVER_SCALE: TargetAndTransition = { scale: 1.1 };
export const HOVER_SCALE_SUBTLE: TargetAndTransition = { scale: 1.05 };
export const TAP_SCALE: TargetAndTransition = { scale: 0.95 };

/**
 * Spring physics for bouncy reveals
 */
export const SPRING_BOUNCE: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 15,
};

/**
 * Get entry animation props with reduced motion support
 */
export function getEntryAnimation(prefersReducedMotion: boolean, delay = 0) {
  return {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.5, delay },
  };
}

/**
 * Get hover/tap props with reduced motion support
 */
export function getHoverTap(prefersReducedMotion = false) {
  return {
    whileHover: prefersReducedMotion ? {} : HOVER_SCALE,
    whileTap: TAP_SCALE,
  };
}

/**
 * Get subtle hover/tap props with reduced motion support
 */
export function getHoverTapSubtle(prefersReducedMotion = false) {
  return {
    whileHover: prefersReducedMotion ? {} : HOVER_SCALE_SUBTLE,
    whileTap: TAP_SCALE,
  };
}
