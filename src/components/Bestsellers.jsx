import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Star, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

const Bestsellers = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Filtrer les 3 bestsellers
  const bestsellers = products.filter(product =>
    product.badges?.includes('bestseller') || product.badges?.includes('trending')
  ).slice(0, 3);

  const scrollToCollections = () => {
    document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="bestsellers" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-black tracking-wider shadow-lg mb-6"
          >
            <TrendingUp className="w-4 h-4" />
            Nos meilleures ventes
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
            Vos <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 bg-clip-text text-transparent">bestsellers</span> 2025
          </h2>

          <motion.div
            className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-400/50"
            animate={{
              boxShadow: [
                '0 4px 20px rgba(251, 191, 36, 0.5)',
                '0 4px 30px rgba(251, 191, 36, 0.8)',
                '0 4px 20px rgba(251, 191, 36, 0.5)',
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <p className="text-base sm:text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Les modèles préférés de nos boutiques partenaires • Stock limité • Commandez rapidement
          </p>
        </motion.div>

        {/* Bestsellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12">
          {bestsellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl border-2 border-amber-200 hover:border-champagne transition-all duration-500"
            >
              {/* Badge position */}
              {index === 0 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-champagne text-noir px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg flex items-center gap-1.5 border border-white/20"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    #1 Best Seller
                  </motion.div>
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-square bg-gray-50 p-4 sm:p-6 overflow-hidden rounded-t-[14px]">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="eager"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    console.warn('Bestseller image failed to load:', product.image);
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80&fit=crop';
                  }}
                />

                {/* Badge social proof en haut à gauche */}
                <div className="absolute top-2 left-2">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{Math.floor(Math.random() * 50) + 80} boutiques</span>
                  </motion.div>
                </div>

                {/* Badge catégorie en haut à droite */}
                <div className="absolute top-2 right-2">
                  <span className="inline-block bg-white border-2 border-gray-200 text-gray-900 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md">
                    {product.category}
                  </span>
                </div>

                {/* Badge stock en bas */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold text-center shadow-md flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    En stock • Livraison 4-7j
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-display font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {product.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating social proof */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">4.8/5 ({Math.floor(Math.random() * 30) + 25} avis)</span>
                </div>

                {/* Prix */}
                <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 tracking-wide font-bold">Prix B2B</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-gray-900">{product.priceB2B.toFixed(2).replace('.', ',')}€</span>
                      <span className="text-sm text-gray-500">TTC</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">Couleurs</p>
                    <p className="text-2xl font-black text-amber-600">{product.colorVariants?.length || 1}</p>
                  </div>
                </div>

                {/* Color preview */}
                <div className="flex gap-1.5 mb-4">
                  {product.colorVariants?.slice(0, 5).map((color, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md ring-1 ring-gray-200"
                      style={{ backgroundColor: color.hexCode }}
                      title={color.name}
                    />
                  ))}
                  {product.colorVariants?.length > 5 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white shadow-md ring-1 ring-gray-200 bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                      +{product.colorVariants.length - 5}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <motion.button
                  onClick={scrollToCollections}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 hover:from-amber-500 hover:via-yellow-600 hover:to-amber-500 text-black py-3 px-4 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Voir les détails
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA voir toute la collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            onClick={scrollToCollections}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-white border-2 border-amber-400 text-gray-900 hover:bg-amber-50 px-8 py-4 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Découvrir toute la collection
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Bestsellers;
