import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calculator, TrendingUp, Mail, CheckCircle } from 'lucide-react';
import { products } from '../data/products';

const QuoteCalculator = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedColor, setSelectedColor] = useState(products[0].colorVariants?.[0] || null);
  const [currentImage, setCurrentImage] = useState(products[0].colorVariants?.[0]?.image || products[0].image);
  const [sizes, setSizes] = useState({
    36: 0,
    37: 0,
    38: 0,
    39: 0,
    40: 0,
    41: 0,
  });

  const handleSizeChange = (size, value) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setSizes(prev => ({
      ...prev,
      [size]: numValue
    }));
  };

  const handleProductChange = (e) => {
    const product = products.find(p => p.id === parseInt(e.target.value));
    setSelectedProduct(product);
    const firstColor = product.colorVariants?.[0] || null;
    setSelectedColor(firstColor);
    setCurrentImage(firstColor?.image || product.image);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setCurrentImage(color.image);
  };

  // Calculs
  const totalPairs = Object.values(sizes).reduce((sum, qty) => sum + qty, 0);

  // Prix dégressif
  let pricePerPair = selectedProduct.priceB2B;
  let discount = 0;
  if (totalPairs >= 500) {
    pricePerPair = 11.99;
    discount = 11;
  } else if (totalPairs >= 300) {
    pricePerPair = 12.49;
    discount = 7;
  } else if (totalPairs >= 100) {
    pricePerPair = 12.99;
    discount = 4;
  }

  const subtotal = totalPairs * pricePerPair;
  const shippingCost = totalPairs > 0 ? (totalPairs >= 100 ? 0 : 50) : 0;
  const total = subtotal + shippingCost;

  // Marge boutique
  const retailPrice = 29.90;
  const marginPerPair = retailPrice - pricePerPair;
  const totalMargin = totalPairs * marginPerPair;
  const marginPercent = pricePerPair > 0 ? ((marginPerPair / pricePerPair) * 100).toFixed(0) : 0;

  const handleSendQuote = () => {
    const sizesList = Object.entries(sizes)
      .filter(([_, qty]) => qty > 0)
      .map(([size, qty]) => `Taille ${size}: ${qty} paires`)
      .join('\n');

    const message = `Demande de devis:\n\nProduit: ${selectedProduct.title}\nCouleur: ${selectedColor?.name || 'Standard'}\n\n${sizesList}\n\nTotal: ${totalPairs} paires\nMontant: ${total.toFixed(2)}€ TTC`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/33786350825?text=${encodedMessage}`, '_blank');
  };

  const canCalculate = totalPairs >= 30;

  return (
    <section id="calculateur" className="py-12 sm:py-14 md:py-16 bg-gradient-to-b from-white to-amber-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg mb-6"
          >
            <Calculator className="w-4 h-4" />
            Calculateur de devis
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Calculez votre <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">marge</span> en 30 secondes
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Composez votre commande et découvrez instantanément combien vous allez gagner
          </p>
        </motion.div>

        {/* Calculator Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8"
        >
          {/* Left: Configuration (3 colonnes) */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-500" />
              Composez votre commande
            </h3>

            {/* Product Image - En haut, pleine largeur */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 flex items-center justify-center">
              <img
                src={currentImage}
                alt={selectedProduct.title}
                className="w-full h-48 object-contain"
                onError={(e) => {
                  console.warn('Quote calculator image failed to load:', currentImage);
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80&fit=crop';
                }}
              />
            </div>

            {/* Product Selection */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                1. Choisissez votre modèle
              </label>
              <select
                value={selectedProduct.id}
                onChange={handleProductChange}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              >
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.title} - {product.priceB2B.toFixed(2)}€
                  </option>
                ))}
              </select>
            </div>

            {/* Color Selection */}
            {selectedProduct.colorVariants && selectedProduct.colorVariants.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2. Choisissez votre couleur
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.colorVariants.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleColorChange(color)}
                      className={`group relative transition-all ${
                        selectedColor === color ? 'scale-110' : 'hover:scale-105'
                      }`}
                      title={color.name}
                    >
                      <div
                        className={`w-10 h-10 rounded-full border-3 shadow-sm transition-all ${
                          selectedColor === color
                            ? 'border-amber-500 ring-3 ring-amber-200'
                            : 'border-white ring-2 ring-gray-200'
                        }`}
                        style={{ backgroundColor: color.hexCode }}
                      />
                      {selectedColor === color && (
                        <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-amber-500 fill-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Grid */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                3. Sélectionnez les quantités par taille
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {Object.keys(sizes).map(size => (
                  <div key={size} className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-600 mb-1 text-center">
                      T{size}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={sizes[size]}
                      onChange={(e) => handleSizeChange(size, e.target.value)}
                      className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center font-bold text-base"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Minimum Order Warning */}
            {totalPairs > 0 && totalPairs < 30 && (
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-3 flex items-start gap-2">
                <svg className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-orange-800 font-semibold">
                  Minimum 30 paires requises. Il vous manque {30 - totalPairs} paire{30 - totalPairs > 1 ? 's' : ''}.
                </p>
              </div>
            )}
          </div>

          {/* Right: Summary (2 colonnes) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-5 border-2 border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Résumé de commande
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Quantité totale</span>
                  <span className="text-2xl font-black text-gray-900">{totalPairs} paires</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Prix unitaire</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">{pricePerPair.toFixed(2)}€</span>
                    {discount > 0 && (
                      <span className="ml-2 text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                        -{discount}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="text-lg font-bold text-gray-900">{subtotal.toFixed(2)}€</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Frais de port</span>
                  <span className="text-lg font-bold text-gray-900">
                    {shippingCost === 0 && totalPairs > 0 ? (
                      <span className="text-green-600">OFFERTS</span>
                    ) : (
                      `${shippingCost.toFixed(2)}€`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-gray-900">TOTAL TTC</span>
                  <span className="text-3xl font-black text-gray-900">{total.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            {/* Margin Calculator */}
            {canCalculate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-4 sm:p-5 border-2 border-green-200"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Votre marge nette</h3>
                    <p className="text-xs text-gray-600">Si revendu à 29,90€/paire</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-gray-700">Marge par paire</span>
                    <span className="text-lg font-bold text-green-600">+{marginPerPair.toFixed(2)}€</span>
                  </div>

                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">MARGE TOTALE ESTIMÉE</p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-3xl font-black text-green-600">+{totalMargin.toFixed(2)}€</p>
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        +{marginPercent}%
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 text-center italic flex items-center justify-center gap-1">
                    <svg className="w-3 h-3 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                    {total.toFixed(2)}€ investis = {(total + totalMargin).toFixed(2)}€ de CA
                  </p>
                </div>
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.button
              onClick={handleSendQuote}
              disabled={!canCalculate}
              whileHover={canCalculate ? { scale: 1.03, y: -2 } : {}}
              whileTap={canCalculate ? { scale: 0.98 } : {}}
              className={`w-full py-4 px-6 rounded-full text-lg font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-3 min-h-[56px] ${
                canCalculate
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 hover:from-amber-500 hover:via-yellow-600 hover:to-amber-500 text-black shadow-amber-400/40 hover:shadow-[0_10px_40px_rgba(251,191,36,0.6)]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Mail className="w-5 h-5" />
              {canCalculate ? 'Recevoir ce devis par WhatsApp' : 'Minimum 30 paires requis'}
            </motion.button>
          </div>
        </motion.div>

        {/* Volume Pricing Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6 border-2 border-amber-200"
        >
          <h4 className="text-lg font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Grille tarifaire dégressive
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">30-99 paires</p>
              <p className="text-xl font-black text-gray-900">13,49€</p>
              <p className="text-xs text-gray-500">Prix standard</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-xs text-gray-600 mb-1">100-299 paires</p>
              <p className="text-xl font-black text-blue-600">12,99€</p>
              <p className="text-xs text-blue-600 font-semibold">-4%</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <p className="text-xs text-gray-600 mb-1">300-499 paires</p>
              <p className="text-xl font-black text-green-600">12,49€</p>
              <p className="text-xs text-green-600 font-semibold">-7%</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg border-2 border-amber-300">
              <p className="text-xs text-gray-600 mb-1">500+ paires</p>
              <p className="text-xl font-black text-amber-600">11,99€</p>
              <p className="text-xs text-amber-600 font-semibold">-11%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteCalculator;
