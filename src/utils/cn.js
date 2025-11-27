// ============================================================================
// CLASSNAME UTILITY - Intelligent className merging
// ============================================================================
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges classNames intelligently, handling Tailwind conflicts
 * @param {...any} inputs - ClassNames to merge
 * @returns {string} Merged className string
 * 
 * @example
 * cn('px-4 py-2', 'px-6') // => 'px-6 py-2' (px-6 overrides px-4)
 * cn('text-red-500', condition && 'text-blue-500') // Conditional classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
