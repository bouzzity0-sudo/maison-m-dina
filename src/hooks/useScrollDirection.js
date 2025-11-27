// ============================================================================
// SCROLL DIRECTION HOOK - Detect scroll direction
// ============================================================================
import { useState, useEffect } from 'react'
import { throttle } from '../utils/throttle'

/**
 * Hook to detect scroll direction
 * @param {number} threshold - Minimum scroll distance to trigger change
 * @returns {string} 'up' | 'down' | null
 * 
 * @example
 * const scrollDirection = useScrollDirection()
 * // Hide navbar on scroll down, show on scroll up
 */
export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollDirection = throttle(() => {
      const scrollY = window.scrollY

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        return
      }

      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up')
      setLastScrollY(scrollY > 0 ? scrollY : 0)
    }, 100)

    window.addEventListener('scroll', updateScrollDirection, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [lastScrollY, threshold])

  return scrollDirection
}
