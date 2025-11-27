import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Shield } from 'lucide-react';
import CountUp from 'react-countup';

const TrustedBy = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cities = [
    { name: 'Paris', top: '24%', left: '48%' },
    { name: 'Lyon', top: '45%', left: '52%' },
    { name: 'Marseille', top: '76%', left: '54%' },
    { name: 'Bordeaux', top: '55%', left: '18%' },
    { name: 'Toulouse', top: '68%', left: '28%' },
    { name: 'Nice', top: '68%', left: '72%' },
    { name: 'Nantes', top: '35%', left: '14%' },
    { name: 'Lille', top: '8%', left: '42%' },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-sable-light relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-champagne/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sable-dark/20 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Map & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Map Container */}
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
              {/* Map Background (Stylized France) */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M20,80 Q50,10 80,80" stroke="#C9A85C" strokeWidth="0.5" fill="none" />
                  <path d="M10,50 Q50,50 90,50" stroke="#C9A85C" strokeWidth="0.5" fill="none" />
                  {/* Grid pattern */}
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#000" strokeWidth="0.5" opacity="0.1" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>

              {/* Cities */}
              {cities.map((city, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{ top: city.top, left: city.left }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                >
                  <div className="relative group cursor-pointer">
                    <div className="absolute -inset-2 bg-champagne/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-3 h-3 bg-champagne rounded-full border border-white shadow-sm" />

                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-white text-noir text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap border border-gray-100">
                        {city.name}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100 max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-champagne/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-champagne-dark" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-noir">150+</p>
                  <p className="text-xs text-gray-500 font-medium">Partenaires</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-champagne"
                  initial={{ width: 0 }}
                  animate={inView ? { width: "85%" } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-champagne/10 text-champagne-dark px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider mb-6 border border-champagne/20"
            >
              <Shield className="w-4 h-4" />
              PARTENAIRE DE CONFIANCE
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-noir mb-6">
              Ils font confiance à <br />
              <span className="text-champagne-dark">Maison Médina</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              De Paris à Marseille, les plus belles boutiques et pharmacies de France ont choisi l'excellence de nos sabots médicaux. Rejoignez un réseau d'élite qui privilégie la qualité et le confort.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-3xl font-display font-bold text-noir mb-1">
                  <CountUp end={98} duration={2.5} suffix="%" />
                </p>
                <p className="text-sm text-gray-500">Taux de satisfaction</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-3xl font-display font-bold text-noir mb-1">
                  <CountUp end={48} duration={2.5} suffix="h" />
                </p>
                <p className="text-sm text-gray-500">Expédition moyenne</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {['Pharmacies', 'Concept Stores', 'Boutiques Mode', 'Instituts'].map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 font-medium shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
