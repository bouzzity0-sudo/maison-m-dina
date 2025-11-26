# 📸 Guide : Ajouter vos modèles de chaussures au catalogue

## 🎯 Étapes simples pour ajouter vos produits

### 1️⃣ Préparer vos photos

**Format recommandé :**
- Format : JPG ou PNG
- Taille : Au moins 800x800 pixels (idéalement 1200x1200)
- Ratio : Photos carrées (1:1) pour un meilleur rendu
- Qualité : Haute résolution, fond neutre de préférence

**Nommage des fichiers :**
Utilisez des noms descriptifs sans espaces ni caractères spéciaux :
- ✅ Bon : `mules-marron-cuir.jpg`
- ✅ Bon : `mocassin-noir-premium.jpg`
- ❌ Mauvais : `Photo 1.jpg`
- ❌ Mauvais : `IMG_2024.jpg`

---

### 2️⃣ Ajouter vos photos au projet

**Placez vos photos dans le dossier :**
```
public/images/products/
```

**Exemple de structure :**
```
public/
  images/
    products/
      mules-classiques-marron.jpg
      mules-classiques-noir.jpg
      mocassins-premium-cuir.jpg
      sabots-confort-beige.jpg
      babouches-colorees-rouge.jpg
```

---

### 3️⃣ Ajouter les informations du produit

**Ouvrez le fichier :** `src/data/products.js`

**Ajoutez votre produit à la fin du tableau :**

```javascript
{
  id: 5, // Numéro unique, incrémentez de 1
  title: 'Nom de votre modèle',
  category: 'MULES', // Choisir : MULES, MOCASSINS, COLORÉS, SABOTS
  description: 'Description courte et attractive de votre produit',
  image: '/images/products/nom-de-votre-photo.jpg',
  price: '400 MAD',
  colors: ['Marron', 'Noir', 'Beige'], // Couleurs disponibles
  sizes: ['38', '39', '40', '41', '42', '43', '44', '45'], // Pointures
},
```

---

### 4️⃣ Exemple complet

```javascript
// Dans src/data/products.js

export const products = [
  // ... produits existants ...
  
  {
    id: 5,
    title: 'Babouches Artisanales',
    category: 'MULES',
    description: 'Babouches traditionnelles fait main avec cuir de première qualité',
    image: '/images/products/babouches-artisanales.jpg',
    price: '380 MAD',
    colors: ['Marron', 'Noir', 'Rouge'],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
  },
  {
    id: 6,
    title: 'Mules Été Collection',
    category: 'COLORÉS',
    description: 'Collection estivale aux couleurs vives et design moderne',
    image: '/images/products/mules-ete.jpg',
    price: '420 MAD',
    colors: ['Bleu', 'Jaune', 'Rose', 'Vert'],
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
  },
];
```

---

## 🚀 Voir vos modifications

Votre site se met à jour automatiquement ! Ouvrez :
**http://localhost:5177/**

Les nouveaux produits apparaîtront dans la section "Nos Collections Premium"

---

## 💡 Conseils supplémentaires

### Pour de meilleures photos :
- ✨ Utilisez un bon éclairage naturel
- 📐 Centrez bien la chaussure
- 🎨 Fond uni (blanc, beige ou gris clair)
- 🔍 Montrez les détails de qualité
- 📸 Prenez plusieurs angles si possible

### Catégories disponibles :
- **MULES** : Babouches, mules traditionnelles
- **MOCASSINS** : Chaussures fermées élégantes
- **COLORÉS** : Collections colorées et modernes
- **SABOTS** : Chaussures confort quotidien

### Optimiser les images :
Pour des temps de chargement rapides, compressez vos images :
- Utilisez https://tinypng.com (gratuit)
- Ou https://squoosh.app (gratuit)
- Visez 200-500 KB par image

---

## 🆘 Besoin d'aide ?

### Problème : L'image ne s'affiche pas
✅ Vérifiez que le nom du fichier correspond exactement (sensible à la casse)
✅ Vérifiez que l'image est bien dans `public/images/products/`
✅ Vérifiez le format (jpg, jpeg, png)

### Problème : Le site ne se met pas à jour
✅ Sauvegardez bien le fichier `products.js`
✅ Rafraîchissez la page du navigateur (Ctrl + R ou Cmd + R)
✅ Si nécessaire, redémarrez le serveur

---

## 📝 Checklist avant d'ajouter un produit

- [ ] Photo préparée (format carré, bonne qualité)
- [ ] Photo nommée correctement (sans espaces)
- [ ] Photo placée dans `public/images/products/`
- [ ] Informations du produit ajoutées dans `src/data/products.js`
- [ ] ID unique attribué
- [ ] Catégorie choisie
- [ ] Prix défini
- [ ] Couleurs et tailles listées
- [ ] Site vérifié dans le navigateur

---

Bon courage ! 🎉
