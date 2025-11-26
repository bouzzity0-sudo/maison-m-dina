import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X } from 'lucide-react';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Afficher après avoir scrollé 50% de la page
      const scrolled = window.pageYOffset;
      const halfPage = document.documentElement.scrollHeight / 2;

      if (scrolled > halfPage && !isDismissed) {
        setIsVisible(true);
      } else if (scrolled < halfPage) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t-2 border-amber-300 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
        >
          <div className="px-4 py-3 flex items-center gap-3">
            {/* Texte */}
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Prêt à démarrer votre commande ?</p>
              <p className="text-xs text-gray-600">Recevez votre devis en 24h</p>
            </div>

            {/* Bouton CTA */}
            <motion.button
              onClick={scrollToContact}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-black px-6 py-3 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 min-h-[48px]"
            >
              <FileText className="w-4 h-4" />
              Devis gratuit
            </motion.button>

            {/* Bouton fermer */}
            <button
              onClick={handleDismiss}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Barre de progrès animée */}
          <motion.div
            className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
