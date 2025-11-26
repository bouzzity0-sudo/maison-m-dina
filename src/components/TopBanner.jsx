import { Sparkles, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TopBanner = () => {
  // Compte à rebours jusqu'à fin février
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date('2025-02-28T23:59:59');
      const now = new Date();
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        return `${days} jours`;
      }
      return 'Terminé';
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Elegant premium banner */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg overflow-hidden border-b border-amber-400/20"
      >
        {/* Subtle shimmer effect */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent"
        />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 py-2.5 sm:py-2">
            {/* Icon + Offre */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" fill="currentColor" />
              </motion.div>

              <div className="text-center sm:text-left">
                <span className="text-xs sm:text-sm md:text-base font-bold tracking-wide text-white/90">
                  OFFRE EXCLUSIVE : -5% sur votre 1ère commande avec{' '}
                  <span className="inline-block bg-amber-400 px-2.5 py-0.5 rounded text-gray-900 font-black border border-amber-300">
                    FIRST5
                  </span>
                </span>
              </div>
            </div>

            {/* Separator - hidden on mobile */}
            <div className="hidden sm:block w-px h-4 bg-white/20" />

            {/* Compte à rebours */}
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="text-xs sm:text-sm font-semibold text-white/90">
                Plus que {timeLeft}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Thin gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />
    </div>
  );
};

export default TopBanner;
