import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brown-deep via-brown-medium to-accent-rose" />

      {/* Moroccan Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern id="moroccan" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="2" fill="white" />
            <path d="M40,20 L50,30 L40,40 L30,30 Z" fill="white" />
            <path d="M40,40 L50,50 L40,60 L30,50 Z" fill="white" />
            <path d="M20,40 L30,50 L40,40 L30,30 Z" fill="white" />
            <path d="M40,40 L50,30 L60,40 L50,50 Z" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#moroccan)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-6 px-2"
          >
            Rejoignez l'Aventure Médina
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-4"
          >
            Offrez à vos clients l'excellence de l'artisanat marocain authentique
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full sm:w-auto max-w-md sm:max-w-none mx-auto px-4 sm:px-0"
          >
            <motion.button
              onClick={() => scrollToSection('#contact')}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 hover:from-amber-500 hover:via-yellow-600 hover:to-amber-500 text-black px-6 sm:px-8 py-4 rounded-full text-base sm:text-lg font-bold shadow-lg shadow-amber-400/50 hover:shadow-[0_10px_40px_rgba(251,191,36,0.6)] transition-all duration-300 flex items-center justify-center gap-2 min-h-[56px] w-full sm:w-auto"
            >
              <ShoppingBag className="w-5 h-5" />
              Commander Maintenant
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('#collections')}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/80 text-white px-6 sm:px-8 py-4 rounded-full text-base sm:text-lg font-bold hover:bg-white/20 hover:border-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 min-h-[56px] w-full sm:w-auto"
            >
              Voir les Collections
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements - Hidden on mobile for performance */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="hidden md:block absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 1,
        }}
        className="hidden md:block absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
      />
    </section>
  );
};

export default CTA;
