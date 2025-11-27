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
    <section id="calculateur" className="py-12 sm:py-14 md:py-16 bg-sable-light relative overflow-hidden border-t border-noir/5">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/10 rounded-full blur-[100px] opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />

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
            className="inline-flex items-center gap-2 bg-white border border-champagne/30 text-champagne-dark px-6 py-2 rounded-full text-sm font-mono tracking-wider mb-6 shadow-sm"
          >
            <Calculator className="w-4 h-4" />
            SIMULATEUR_B2B_V3
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-noir mb-4 uppercase">
            Calculez votre <span className="text-champagne-dark">Marge</span>
          </h2>

          <p className="text-base sm:text-lg text-noir/60 max-w-2xl mx-auto font-mono">
            // ESTIMATION INSTANTANÉE DE RENTABILITÉ
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
          <div className="lg:col-span-3 bg-white rounded-none p-4 sm:p-6 border border-noir/5 relative shadow-xl">
            {/* Tech corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-champagne opacity-50" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-champagne opacity-50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-champagne opacity-50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-champagne opacity-50" />

            <h3 className="text-lg font-display text-noir mb-6 flex items-center gap-2 uppercase tracking-wider">
              <Calculator className="w-5 h-5 text-champagne" />
              Configuration Commande
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Column 1: Image (Large) */}
              <div className="bg-sable-light border border-noir/5 rounded-none p-6 flex items-center justify-center h-full min-h-[300px] relative group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,92,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src={currentImage}
                  alt={selectedProduct.title}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 relative z-10"
                  onError={(e) => {
                    console.warn('Quote calculator image failed to load:', currentImage);
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80&fit=crop';
                  }}
                />
                <div className="absolute bottom-4 left-4 bg-white/90 text-noir text-xs font-mono px-2 py-1 border border-noir/10">
                  {selectedProduct.title.toUpperCase()}
                </div>
              </div>

              {/* Column 2: Controls */}
              <div className="space-y-6">
                {/* Product Selection */}
                <div>
                  <label className="block text-sm font-mono text-noir/60 mb-2 uppercase">
                    1. Modèle
                  </label>
                  <select
                    value={selectedProduct.id}
                    onChange={handleProductChange}
                    className="w-full px-4 py-3 bg-sable-light border border-noir/10 text-noir rounded-none focus:outline-none focus:border-champagne transition-all text-lg font-display uppercase tracking-wide"
                  >
                    {products.map(product => (
                      <option key={product.id} value={product.id} className="bg-white text-noir">
                        {product.title}
                      </option>
                    ))}
                  </select>
                  <p className="text-right text-champagne-dark font-mono text-sm mt-1">
                    {selectedProduct.priceB2B.toFixed(2)}€ / paire
                  </p>
                </div>

                {/* Color Selection */}
                {selectedProduct.colorVariants && selectedProduct.colorVariants.length > 0 && (
                  <div>
                    <label className="block text-sm font-mono text-noir/60 mb-2 uppercase">
                      2. Coloris
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {selectedProduct.colorVariants.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleColorChange(color)}
                          className={`group relative transition-all duration-300 ${selectedColor === color ? 'scale-110' : 'hover:scale-105'
                            }`}
                          title={color.name}
                        >
                          <div
                            className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all ${selectedColor === color
                              ? 'border-champagne ring-2 ring-champagne/20'
                              : 'border-gray-200 hover:border-gray-300'
                              }`}
                            style={{ backgroundColor: color.hexCode }}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-noir font-display mt-2 uppercase tracking-wider">
                      {selectedColor?.name || 'Standard'}
                    </p>
                  </div>
                )}

                {/* Size Grid */}
                <div>
                  <label className="block text-sm font-mono text-noir/60 mb-2 uppercase">
                    3. Quantités (Par taille)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.keys(sizes).map(size => (
                      <div key={size} className="flex flex-col">
                        <label className="text-[10px] font-mono text-noir/60 mb-1 text-center">
                          T{size}
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={sizes[size]}
                          onChange={(e) => handleSizeChange(size, e.target.value)}
                          className="w-full px-2 py-2 bg-sable-light border border-noir/10 text-noir rounded-none focus:outline-none focus:border-champagne text-center font-mono text-lg transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Minimum Order Warning */}
                {totalPairs > 0 && totalPairs < 30 && (
                  <div className="bg-red-50 border border-red-200 p-4 flex items-start gap-3">
                    <p className="text-sm text-red-600 font-mono">
                      :: ALERT: MINIMUM_ORDER_QTY (30) <br />
                      MISSING: {30 - totalPairs} PAIRS
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Summary (2 colonnes) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Order Summary */}
            <div className="bg-white rounded-none p-4 sm:p-5 border border-noir/5 relative shadow-lg">
              <h3 className="text-lg font-display text-noir mb-4 flex items-center gap-2 uppercase tracking-wider">
                <TrendingUp className="w-5 h-5 text-champagne" />
                Résumé
              </h3>

              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-noir/5">
                  <span className="text-noir/60">TOTAL_QTY</span>
                  <span className="text-xl font-bold text-noir">{totalPairs}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-noir/60">UNIT_PRICE</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-noir">{pricePerPair.toFixed(2)}€</span>
                    {discount > 0 && (
                      <span className="ml-2 text-xs font-bold text-white bg-champagne px-1 rounded-sm">
                        -{discount}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-noir/60">SUBTOTAL</span>
                  <span className="text-lg font-bold text-noir">{subtotal.toFixed(2)}€</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-noir/5">
                  <span className="text-noir/60">SHIPPING</span>
                  <span className="text-lg font-bold text-noir">
                    {shippingCost === 0 && totalPairs > 0 ? (
                      <span className="text-champagne-dark">FREE</span>
                    ) : (
                      `${shippingCost.toFixed(2)}€`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-display text-noir uppercase">TOTAL</span>
                  <span className="text-3xl font-display text-champagne-dark">{total.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            {/* Margin Calculator */}
            {canCalculate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-champagne/5 border border-champagne/20 p-4 sm:p-5 relative"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-champagne flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-display text-noir uppercase">Marge Nette</h3>
                    <p className="text-[10px] font-mono text-noir/60">RETAIL_PRICE: 29.90€</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-mono text-noir/60">MARGIN / PAIR</span>
                    <span className="text-lg font-bold text-champagne-dark">+{marginPerPair.toFixed(2)}€</span>
                  </div>

                  <div className="bg-white border border-noir/5 p-3 text-center">
                    <p className="text-[10px] font-mono text-noir/60 mb-1 uppercase">Total Estimated Profit</p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-3xl font-display text-champagne-dark">+{totalMargin.toFixed(2)}€</p>
                      <span className="bg-champagne text-white px-2 py-0.5 text-xs font-bold font-mono">
                        +{marginPercent}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.button
              onClick={handleSendQuote}
              disabled={!canCalculate}
              whileHover={canCalculate ? { scale: 1.02 } : {}}
              whileTap={canCalculate ? { scale: 0.98 } : {}}
              className={`w-full py-4 px-6 text-lg font-display uppercase tracking-wider shadow-lg transition-all duration-300 flex items-center justify-center gap-3 min-h-[56px] ${canCalculate
                ? 'bg-noir text-white hover:bg-noir-light shadow-xl'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                }`}
            >
              <Mail className="w-5 h-5" />
              {canCalculate ? 'Demander Devis' : 'Min. 30 Paires'}
            </motion.button>
          </div>
        </motion.div>

        {/* Volume Pricing Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-white border border-noir/5 p-6 shadow-md"
        >
          <h4 className="text-sm font-mono text-noir/60 mb-4 text-center flex items-center justify-center gap-2 uppercase">
            :: VOLUME_DISCOUNTS
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-sable-light border border-noir/5">
              <p className="text-[10px] font-mono text-noir/60 mb-1">30-99</p>
              <p className="text-xl font-display text-noir">13,49€</p>
            </div>
            <div className="text-center p-4 bg-champagne/5 border border-champagne/20">
              <p className="text-[10px] font-mono text-noir/60 mb-1">100-299</p>
              <p className="text-xl font-display text-champagne-dark">12,99€</p>
              <p className="text-[10px] text-champagne-dark font-mono">-4%</p>
            </div>
            <div className="text-center p-4 bg-champagne/10 border border-champagne/30">
              <p className="text-[10px] font-mono text-noir/60 mb-1">300-499</p>
              <p className="text-xl font-display text-champagne-dark">12,49€</p>
              <p className="text-[10px] text-champagne-dark font-mono">-7%</p>
            </div>
            <div className="text-center p-4 bg-champagne/20 border border-champagne/40">
              <p className="text-[10px] font-mono text-noir/60 mb-1">500+</p>
              <p className="text-xl font-display text-champagne-dark">11,99€</p>
              <p className="text-[10px] text-champagne-dark font-mono">-11%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteCalculator;
