// ============================================================================
// THROTTLE UTILITY - Performance optimization for high-frequency events
// ============================================================================

/**
 * Throttles a function to execute at most once per specified delay
 * Useful for: scroll events, resize events, mouse move
 * 
 * @param {Function} func - Function to throttle
 * @param {number} delay - Minimum time between executions (ms)
 * @returns {Function} Throttled function
 * 
 * @example
 * const handleScroll = throttle(() => {
 *   console.log('Scrolled')
 * }, 100)
 * window.addEventListener('scroll', handleScroll)
 */
export function throttle(func, delay = 100) {
  let lastCall = 0
  let timeoutId

  return function (...args) {
    const now = Date.now()
    const timeSinceLastCall = now - lastCall

    if (timeSinceLastCall >= delay) {
      lastCall = now
      func.apply(this, args)
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        lastCall = Date.now()
        func.apply(this, args)
      }, delay - timeSinceLastCall)
    }
  }
}
