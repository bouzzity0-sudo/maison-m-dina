import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const Counter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;

      const timer = setInterval(() => {
        start += Math.ceil(end / (duration * 60));
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

const StatCard = ({ title, subtitle, value, unit, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const isNumeric = !isNaN(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border-2 border-gray-100 transition-all duration-500 overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-champagne/5 to-accent-cuivre/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={inView ? {
          background: [
            "linear-gradient(135deg, rgba(202,138,4,0.05) 0%, rgba(150,75,0,0.05) 100%)",
            "linear-gradient(225deg, rgba(202,138,4,0.05) 0%, rgba(150,75,0,0.05) 100%)",
            "linear-gradient(135deg, rgba(202,138,4,0.05) 0%, rgba(150,75,0,0.05) 100%)"
          ]
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative z-10">
        <motion.h3
          className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold bg-gradient-to-r from-accent-rose to-accent-cuivre bg-clip-text text-transparent mb-2 text-center"
          animate={inView ? {
            backgroundPosition: ['0%', '100%', '0%'],
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ backgroundSize: '200% 200%' }}
        >
          {isNumeric ? (
            <>
              <Counter value={value} />
              {unit}
            </>
          ) : (
            title
          )}
        </motion.h3>
        <p className="text-sm sm:text-base text-charcoal/70 text-center font-medium">{subtitle}</p>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-champagne to-accent-cuivre"
        initial={{ width: 0 }}
        animate={inView ? { width: '100%' } : {}}
        transition={{ duration: 1, delay: delay + 0.3 }}
      />
    </motion.div>
  );
};

const KeyStats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      title: 'Fès',
      subtitle: 'Capitale artisanale',
      value: null,
    },
    {
      value: '143',
      unit: ' boutiques',
      subtitle: 'Partenaires en Europe',
    },
    {
      value: '6',
      unit: ',2j livraison',
      subtitle: 'Commande à réception',
    },
    {
      value: '4.9',
      unit: '/5',
      subtitle: 'Satisfaction moyenne',
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl"
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"
        animate={{
          y: [0, -50, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
            Maison Médina en chiffres
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Votre partenaire fournisseur de confiance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              subtitle={stat.subtitle}
              value={stat.value}
              unit={stat.unit}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyStats;
