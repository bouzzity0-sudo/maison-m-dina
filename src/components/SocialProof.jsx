import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Store, Package, Star, RotateCw, Clock, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 hover:bg-white transition-all duration-500 border border-black/5 hover:border-black/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
      </div>
      <div className="text-5xl font-semibold text-gray-900 mb-3 tracking-tight">
        {value}
      </div>
      <div className="text-sm text-gray-600 font-normal leading-relaxed">
        {label}
      </div>
    </motion.div>
  );
};

const SocialProof = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: Store,
      value: '143',
      label: 'boutiques partenaires en France et Europe'
    },
    {
      icon: Package,
      value: '4 287',
      label: 'paires livrées en janvier 2025'
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'de satisfaction moyenne (94 avis boutiques)'
    },
    {
      icon: RotateCw,
      value: '73%',
      label: 'de taux de recommande (2ème commande sous 45j)'
    },
    {
      icon: Clock,
      value: '6,2j',
      label: 'de délai moyen (commande → livraison)'
    },
    {
      icon: TrendingUp,
      value: '+16,80€',
      label: 'de marge moyenne par paire revendue à 29,90€'
    },
  ];

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Apple Style */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 tracking-tight leading-tight">
            La preuve par les résultats
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 mt-6 max-w-3xl mx-auto font-normal">
            Des chiffres concrets qui témoignent de la confiance de nos partenaires et de la qualité de notre service
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* CTA Section - Apple Premium Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="bg-gray-50 rounded-3xl p-10 sm:p-16 border border-black/5">
            <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              Rejoignez ces boutiques à succès
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-normal">
              Commandez dès aujourd'hui et bénéficiez des mêmes avantages : qualité premium, marges confortables et livraison express
            </p>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300"
            >
              Calculer ma marge maintenant
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
