# 🚀 Plan d'Amélioration du Site Maison Médina

## Priorité : Expérience Utilisateur, Crédibilité & Accessibilité

---

## ✅ PHASE 1 : CONTACT & CONVERSION (Priorité HAUTE)

### 1. Bouton WhatsApp Flottant
**Objectif :** Faciliter le contact direct avec les clients

**PROMPT POUR CLAUDE CODE :**
```
Crée un composant WhatsAppButton.jsx qui affiche un bouton WhatsApp flottant fixe en bas à droite de l'écran. 

Spécifications :
- Position fixe en bas à droite (bottom: 20px, right: 20px)
- Icône WhatsApp verte (#25D366) avec effet de pulsation
- Au clic, ouvre WhatsApp avec le message pré-rempli : "Bonjour, je suis intéressé par vos chaussures artisanales"
- Numéro de téléphone : [VOTRE_NUMERO_WHATSAPP]
- Animation hover avec scale 1.1
- Z-index élevé pour rester au-dessus de tout
- Responsive (plus petit sur mobile)
- Ajouter ce composant dans App.jsx

Utilise Tailwind CSS et Framer Motion pour les animations.
```

---

### 2. Formulaire de Contact/Devis
**Objectif :** Capturer les demandes clients

**PROMPT POUR CLAUDE CODE :**
```
Crée un composant ContactForm.jsx pour demander un devis ou poser des questions.

Spécifications :
- Formulaire avec champs : Nom, Email, Téléphone, Produit intéressé (select), Message
- Validation des champs (email valide, téléphone marocain)
- Design élégant avec les couleurs de la marque (terracotta, charcoal)
- Bouton d'envoi avec animation de chargement
- Message de confirmation après envoi
- Intégration avec EmailJS ou Web3Forms pour l'envoi
- Section située avant le Footer
- Responsive et accessible (labels ARIA)

Utilise React Hook Form pour la validation et Framer Motion pour les animations.
Ajoute ce composant dans App.jsx avant le Footer.
```

---

## ✅ PHASE 2 : CRÉDIBILITÉ & CONFIANCE (Priorité HAUTE)

### 3. Section Points Forts (Trust Badges)
**Objectif :** Rassurer les clients sur la qualité

**PROMPT POUR CLAUDE CODE :**
```
Crée un composant TrustBadges.jsx qui affiche 4 points forts de Maison Médina.

Spécifications :
- 4 cartes avec icônes (lucide-react) :
  1. Livraison rapide partout au Maroc (icône Truck)
  2. Fabrication artisanale 100% (icône Award)
  3. Cuir de qualité premium (icône Star)
  4. Satisfaction garantie (icône ShieldCheck)
- Design en grille 2x2 sur desktop, 1 colonne sur mobile
- Chaque carte avec icône grande, titre et description courte
- Animations au scroll (fade in + slide up)
- Fond crème avec bordures arrondies
- Placer cette section après Hero et avant Collections

Utilise Framer Motion et react-intersection-observer.
Ajoute ce composant dans App.jsx.
```

---

### 4. Section Témoignages Clients
**Objectif :** Prouver la satisfaction client

**PROMPT POUR CLAUDE CODE :**
```
Crée un composant Testimonials.jsx avec des avis clients.

Spécifications :
- 3-4 témoignages de clients satisfaits
- Chaque témoignage avec : photo/avatar, nom, ville, avis (texte), note 5 étoiles
- Design en carrousel ou grille
- Citations avec guillemets stylisés
- Fond dégradé subtil
- Animations au scroll
- Section placée après Collections et avant CTA

Données des témoignages (tu peux les modifier) :
1. "Qualité exceptionnelle ! Mes mules sont confortables et élégantes." - Fatima Z., Casablanca
2. "Service impeccable, livraison rapide. Je recommande vivement !" - Ahmed M., Rabat
3. "Des chaussures magnifiques, fabrication artisanale remarquable." - Sanaa L., Marrakech

Utilise Framer Motion et lucide-react pour les icônes étoiles.
Ajoute ce composant dans App.jsx.
```

---

## ✅ PHASE 3 : EXPÉRIENCE PRODUITS (Priorité MOYENNE)

### 5. Modal Zoom Produit
**Objectif :** Permettre de voir les détails des produits

**PROMPT POUR CLAUDE CODE :**
```
Améliore le composant Collections.jsx pour ajouter une fonctionnalité de zoom sur les produits.

Spécifications :
- Au clic sur une card produit, ouvrir une modal plein écran
- Modal avec :
  * Image grande du produit (80% de l'écran)
  * Nom du produit
  * Description complète
  * Couleurs disponibles (badges colorés)
  * Tailles disponibles (badges)
  * Bouton "Demander un devis" qui ouvre WhatsApp
  * Bouton fermer (X) en haut à droite
- Fond semi-transparent noir (backdrop)
- Animations d'ouverture/fermeture fluides
- Fermeture au clic sur le backdrop ou touche Escape
- Navigation au clavier accessible
- Responsive (adapté mobile)

Utilise Framer Motion pour les animations (AnimatePresence).
Modifie Collections.jsx et ProductCard pour intégrer cette fonctionnalité.
```

---

### 6. Filtres par Catégorie
**PROMPT POUR CLAUDE CODE :**
```
Ajoute des filtres interactifs dans le composant Collections.jsx.

Spécifications :
- Boutons de filtre au-dessus de la grille : "Tous", "Mules", "Mocassins"
- Au clic, filtrer les produits affichés
- Bouton actif avec style différent (terracotta)
- Compteur de produits affichés
- Animations lors du changement de filtre
- Design élégant avec Tailwind CSS
- État géré avec useState

Modifie Collections.jsx pour ajouter cette fonctionnalité.
```

---

## ✅ PHASE 4 : ACCESSIBILITÉ & SEO (Priorité HAUTE)

### 7. Améliorer l'Accessibilité
**PROMPT POUR CLAUDE CODE :**
```
Améliore l'accessibilité de tous les composants du site Maison Médina.

Spécifications :
- Ajouter des attributs ARIA appropriés (aria-label, aria-labelledby, role)
- Assurer la navigation au clavier (tabIndex, focus visible)
- Améliorer le contraste des textes (WCAG AA minimum)
- Ajouter des textes alternatifs descriptifs aux images
- Labels visibles pour tous les champs de formulaire
- Skip to content link
- Annonces pour lecteurs d'écran (sr-only classes)
- Focus trap dans les modals

Parcours tous les composants :
- Navbar.jsx : navigation accessible au clavier
- Collections.jsx : images avec alt descriptifs
- ContactForm.jsx : labels associés aux inputs
- Footer.jsx : liens avec aria-label

Utilise les meilleures pratiques WCAG 2.1 niveau AA.
```

---

### 8. Optimisation SEO
**PROMPT POUR CLAUDE CODE :**
```
Améliore le SEO du site Maison Médina.

Spécifications :
- Installer react-helmet-async
- Ajouter des balises meta dans index.html :
  * Title : "Maison Médina - Chaussures Artisanales Marocaines | Mules & Mocassins Premium"
  * Description : "Découvrez notre collection de chaussures artisanales marocaines. Mules et mocassins en cuir de qualité, fabriqués à la main. Livraison partout au Maroc."
  * Keywords : "chaussures marocaines, mules artisanales, mocassins cuir, babouches premium"
  * Open Graph tags pour partage réseaux sociaux
  * Favicon
- Structure HTML sémantique (header, main, section, article)
- Balises heading hiérarchiques (h1, h2, h3)
- Textes alternatifs descriptifs pour images

Modifie index.html et ajoute les balises meta appropriées.
Vérifie la structure sémantique de App.jsx et des composants.
```

---

## ✅ PHASE 5 : PERFORMANCE & POLISH (Priorité MOYENNE)

### 9. Optimisation des Images
**PROMPT POUR CLAUDE CODE :**
```
Optimise le chargement des images pour améliorer les performances.

Spécifications :
- Ajouter lazy loading sur toutes les images (loading="lazy")
- Utiliser des placeholders pendant le chargement
- Format WebP avec fallback JPG
- Responsive images avec srcset
- Compression automatique
- Effet de blur-up au chargement

Modifie Collections.jsx et tous les composants utilisant des images.
```

---

### 10. Loading States & Animations
**PROMPT POUR CLAUDE CODE :**
```
Améliore les états de chargement et animations du site.

Spécifications :
- Skeleton loader pour les produits pendant le chargement
- Animation de page loader au démarrage
- Transitions de page fluides
- Micro-interactions sur les boutons (ripple effect)
- Scroll to top button
- Progress bar de scroll en haut de page
- Animations plus fluides et cohérentes

Utilise Framer Motion et crée un composant PageLoader.jsx.
```

---

## 📋 ORDRE D'IMPLÉMENTATION RECOMMANDÉ

### Sprint 1 - Contact & Conversion (1-2h)
1. ✅ Bouton WhatsApp Flottant
2. ✅ Section Points Forts (Trust Badges)
3. ✅ Formulaire de Contact/Devis

### Sprint 2 - Crédibilité (1h)
4. ✅ Section Témoignages Clients
5. ✅ Accessibilité globale

### Sprint 3 - Expérience Produits (1-2h)
6. ✅ Modal Zoom Produit
7. ✅ Filtres par Catégorie

### Sprint 4 - Optimisation (1h)
8. ✅ SEO
9. ✅ Optimisation Images
10. ✅ Loading States

---

## 🎯 RÉSULTAT ATTENDU

Après ces améliorations, votre site aura :
- ✅ **Contact facile** : WhatsApp + Formulaire
- ✅ **Crédibilité élevée** : Trust badges + Témoignages
- ✅ **Expérience premium** : Zoom produits + Filtres
- ✅ **Accessibilité** : Navigation au clavier, ARIA, contrastes
- ✅ **SEO optimisé** : Meta tags, structure sémantique
- ✅ **Performance** : Chargement rapide, animations fluides

---

## 📞 INFORMATION À COMPLÉTER

Avant de commencer, préparez :
- [ ] Votre numéro WhatsApp professionnel
- [ ] Adresse email pour recevoir les formulaires
- [ ] 3-4 vrais témoignages clients (si disponibles)
- [ ] Logo/Favicon de Maison Médina

---

**PRÊT À COMMENCER ?** 
Copiez les prompts un par un et donnez-les à Claude Code pour qu'il implémente chaque amélioration ! 🚀
