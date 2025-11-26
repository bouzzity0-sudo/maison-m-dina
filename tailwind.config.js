/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nouvelle Palette Premium Moderne - Luxe Minimaliste
        noir: {
          DEFAULT: '#0A0A0A',
          light: '#1A1A1A',
          lighter: '#2A2A2A',
        },
        anthracite: {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D',
          lighter: '#404040',
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
        // Couleurs d'accent subtiles
        accent: {
          rose: '#B87F7A',
          cuivre: '#A67C52',
        },
        // Anciennes couleurs (transition progressive)
        gold: {
          50: '#FDFBF7',
          100: '#F9F3E8',
          200: '#F0E4C8',
          300: '#E5D4A8',
          400: '#C9A85C', // Maintenant champagne
          500: '#C9A85C',
          600: '#B8956A',
        },
        copper: '#A67C52',
        charcoal: {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D',
          dark: '#0A0A0A',
        },
        terracotta: {
          DEFAULT: '#B87F7A',
          light: '#C89691',
          dark: '#A06B66',
        },
        sand: {
          DEFAULT: '#E8DCC4',
          light: '#F5F1E8',
        },
        cream: '#FAFAF8',
        sienna: {
          light: '#C89691',
          DEFAULT: '#B87F7A',
        },
        brown: {
          deep: '#0A0A0A',
          medium: '#1A1A1A',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
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
