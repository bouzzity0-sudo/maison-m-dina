// ============================================================================
// DEBOUNCE UTILITY - Delay execution until user stops interacting
// ============================================================================

/**
 * Debounces a function to execute only after user stops calling it
 * Useful for: search inputs, form validation, window resize
 * 
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay after last call before execution (ms)
 * @returns {Function} Debounced function
 * 
 * @example
 * const handleSearch = debounce((query) => {
 *   fetch(`/api/search?q=${query}`)
 * }, 300)
 * input.addEventListener('input', (e) => handleSearch(e.target.value))
 */
export function debounce(func, delay = 300) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
