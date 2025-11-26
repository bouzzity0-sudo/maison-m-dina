# 🎨 EXEMPLE : Comment ajouter un produit

Ce fichier montre un exemple complet d'ajout de produit.

## 📋 Scénario : Ajouter des "Babouches Artisanales"

### 1. Vous avez une photo : `babouches-artisanales.jpg`

### 2. Vous la placez dans : `public/images/products/`

### 3. Vous ouvrez : `src/data/products.js`

### 4. Vous ajoutez ce code à la fin du tableau :

```javascript
export const products = [
  {
    id: 1,
    title: 'Mules Classiques',
    category: 'MULES',
    description: 'Élégance intemporelle et confort absolu. Finitions cousues, semelle ergonomique.',
    image: '/images/products/mules-classiques.jpg',
    price: '450 MAD',
    colors: ['Marron', 'Noir', 'Beige'],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
  },
  // ... autres produits ...
  
  // 👇 VOTRE NOUVEAU PRODUIT ICI
  {
    id: 5, // ⚠️ Numéro unique ! Incrémentez toujours
    title: 'Babouches Artisanales', // 📝 Nom qui s'affiche
    category: 'MULES', // 🏷️ MULES, MOCASSINS, COLORÉS, ou SABOTS
    description: 'Babouches traditionnelles faites main avec cuir premium marocain', // 💬 Description courte
    image: '/images/products/babouches-artisanales.jpg', // 📸 Chemin vers votre photo
    price: '380 MAD', // 💰 Prix affiché
    colors: ['Marron', 'Noir', 'Rouge'], // 🎨 Couleurs disponibles
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'], // 👟 Pointures
  },
];
```

### 5. Sauvegardez le fichier (Ctrl+S)

### 6. Le site se recharge automatiquement !

---

## 🎯 Points importants à retenir

### ✅ ID unique
Chaque produit doit avoir un `id` différent. Si votre dernier produit a l'id 4, le prochain sera 5, puis 6, etc.

### ✅ Chemin de l'image
Le chemin commence toujours par `/images/products/`
Ne mettez PAS `public` dans le chemin !

❌ Mauvais : `public/images/products/photo.jpg`
✅ Bon : `/images/products/photo.jpg`

### ✅ Catégories disponibles
- **MULES** - Pour les babouches et mules
- **MOCASSINS** - Pour les chaussures fermées élégantes
- **COLORÉS** - Pour les collections colorées
- **SABOTS** - Pour les sabots confort

### ✅ Virgule finale
N'oubliez pas la virgule après l'accolade fermante !

```javascript
  },  // 👈 Cette virgule est importante !
];
```

---

## 🚀 Résultat attendu

Votre nouveau produit apparaîtra dans la section "Nos Collections Premium" avec :
- ✨ Une belle animation d'apparition
- 🖼️ Votre photo en grand format carré
- 🏷️ Le badge de catégorie en haut
- 📝 Le titre et la description
- 💰 Le prix affiché
- 🔍 Un bouton "Voir plus" au survol

---

## 🔧 Troubleshooting

### ❓ L'image ne s'affiche pas ?
1. Vérifiez le nom du fichier (sensible à la casse !)
2. Vérifiez que l'image est dans `public/images/products/`
3. Vérifiez le format : `.jpg`, `.jpeg` ou `.png`

### ❓ Le site affiche une erreur ?
1. Vérifiez qu'il n'y a pas d'erreur de syntaxe (virgules, accolades)
2. Vérifiez que l'ID est unique
3. Ouvrez la console du navigateur (F12) pour voir l'erreur

### ❓ Les modifications ne s'affichent pas ?
1. Sauvegardez bien le fichier (Ctrl+S)
2. Rafraîchissez le navigateur (Ctrl+R ou F5)
3. Videz le cache (Ctrl+Shift+R)

---

Bon courage ! 🎉
