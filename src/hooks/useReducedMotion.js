// ============================================================================
// REDUCED MOTION HOOK - Accessibility & mobile optimization
// ============================================================================
import { useMediaQuery } from './useMediaQuery'

/**
 * Hook to detect if animations should be reduced
 * Respects user preferences and mobile devices
 * 
 * @returns {boolean} Whether to reduce/disable animations
 * 
 * @example
 * const shouldReduceMotion = useReducedMotion()
 * {!shouldReduceMotion && <AnimatedParticles />}
 */
export function useReducedMotion() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  return prefersReducedMotion || isMobile
}
