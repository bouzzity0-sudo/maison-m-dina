# 🇲🇦 Maison Médina - Site Catalogue B2B Premium

Site one-page moderne et ultra-professionnel pour Maison Médina, marque de chaussures artisanales marocaines haut de gamme.

## 📋 Description

Maison Médina importe des mules et mocassins artisanaux en cuir vegan de Fès (Maroc) pour les revendre aux boutiques françaises. Ce site catalogue valorise l'authenticité, le savoir-faire artisanal et la qualité premium.

## ✨ Fonctionnalités

- **Design Premium** : Interface moderne avec palette de couleurs chaudes inspirée du Maroc
- **One-Page Fluide** : Navigation smooth scroll entre les sections
- **Animations Avancées** : Framer Motion pour des transitions élégantes
- **Responsive Design** : Optimisé pour mobile, tablette et desktop
- **Performance** : Lazy loading et optimisations pour un chargement rapide
- **Accessibilité** : Contraste WCAG AA, navigation clavier, labels ARIA

## 🎨 Palette de Couleurs

- **Primaire** : Terre de Sienne (#C9956B, #D4A574)
- **Secondaire** : Beige sable (#E8DCC4, #F5EFE6)
- **Accent** : Terracotta (#B85C3A, #A0522D)
- **Neutre sombre** : Marron profond (#3E2723, #4A3228)
- **Neutre clair** : Crème (#FAF8F5, #FFFEF9)

## 🏗️ Structure du Site

1. **Hero Section** - Introduction avec CTA principal
2. **L'Héritage de Fès** - Histoire et savoir-faire
3. **Chiffres Clés** - Statistiques importantes
4. **Nos Collections Premium** - 4 catégories de produits
5. **Pourquoi Choisir Maison Médina ?** - 6 avantages
6. **Tarification** - Prix et offres
7. **CTA Finale** - Appel à l'action
8. **Footer** - Contact et navigation

## 🛠️ Technologies Utilisées

- **React 18** - Framework JavaScript
- **Vite** - Build tool ultra-rapide
- **TailwindCSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **React Intersection Observer** - Animations au scroll

## 📦 Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet ou naviguer dans le dossier** :
   ```bash
   cd maison-medina
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur** :
   Le site sera accessible sur `http://localhost:5173` (ou un autre port si celui-ci est occupé)

## 🚀 Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée la version de production dans `/dist`
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

## 📁 Structure du Projet

```
maison-medina/
├── public/              # Fichiers statiques
├── src/
│   ├── components/      # Composants React
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Heritage.jsx
│   │   ├── KeyStats.jsx
│   │   ├── Collections.jsx
│   │   ├── WhyChoose.jsx
│   │   ├── Pricing.jsx
│   │   ├── CTA.jsx
│   │   └── Footer.jsx
│   ├── App.jsx         # Composant principal
│   ├── main.jsx        # Point d'entrée
│   └── index.css       # Styles globaux
├── index.html          # Template HTML
├── tailwind.config.js  # Configuration Tailwind
├── postcss.config.js   # Configuration PostCSS
├── vite.config.js      # Configuration Vite
└── package.json        # Dépendances
```

## 🎯 Composants Principaux

### Navbar
Navigation sticky avec menu responsive et smooth scroll

### Hero
Section d'accueil avec animations de particules et CTA

### Heritage
Présentation du savoir-faire avec animations au scroll

### KeyStats
Statistiques clés avec effets hover

### Collections
4 catégories de produits avec images et overlays

### WhyChoose
6 cartes d'avantages avec icônes

### Pricing
Carte de tarification premium avec liste de fonctionnalités

### CTA
Appel à l'action avec animation pulse et fond dégradé

### Footer
Footer complet avec contact, navigation et réseaux sociaux

## 🎨 Personnalisation

### Modifier les couleurs

Éditez `tailwind.config.js` dans la section `colors` :

```javascript
colors: {
  sienna: {
    light: '#D4A574',
    DEFAULT: '#C9956B',
  },
  // ...
}
```

### Modifier les textes

Les textes sont directement dans les composants. Par exemple, pour modifier le titre Hero :

```jsx
// src/components/Hero.jsx
<h1>Votre nouveau titre</h1>
```

### Modifier les images

Les images utilisent Unsplash. Remplacez les URLs dans les composants :

```jsx
// src/components/Collections.jsx
image: 'https://votre-url-image.com'
```

## 📱 Responsive Design

Le site est entièrement responsive avec breakpoints :

- **Mobile** : < 768px (1 colonne)
- **Tablette** : 768px - 1024px (2 colonnes)
- **Desktop** : > 1024px (3-4 colonnes)

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `/dist`.

### Déployer sur Vercel

1. Installer Vercel CLI : `npm i -g vercel`
2. Lancer : `vercel`
3. Suivre les instructions

### Déployer sur Netlify

1. `npm run build`
2. Glisser-déposer le dossier `dist` sur Netlify

## 📄 License

Ce projet est créé pour Maison Médina.

## 🤝 Support

Pour toute question ou assistance :
- Email : contact@medina-shoes.com
- Téléphone : +33 1 23 45 67 89

---

**Fait avec passion pour l'artisanat marocain** ✨
