import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Store, MapPin, Shield, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const TrustedBy = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [count, setCount] = useState(125);

  // Animation du compteur
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 143) {
            clearInterval(interval);
            return 143;
          }
          return newCount;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [inView]);

  const cities = [
    { name: 'Paris', x: '48%', y: '24%' },
    { name: 'Lyon', x: '52%', y: '45%' },
    { name: 'Marseille', x: '54%', y: '76%' },
    { name: 'Bordeaux', x: '18%', y: '55%' },
    { name: 'Toulouse', x: '28%', y: '68%' },
    { name: 'Nice', x: '72%', y: '68%' },
    { name: 'Nantes', x: '14%', y: '35%' },
    { name: 'Lille', x: '42%', y: '8%' },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider shadow-lg mb-6"
          >
            <Shield className="w-4 h-4" />
            Fournisseur approuvé 2025
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
            Ils nous font confiance
          </h2>

          {/* Compteur dynamique */}
          <motion.div
            className="inline-block"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl px-8 sm:px-12 py-6 sm:py-8 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center">
                  <Store className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <div className="text-left">
                  <motion.div
                    className="text-5xl sm:text-6xl font-semibold text-gray-900"
                    key={count}
                  >
                    {count}
                  </motion.div>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">
                    boutiques partenaires
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Depuis janvier 2025 en France et Europe
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-3xl font-semibold text-gray-900">73%</div>
                <p className="text-sm text-gray-600">de réassort sous 45j</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center">
                <Store className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-3xl font-semibold text-gray-900">4.9/5</div>
                <p className="text-sm text-gray-600">satisfaction moyenne</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-3xl font-semibold text-gray-900">6,2j</div>
                <p className="text-sm text-gray-600">délai moyen livraison</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mini Map France */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-3xl mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-8">
            Nos boutiques partenaires en France
          </h3>

          {/* Simple France representation */}
          <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl border-2 border-gray-300 overflow-hidden">
            {/* France outline simplified */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <svg viewBox="0 0 200 250" className="w-full h-full">
                <path d="M 100,20 L 150,60 L 180,120 L 170,180 L 140,220 L 80,230 L 40,200 L 30,140 L 50,80 Z"
                      fill="currentColor"
                      className="text-blue-200" />
              </svg>
            </div>

            {/* City markers */}
            {cities.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="absolute"
                style={{ left: city.x, top: city.y, transform: 'translate(-50%, -50%)' }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                  className="relative"
                >
                  {/* Pulse effect */}
                  <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75" />
                  {/* Marker */}
                  <div className="relative w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg" />
                </motion.div>
                {/* City name */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow-md">
                    {city.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Distribution dans toute la France • Expansion en cours en Belgique, Suisse et Espagne
          </p>
        </motion.div>

        {/* Boutique names (generic) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 mb-4">Nos boutiques partenaires</p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
            {['Chaussures Élégance', 'Boutique Bohème', 'Shoes and Co', 'Style Urbain', 'Mode et Tendances', 'Concept Store'].map((name, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                className="text-gray-400 font-semibold text-sm sm:text-base px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;
