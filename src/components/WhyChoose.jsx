
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, Star, Crown, Zap, ShieldCheck } from 'lucide-react';

const ComparisonCard = ({ title, us, them, delay, icon: Icon }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, type: "spring", stiffness: 50 }}
      className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2"
    >
      {/* Premium Border Gradient on Hover */}
      <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-champagne via-transparent to-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-champagne/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-champagne/10 transition-colors duration-500" />

      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-champagne/10 rounded-2xl flex items-center justify-center text-champagne-dark mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-sm font-display font-bold uppercase tracking-wider text-noir/70 text-center">
            {title}
          </h3>
        </div>

        {/* Us (Ateliers Médina) - Highlighted */}
        <div className="mb-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-5 border border-emerald-100 group-hover:border-emerald-200 transition-colors relative overflow-hidden">
          {/* Shine Effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />

          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
              <Check size={12} strokeWidth={4} />
            </div>
            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Ateliers Médina</span>
          </div>
          <p className="text-lg font-display font-bold text-emerald-950 leading-tight">
            {us.highlight}
          </p>
        </div>

        {/* Them (Competitors) */}
        <div className="px-4 py-3 opacity-50 grayscale group-hover:grayscale-0 transition-all duration-300">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <X size={10} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Autres</span>
          </div>
          <p className="text-sm font-medium text-gray-500 line-through decoration-red-400/50 decoration-2">
            {them.highlight}
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

  const comparisons = [
    {
      icon: Crown,
      title: 'Commande Minimum',
      us: { highlight: '30 paires seulement' },
      them: { highlight: '500 paires minimum' }
    },
    {
      icon: Zap,
      title: 'Délai de Livraison',
      us: { highlight: '4-7 jours express' },
      them: { highlight: '45-60 jours d\'attente' }
    },
    {
      icon: Star,
      title: 'Choix des Tailles',
      us: { highlight: '100% Personnalisé' },
      them: { highlight: 'Tailles imposées' }
    },
    {
      icon: ShieldCheck,
      title: 'Qualité Matériaux',
      us: { highlight: 'Contrôle constant' },
      them: { highlight: 'Qualité variable' }
    }
  ];

  return (
    <section id="avantages" className="relative py-24 md:py-32 overflow-hidden bg-[#FDFBF7]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-champagne/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-emerald-900/5 rounded-full blur-[100px]" />

        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#c9a86a 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-champagne-dark font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            L'Excellence sans compromis
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-noir mb-6">
            Pourquoi choisir <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-champagne-dark to-amber-600">Ateliers Médina</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-champagne/20 -z-0 -rotate-1"></span>
            </span> ?
          </h2>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {comparisons.map((item, index) => (
            <ComparisonCard
              key={index}
              {...item}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
