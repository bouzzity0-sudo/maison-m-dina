import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X } from 'lucide-react';

const ComparisonBanner = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const advantages = [
    {
      title: 'Commande minimum',
      us: '30 paires seulement',
      them: '500 paires minimum',
    },
    {
      title: 'Délai de livraison',
      us: '4-7 jours express',
      them: '45-60 jours d\'attente',
    },
    {
      title: 'Choix des tailles',
      us: 'Totalement personnalisé',
      them: 'Tailles imposées',
    },
    {
      title: 'Qualité matériaux',
      us: 'Contrôle qualité constant',
      them: 'Qualité variable',
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-cream via-white to-sand-light overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-copper rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-3 sm:mb-4">
              Pourquoi choisir Ateliers Médina ?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-charcoal/60 max-w-2xl mx-auto">
              La différence qui fait toute la différence
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {advantages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                  {/* Gradient top accent */}
                  <div className="h-1.5 bg-gradient-to-r from-gold-400 via-gold-500 to-copper" />
                  
                  <div className="p-5 sm:p-6">
                    {/* Category */}
                    <h3 className="text-xs sm:text-sm font-bold text-charcoal/50 tracking-wider mb-4 sm:mb-5">
                      {item.title}
                    </h3>

                    {/* Our advantage - highlighted */}
                    <div className="mb-4 sm:mb-5 transform group-hover:scale-105 transition-transform duration-300">
                      <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-gold-50 to-gold-100/50 rounded-xl border-2 border-gold-400 relative overflow-hidden">
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
                        
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-gold-500 to-copper rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold text-gold-600 tracking-wide mb-0.5">
                            Ateliers Médina
                          </div>
                          <div className="text-sm sm:text-base font-bold text-charcoal leading-tight">
                            {item.us}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Competition - crossed out */}
                    <div className="opacity-60">
                      <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-charcoal/5 rounded-xl border border-charcoal/10">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-charcoal/20 rounded-full flex items-center justify-center">
                          <X className="w-3 h-3 sm:w-4 sm:h-4 text-charcoal/60" strokeWidth={3} />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-semibold text-charcoal/40 tracking-wide mb-0.5">
                            Fournisseurs Asie
                          </div>
                          <div className="text-sm sm:text-base font-semibold text-charcoal/50 leading-tight line-through">
                            {item.them}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 sm:mt-12 md:mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-gold-400 via-gold-500 to-copper rounded-2xl shadow-xl">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <p className="text-sm sm:text-base md:text-lg font-bold text-white">
                Production maîtrisée au Maroc • Qualité européenne garantie
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonBanner;
