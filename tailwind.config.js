/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Maison Médina (Originale & Premium)
        noir: {
          DEFAULT: '#0A0A0A',
          light: '#1A1A1A',
          lighter: '#2A2A2A',
        },
        sable: {
          DEFAULT: '#F5F1E8',
          light: '#FAFAF8',
          dark: '#E8DCC4',
        },
        champagne: {
          DEFAULT: '#C9A85C',
          light: '#D4B870',
          dark: '#B89548',
        },
        // Mappings pour la compatibilité
        background: '#FAFAF8', // Sable très clair
        surface: '#FFFFFF', // Blanc
        text: {
          DEFAULT: '#0A0A0A', // Noir
          muted: '#666666',
        },
        accent: {
          DEFAULT: '#C9A85C', // Champagne
          hover: '#B89548',
        },
      },
      fontFamily: {
        display: ['Unbounded', 'Playfair Display', 'serif'], // Garder Unbounded pour le côté moderne, mais en light
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        // Ombres modernes et subtiles
        'sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'DEFAULT': '0 2px 4px rgba(0, 0, 0, 0.04)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.08)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.08)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.10)',
        'premium': '0 8px 32px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'wide': '0.02em',
        'wider': '0.04em',
        'widest': '0.08em',
      },
      lineHeight: {
        'tight': '1.1',
        'snug': '1.3',
        'relaxed': '1.6',
        'loose': '1.8',
      },
    },
  },
  plugins: [],
}
