// Catalogue de produits Ateliers Médina - Collection 2025
// Pour ajouter une nouvelle couleur :
// 1. Ajoutez la photo dans public/images/products/ avec le format: MM-SAB-XXX-couleur.jpg
// 2. Ajoutez l'objet dans colorVariants avec le code HEX exact du catalogue

export const products = [
  // MM-SAB-001 • SABOT BOUCLE CLASSIQUE
  {
    id: 1,
    code: 'MM-SAB-001',
    title: 'Sabot Boucle Classique',
    category: 'MULES',
    description: 'Simili-daim mat • Boucle latérale réglable • Semelle liège pailletée dorée',
    image: '/images/products/Modele.simple.boucle/MM-SAB-001-camel.jpg',
    price: '13,49€ TTC',
    priceB2B: 13.49,
    sizes: ['36', '37', '38', '39', '40', '41'],
    badges: ['bestseller'],
    colorVariants: [
      { name: 'Camel', image: '/images/products/Modele.simple.boucle/MM-SAB-001-camel.jpg', hexCode: '#C4915B' },
      { name: 'Taupe clair', image: '/images/products/Modele.simple.boucle/MM-SAB-001-taupe-clair.jpg', hexCode: '#B8A894' },
      { name: 'Noir', image: '/images/products/Modele.simple.boucle/MM-SAB-001-noir.jpg', hexCode: '#1A1A1A' },
      { name: 'Taupe moyen', image: '/images/products/Modele.simple.boucle/MM-SAB-001-taupe-moyen.jpg', hexCode: '#9B8573' },
      { name: 'Bordeaux', image: '/images/products/Modele.simple.boucle/MM-SAB-001-bordeaux.jpg', hexCode: '#6B4347' },
      { name: 'Kaki', image: '/images/products/Modele.simple.boucle/MM-SAB-001-kaki.jpg', hexCode: '#5C5E47' }
    ]
  },

  // MM-SAB-002 • SABOT PERFORÉ STRASS
  {
    id: 2,
    code: 'MM-SAB-002',
    title: 'Sabot Perforé Strass',
    category: 'MULES',
    description: 'Simili-daim • Perforations décoratives strass/clous dorés • Bride ajustable • Semelle liège pailletée',
    image: '/images/products/modele.strass/MM-SAB-002-noir.jpg',
    price: '13,99€ TTC',
    priceB2B: 13.99,
    sizes: ['36', '37', '38', '39', '40', '41'],
    badges: ['bestseller', 'trending'],
    colorVariants: [
      { name: 'Noir', image: '/images/products/modele.strass/MM-SAB-002-noir.jpg', hexCode: '#1C1C1C' },
      { name: 'Bleu jean', image: '/images/products/modele.strass/MM-SAB-002-bleu.jpg', hexCode: '#4A7BA7' },
      { name: 'Marron chocolat', image: '/images/products/modele.strass/MM-SAB-002-marron.jpg', hexCode: '#5C4033' },
      { name: 'Beige taupe', image: '/images/products/modele.strass/MM-SAB-002-beige.jpg', hexCode: '#C4B5A0' },
      { name: 'Bordeaux', image: '/images/products/modele.strass/MM-SAB-002-bordeaux.jpg', hexCode: '#6B3A3E' },
      { name: 'Vert kaki', image: '/images/products/modele.strass/MM-SAB-002-kaki.jpg', hexCode: '#7A7A52' },
      { name: 'Camel clair', image: '/images/products/modele.strass/MM-SAB-002-camel.jpg', hexCode: '#D4A574' },
      { name: 'Moutarde', image: '/images/products/modele.strass/MM-SAB-002-moutarde.jpg', hexCode: '#D4A23A' },
      { name: 'Fuchsia', image: '/images/products/modele.strass/MM-SAB-002-fuchsia.jpg', hexCode: '#E91E63' }
    ]
  },

  // MM-SAB-003 • SABOT MINIMALISTE
  {
    id: 3,
    code: 'MM-SAB-003',
    title: 'Sabot Minimaliste',
    category: 'MULES',
    description: 'Simili-daim • Design épuré sans ornements • Découpe mocassin • Semelle liège pailletée',
    image: '/images/products/Modele 4/noir.jpg',
    price: '13,99€ TTC',
    priceB2B: 13.99,
    sizes: ['36', '37', '38', '39', '40', '41'],
    badges: ['new'],
    colorVariants: [
      { name: 'Noir', image: '/images/products/Modele 4/noir.jpg', hexCode: '#1C1C1C' },
      { name: 'Marron foncé', image: '/images/products/Modele 4/marron foncé.jpg', hexCode: '#5C4033' },
      { name: 'Marron clair', image: '/images/products/Modele 4/maron clair.jpg', hexCode: '#A0826D' },
      { name: 'Camel', image: '/images/products/Modele 4/camel.jpg', hexCode: '#C19A6B' },
      { name: 'Beige', image: '/images/products/Modele 4/beige.jpg', hexCode: '#E8D5C4' },
      { name: 'Rose', image: '/images/products/Modele 4/rose.jpg', hexCode: '#D4A5A5' },
      { name: 'Bleu marine', image: '/images/products/Modele 4/bleu marine.jpg', hexCode: '#1E3A5F' },
      { name: 'Bleu ciel', image: '/images/products/Modele 4/turquoise.jpg', hexCode: '#87CEEB' }
    ]
  },

  // MM-SAB-004 • SABOT SEMELLE COMPENSÉE
  {
    id: 4,
    code: 'MM-SAB-004',
    title: 'Sabot Boucle Semelle Compensée',
    category: 'MULES',
    description: 'Simili-daim • Boucle latérale • Semelle compensée épaisse 3-4cm • Effet plateforme confort',
    image: '/images/products/MM-SAB-004-noir.jpg',
    price: '14,99€ TTC',
    priceB2B: 14.99,
    sizes: ['36', '37', '38', '39', '40', '41'],
    badges: ['trending'],
    colorVariants: [
      { name: 'Noir total', image: '/images/products/MM-SAB-004-noir.jpg', hexCode: '#000000' },
      { name: 'Fuchsia', image: '/images/products/MM-SAB-004-fuchsia.jpg', hexCode: '#E91E63' },
      { name: 'Camel', image: '/images/products/MM-SAB-004-camel.jpg', hexCode: '#B8956A' },
      { name: 'Camel moutarde', image: '/images/products/MM-SAB-004-moutarde.jpg', hexCode: '#D4A23A' }
    ]
  },

  // MM-SAB-005 • SABOT CHARM PENDENTIF
  {
    id: 5,
    code: 'MM-SAB-005',
    title: 'Sabot avec Charm Pendentif',
    category: 'MULES',
    description: 'Simili-daim • Pendentif/charm métallique doré décoratif • Semelle liège pailletée',
    image: '/images/products/MM-SAB-005-noir.jpg',
    price: '14,50€ TTC',
    priceB2B: 14.50,
    sizes: ['36', '37', '38', '39', '40', '41'],
    colorVariants: [
      { name: 'Noir', image: '/images/products/MM-SAB-005-noir.jpg', hexCode: '#1C1C1C' },
      { name: 'Bleu roi', image: '/images/products/MM-SAB-005-bleu-roi.jpg', hexCode: '#4169B0' },
      { name: 'Camel', image: '/images/products/MM-SAB-005-camel.jpg', hexCode: '#B8956A' },
      { name: 'Beige nude', image: '/images/products/MM-SAB-005-nude.jpg', hexCode: '#E5DDD1' },
      { name: 'Marron cognac', image: '/images/products/MM-SAB-005-cognac.jpg', hexCode: '#8B5A3C' },
      { name: 'Violet mauve', image: '/images/products/MM-SAB-005-violet.jpg', hexCode: '#6B5B95' },
      { name: 'Bleu navy', image: '/images/products/MM-SAB-005-navy.jpg', hexCode: '#1E3A5F' }
    ]
  },

  // MM-SAB-006 • SABOT BI-MATIÈRE TISSÉ
  {
    id: 6,
    code: 'MM-SAB-006',
    title: 'Sabot Bi-Matière Tissé',
    category: 'MULES',
    description: 'Simili-daim + Tissu jean/lin • Boucle latérale • Mélange de textures • Semelle liège pailletée',
    image: '/images/products/MM-SAB-006-bleu-ciel.jpg',
    price: '13,99€ TTC',
    priceB2B: 13.99,
    sizes: ['36', '37', '38', '39', '40', '41'],
    colorVariants: [
      { name: 'Bleu ciel jean', image: '/images/products/MM-SAB-006-bleu-ciel.jpg', hexCode: '#87CEEB' },
      { name: 'Bleu marine denim', image: '/images/products/MM-SAB-006-marine.jpg', hexCode: '#1E3A5F' },
      { name: 'Rose orange', image: '/images/products/MM-SAB-006-rose.jpg', hexCode: '#E67E50' },
      { name: 'Beige lin', image: '/images/products/MM-SAB-006-beige.jpg', hexCode: '#E5DDD1' }
    ]
  },

  // MM-SAB-007 • SABOT CUIR LISSE PROFESSIONNEL
  {
    id: 7,
    code: 'MM-SAB-007',
    title: 'Sabot Cuir Lisse Professionnel',
    category: 'MULES',
    description: 'Cuir vegan lisse • Boucle réglable • Semelle noire rainurée antidérapante • Facile d\'entretien',
    image: '/images/products/MM-SAB-007-noir.jpg',
    price: '13,49€ TTC',
    priceB2B: 13.49,
    sizes: ['36', '37', '38', '39', '40', '41'],
    colorVariants: [
      { name: 'Noir', image: '/images/products/MM-SAB-007-noir.jpg', hexCode: '#000000' },
      { name: 'Blanc', image: '/images/products/MM-SAB-007-blanc.jpg', hexCode: '#F5F5F5' },
      { name: 'Rose poudré', image: '/images/products/MM-SAB-007-rose.jpg', hexCode: '#D4A5A5' },
      { name: 'Orange', image: '/images/products/MM-SAB-007-orange.jpg', hexCode: '#E67E50' },
      { name: 'Bleu ciel', image: '/images/products/MM-SAB-007-bleu.jpg', hexCode: '#87CEEB' },
      { name: 'Beige nude', image: '/images/products/MM-SAB-007-nude.jpg', hexCode: '#E5D4C1' }
    ]
  }
];
