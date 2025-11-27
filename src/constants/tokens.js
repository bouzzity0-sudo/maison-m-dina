// ============================================================================
// DESIGN TOKENS - Ateliers Médina Premium System
// ============================================================================
// Moroccan Luxury Color Palette & Design System for Awwwards-level experience

export const colors = {
  // === PREMIUM COLOR SYSTEM ===
  
  // Primary - Noir (Deep Black)
  noir: {
    DEFAULT: '#0A0A0A',
    light: '#1A1A1A',
    lighter: '#2A2A2A',
  },

  // Secondary - Anthracite (Charcoal)
  anthracite: {
    DEFAULT: '#1A1A1A',
    light: '#2D2D2D',
    lighter: '#404040',
  },

  // Tertiary - Sable (Sand/Beige)
  sable: {
    DEFAULT: '#F5F1E8',
    light: '#FAFAF8',
    dark: '#E8DCC4',
  },

  // Accent - Champagne (Gold/Brass)
  champagne: {
    DEFAULT: '#C9A85C',
    light: '#D4B870',
    dark: '#B89548',
  },

  // === SEMANTIC COLORS ===
  primary: '#C9A85C',      // champagne
  secondary: '#1A1A1A',    // anthracite
  background: '#FAFAF8',   // sable-light
  surface: '#FFFFFF',
  
  // Feedback colors
  error: '#DC2626',
  success: '#059669',
  warning: '#D97706',
  info: '#2563EB',
};

export const typography = {
  fontFamily: {
    serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
    sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
    display: ['Playfair Display', 'serif'],
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],
    sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
    xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
    '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
    '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
    '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
    '8xl': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  letterSpacing: {
    tighter: '-0.03em',
    tight: '-0.02em',
    normal: '0em',
    wide: '0.02em',
    wider: '0.04em',
    widest: '0.08em',
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
  40: '10rem',     // 160px
  48: '12rem',     // 192px
  56: '14rem',     // 224px
  64: '16rem',     // 256px
};

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
  DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.04)',
  md: '0 4px 6px rgba(0, 0, 0, 0.05)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.08)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.08)',
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.10)',
  premium: '0 8px 32px rgba(0, 0, 0, 0.06)',
  glow: {
    champagne: '0 4px 20px rgba(201, 168, 92, 0.5)',
    amber: '0 4px 20px rgba(251, 191, 36, 0.5)',
  },
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const transitions = {
  duration: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Premium easing curves
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

export const radii = {
  none: '0',
  sm: '0.125rem',      // 2px
  DEFAULT: '0.25rem',  // 4px
  md: '0.375rem',      // 6px
  lg: '0.5rem',        // 8px
  xl: '0.75rem',       // 12px
  '2xl': '1rem',       // 16px
  '3xl': '1.5rem',     // 24px
  full: '9999px',
};

// Animation presets for GSAP
export const animations = {
  // Fade animations
  fadeIn: {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  },
  
  // Slide animations
  slideUp: {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  },
  
  slideDown: {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  },
  
  // Scale animations
  scaleIn: {
    scale: 0.95,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)',
  },
};

export default {
  colors,
  typography,
  spacing,
  shadows,
  breakpoints,
  transitions,
  radii,
  animations,
};
