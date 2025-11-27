# 🚀 REFONTE V2.0 - GUIDE D'IMPLÉMENTATION

## ✅ PHASE 1 TERMINÉE - Infrastructure Premium

### 📦 Dépendances installées
```bash
npm install gsap @gsap/react clsx tailwind-merge
npm install --save-dev vite-plugin-compression rollup-plugin-visualizer sharp
```

### 🎨 Fichiers créés

#### 1. Design Tokens (`src/constants/tokens.js`)
Système de design tokens complet avec :
- Palette de couleurs Ateliers Médina
- Typographie (Playfair Display, DM Sans)
- Espacements, ombres, transitions
- Animations presets pour GSAP

#### 2. Utilities (`src/utils/`)
- `cn.js` - Fusion intelligente de classNames
- `throttle.js` - Optimisation événements scroll/resize
- `debounce.js` - Optimisation inputs/recherche

#### 3. Hooks personnalisés (`src/hooks/`)
- `useMediaQuery.js` - Détection responsive
- `useReducedMotion.js` - Accessibilité + mobile
- `useScrollDirection.js` - Direction scroll

#### 4. Custom Cursor (`src/components/shared/CustomCursor.jsx`)
Curseur interactif premium niveau Awwwards

#### 5. Vite Config optimisée (`vite.config.js`)
- Compression Brotli + Gzip
- Code splitting manuel
- Bundle analyzer
- Minification Terser

---

## 🎯 PHASE 2 - IMPLÉMENTATIONS À FAIRE

### A. Hero Premium avec GSAP

Créer `src/components/HeroPremium.jsx` avec :

**Optimisations clés** :
- Particles : 15 → 5 (mobile) | 12 (desktop) | 0 (reduced motion)
- Animations GSAP au lieu de Framer Motion
- Parallax avec ScrollTrigger
- Timeline pour animations séquentielles

**Code à ajouter dans App.jsx** :
```jsx
// Remplacer
import Hero from './components/Hero'
// Par
import HeroPremium from './components/HeroPremium'

// Puis dans le JSX
<HeroPremium />
```

### B. Lazy Loading des composants

Modifier `src/App.jsx` :

```jsx
import { lazy, Suspense } from 'react'

// Composants above-the-fold (chargés immédiatement)
import Navbar from './components/Navbar'
import HeroPremium from './components/HeroPremium'
import CustomCursor from './components/shared/CustomCursor'

// Composants below-the-fold (lazy loaded)
const Collections = lazy(() => import('./components/Collections'))
const QuoteCalculator = lazy(() => import('./components/QuoteCalculator'))
const FAQ = lazy(() => import('./components/FAQ'))
const ContactForm = lazy(() => import('./components/ContactForm'))
const Footer = lazy(() => import('./components/Footer'))

// Loading fallback
const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-champagne/30 border-t-champagne rounded-full animate-spin" />
  </div>
)

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <HeroPremium />
      
      <Suspense fallback={<SectionLoader />}>
        <Collections />
        <QuoteCalculator />
        <FAQ />
        <ContactForm />
        <Footer />
      </Suspense>
    </>
  )
}
```

### C. Optimiser Hero mobile actuel

Dans `src/components/Hero.jsx` (avant de migrer vers HeroPremium) :

```jsx
import { useMediaQuery } from '../hooks/useMediaQuery'

const Hero = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const particleCount = isMobile ? 5 : 15
  
  // Ligne 116, remplacer
  {[...Array(15)].map(...
  // Par
  {[...Array(particleCount)].map(...
}
```

### D. Optimiser Navbar scroll

Dans `src/components/Navbar.jsx` :

```jsx
import { throttle } from '../utils/throttle'

useEffect(() => {
  const handleScroll = throttle(() => {
    setIsScrolled(window.scrollY > 20)
  }, 100)
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

---

## 📊 RÉSULTATS ATTENDUS

### Avant optimisation :
- Bundle : 534KB (463KB JS + 71KB CSS)
- Lighthouse Desktop : ~65/100
- Lighthouse Mobile : ~45/100
- LCP : 4.0s
- FCP : 2.5s

### Après optimisation :
- Bundle : ~250KB (-53%)
- Lighthouse Desktop : 90-95/100
- Lighthouse Mobile : 80-90/100
- LCP : < 2.0s
- FCP : < 1.2s

---

## 🔧 COMMANDES UTILES

```bash
# Dev avec analyse bundle
ANALYZE=true npm run dev

# Build optimisé
npm run build

# Preview build
npm run preview

# Analyser bundle size
npx vite-bundle-visualizer
```

---

## 📝 PROCHAINES ÉTAPES

1. ✅ Copier le code Hero Premium ci-dessus
2. ✅ Implémenter lazy loading dans App.jsx
3. ✅ Ajouter CustomCursor dans App.jsx
4. ✅ Tester en mode dev
5. ✅ Build production
6. ✅ Tester Core Web Vitals avec Lighthouse

---

## 🎨 GUIDE DESIGN TOKENS

Utiliser les tokens dans vos composants :

```jsx
import { colors, typography, spacing } from '../constants/tokens'
import { cn } from '../utils/cn'

// Exemple button
<button className={cn(
  'px-8 py-4',
  'bg-champagne hover:bg-champagne-light',
  'text-noir font-bold',
  'rounded-sm shadow-premium'
)}>
  Click me
</button>
```

---

Fait avec 🔥 pour Ateliers Médina v2.0
