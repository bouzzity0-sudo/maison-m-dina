import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Lock, RotateCcw, CreditCard } from 'lucide-react';

const BadgeCard = ({ icon: Icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-tight">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const TrustBadges = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const badges = [
    {
      icon: Shield,
      title: 'Garantie Satisfait ou Remboursé',
      description: '30 jours pour tester sans risque',
    },
    {
      icon: Lock,
      title: 'Paiement 100% Sécurisé',
      description: 'CB, Virement, PayPal Business',
    },
    {
      icon: RotateCcw,
      title: 'Stock Permanent',
      description: 'Réassort garanti sous 4-7 jours',
    },
    {
      icon: CreditCard,
      title: 'Paiement Flexible',
      description: 'Conditions à 30j pour partenaires',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-2">
            Achetez en toute confiance
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Votre satisfaction est notre priorité
          </p>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge, index) => (
            <BadgeCard
              key={index}
              {...badge}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 flex flex-wrap justify-center items-center gap-6 sm:gap-8"
        >
          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">+250 boutiques satisfaites</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Livraison express Europe</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Service client réactif</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
