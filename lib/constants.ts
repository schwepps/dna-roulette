/**
 * Game timing constants (milliseconds)
 */
export const GAME_TIMING = {
  STEP_1_DELAY: 2000,
  STEP_2_DELAY: 4000,
  RESULT_DELAY: 6000,
} as const;

/**
 * Particle configuration for animations
 */
export const PARTICLES = {
  DNA_PAIRS: 12,
  CONFETTI_COUNT: 20,
} as const;

/**
 * UI feedback timing (milliseconds)
 */
export const FEEDBACK = {
  COPY_TIMEOUT: 2000,
} as const;

/**
 * Emoji sets used across components
 */
export const EMOJIS = {
  DNA: ["🧬", "✨", "🔬"],
  CONFETTI: ["🎉", "✨", "🧬", "🎊", "💫"],
} as const;
