import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    'Qualité premium garantie - Cuir vegan haute qualité',
    'Finitions cousues - Solidité exceptionnelle',
    'Large gamme de modèles et couleurs',
    'Cuirs de luxe des tanneries de Fès également disponibles',
    'Livraison rapide : 4 à 7 jours',
    'Assortiments personnalisés selon votre clientèle',
    'Marges confortables pour votre boutique',
    'Service client dédié et réactif',
  ];

  return (
    <section id="tarifs" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4 px-2">
              Tarifs fournisseur - Prix chaussures artisanales B2B
            </h2>
            <motion.div
              className="w-24 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-400/50"
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
          </motion.div>

          {/* Tarifs dégressifs - Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-100">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Grille Tarifaire Dégressive</h3>
                <p className="text-amber-300 font-semibold">Plus vous commandez, plus vous économisez</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b-2 border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Volume</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Prix/paire TTC</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Remise</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Marge* (PVP 29,90€)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">30-99 paires</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-2xl font-black text-gray-900">13,49€</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-500">-</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xl font-bold text-green-600">+16,41€</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-blue-50 hover:bg-blue-100 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">100-299 paires</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-2xl font-black text-blue-600">12,99€</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">-4%</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xl font-bold text-green-600">+16,91€</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-green-50 hover:bg-green-100 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">300-499 paires</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-2xl font-black text-green-600">12,49€</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">-7%</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xl font-bold text-green-600">+17,41€</span>
                      </td>
                    </tr>
                    <tr className="bg-amber-50 hover:bg-amber-100 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">500+ paires</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-2xl font-black text-amber-600">11,99€</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">-11%</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xl font-bold text-green-600">+17,91€</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 px-6 py-4 border-t-2 border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  * Marge nette par paire si PVP recommandé de 29,90€ TTC
                </p>
              </div>
            </div>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-100"
          >

            {/* Features List */}
            <div className="p-6 sm:p-8 md:p-10">
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                    className="flex items-start space-x-3"
                  >
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-accent-rose flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm sm:text-base text-charcoal/80 leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Highlight Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gradient-to-r from-accent-rose/10 to-accent-cuivre/10 rounded-lg p-6 mb-8 border-l-4 border-accent-rose"
              >
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-accent-rose flex-shrink-0 mt-1" fill="currentColor" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-semibold text-charcoal mb-2">
                      DES CHAUSSURES QUI SÉDUIRONT VOS CLIENTS LES PLUS EXIGEANTS
                    </h3>
                    <p className="text-sm sm:text-base text-charcoal/70 font-medium">
                      Confort  Élégance  Durabilité  Authenticité
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <motion.button
                  onClick={() => scrollToSection('#contact')}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 hover:from-amber-500 hover:via-yellow-600 hover:to-amber-500 text-black py-4 px-8 rounded-full text-base sm:text-lg font-bold shadow-lg shadow-amber-400/40 hover:shadow-[0_10px_40px_rgba(251,191,36,0.6)] transition-all duration-300 min-h-[56px]"
                >
                  Demander un devis
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
