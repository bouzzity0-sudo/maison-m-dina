# 🎨 Guide : Utiliser les icônes Lucide React

## 📦 Bibliothèque installée

**Lucide React** - Collection d'icônes modernes, élégantes et cohérentes
- Plus de 1000 icônes disponibles
- Design professionnel et minimaliste
- Personnalisables et performantes

---

## 🚀 Comment ajouter une icône

### 1. Trouver l'icône

Visitez : https://lucide.dev/icons

Recherchez l'icône dont vous avez besoin (ex: "heart", "star", "shopping-cart")

### 2. Importer l'icône

```javascript
import { Heart, Star, ShoppingCart } from 'lucide-react';
```

### 3. Utiliser l'icône

```javascript
// Icône simple
<Heart />

// Avec personnalisation
<Heart 
  className="w-6 h-6 text-red-500" 
  strokeWidth={2}
/>

// Dans un bouton
<button className="flex items-center gap-2">
  <ShoppingCart className="w-5 h-5" />
  Ajouter au panier
</button>
```

---

## 🎯 Propriétés disponibles

### Taille
```javascript
<Heart className="w-4 h-4" />  // Petit
<Heart className="w-6 h-6" />  // Moyen (défaut)
<Heart className="w-8 h-8" />  // Grand
```

### Couleur
```javascript
<Heart className="text-red-500" />
<Heart className="text-sienna" />
<Heart className="text-white" />
```

### Épaisseur du trait
```javascript
<Heart strokeWidth={1} />    // Fin
<Heart strokeWidth={2} />    // Normal (défaut)
<Heart strokeWidth={3} />    // Épais
```

### Remplissage
```javascript
<Star fill="currentColor" />  // Icône pleine
<Heart fill="none" />          // Icône vide (défaut)
```

---

## 📋 Icônes déjà utilisées sur le site

### Navigation & Actions
- `Menu` - Menu hamburger mobile
- `X` - Fermer menu
- `FileText` - Demander devis
- `ArrowRight` - Flèche suivant
- `ArrowDown` - Scroll indicator
- `Eye` - Voir/Découvrir
- `ShoppingBag` - Commander

### Avantages (WhyChoose)
- `Sparkles` - Qualité Premium
- `Palette` - Flexibilité/Créativité
- `Layers` - Large choix/Variété
- `Package` - Commandes/Livraison
- `Zap` - Rapidité/Efficacité
- `TrendingDown` - Prix compétitifs

### Contact & Social
- `Mail` - Email
- `Phone` - Téléphone
- `Globe` - Site web
- `MapPin` - Localisation
- `Instagram` - Instagram
- `Facebook` - Facebook
- `Linkedin` - LinkedIn

### Validation & Mise en avant
- `Check` - Validation/Liste
- `Star` - Mise en avant/Premium

---

## 💡 Exemples pratiques

### Bouton avec icône
```javascript
import { ShoppingBag } from 'lucide-react';

<button className="flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-lg">
  <ShoppingBag className="w-5 h-5" />
  Commander
</button>
```

### Liste avec icônes
```javascript
import { Check } from 'lucide-react';

const features = ['Feature 1', 'Feature 2', 'Feature 3'];

<ul>
  {features.map((feature, index) => (
    <li key={index} className="flex items-start gap-3">
      <Check className="w-6 h-6 text-terracotta flex-shrink-0" />
      <span>{feature}</span>
    </li>
  ))}
</ul>
```

### Icône dans un badge
```javascript
import { Star } from 'lucide-react';

<div className="flex items-center gap-2 bg-sienna/10 px-4 py-2 rounded-full">
  <Star className="w-4 h-4 text-sienna" fill="currentColor" />
  <span>Premium</span>
</div>
```

### Icône animée
```javascript
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

<motion.div
  whileHover={{ scale: 1.2 }}
  className="cursor-pointer"
>
  <Heart className="w-6 h-6 text-red-500" />
</motion.div>
```

---

## 🎨 Icônes recommandées par usage

### E-commerce
- `ShoppingCart`, `ShoppingBag` - Panier
- `Heart` - Favoris
- `TrendingUp`, `TrendingDown` - Prix/Tendances
- `Tag` - Prix/Promotions
- `Gift` - Cadeaux/Offres
- `CreditCard` - Paiement

### Navigation
- `Home` - Accueil
- `Menu` - Menu hamburger
- `X`, `XCircle` - Fermer
- `ChevronRight`, `ChevronLeft` - Navigation
- `ArrowRight`, `ArrowLeft` - Flèches

### Social & Contact
- `Mail` - Email
- `Phone` - Téléphone
- `MapPin` - Localisation
- `MessageCircle` - Chat/Message
- `Send` - Envoyer

### Informations
- `Info` - Information
- `AlertCircle` - Alerte
- `CheckCircle` - Succès
- `XCircle` - Erreur
- `HelpCircle` - Aide

### Qualité & Services
- `Star` - Note/Premium
- `Award` - Récompense
- `Shield` - Sécurité/Garantie
- `Truck` - Livraison
- `Clock` - Rapidité/Délai

---

## 🔧 Personnalisation avancée

### Avec Tailwind CSS
```javascript
<Heart className="w-6 h-6 text-red-500 hover:text-red-700 transition-colors" />
```

### Avec animation Framer Motion
```javascript
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity }}
>
  <Star className="w-8 h-8" fill="gold" />
</motion.div>
```

---

## 📚 Ressources

- **Documentation** : https://lucide.dev
- **Catalogue complet** : https://lucide.dev/icons
- **GitHub** : https://github.com/lucide-icons/lucide

---

Bon design ! 🎉
