import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Palette, Layers, Package, Zap, TrendingDown } from 'lucide-react';

const AdvantageCard = ({ icon: Icon, title, description, delay, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="p-6 sm:p-8 rounded-2xl border-l-4 border-amber-400 bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-rose to-accent-cuivre rounded-lg flex items-center justify-center text-white">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-display font-semibold text-charcoal mb-2 sm:mb-3">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const WhyChoose = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const advantages = [
    {
      icon: Sparkles,
      title: 'Matériaux de qualité',
      description: 'Matériaux sélectionnés de haute qualité aux finitions cousues impeccables. Produits résistants et durables, loin du fast fashion.',
    },
    {
      icon: Palette,
      title: 'Flexibilité unique',
      description: 'Notre atelier à Fès vous offre une production sur-mesure adaptée à vos besoins avec un large choix de finitions et de couleurs.',
    },
    {
      icon: Layers,
      title: 'Large choix',
      description: 'Ateliers créatifs offrant une diversité exceptionnelle de modèles et de couleurs pour satisfaire tous vos clients.',
    },
    {
      icon: Package,
      title: 'Commandes sur-mesure',
      description: 'Les tailles 36-37 qui ne se vendent pas ? C\'est fini ! Constituez vos lots de 12 paires avec les tailles qui vous intéressent.',
    },
    {
      icon: Zap,
      title: 'Délais ultra-courts',
      description: 'Approvisionnement maîtrisé : livraison en 4 à 7 jours selon les quantités. Réassort rapide et fiable.',
    },
    {
      icon: TrendingDown,
      title: 'Prix compétitifs',
      description: 'Tarifs ultra-compétitifs permettant des marges confortables tout en proposant un excellent rapport qualité-prix.',
    },
  ];

  return (
    <section id="avantages" className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 md:mb-16 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
            Pourquoi choisir Maison Médina ?
          </h2>
          <motion.div
            className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-400/50"
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

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <AdvantageCard
              key={index}
              {...advantage}
              index={index}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
