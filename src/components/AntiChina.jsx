import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { XCircle, CheckCircle, Clock, Package, AlertTriangle, Shield } from 'lucide-react';

const AntiChina = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const problems = [
    { 
      icon: XCircle, 
      text: "MOQ impossible : 500-1000 paires", 
      color: "text-red-600",
      bg: "bg-red-50"
    },
    { 
      icon: Clock, 
      text: "Délais de 45-60 jours", 
      color: "text-red-600",
      bg: "bg-red-50"
    },
    { 
      icon: AlertTriangle, 
      text: "Tailles chinoises inadaptées", 
      color: "text-red-600",
      bg: "bg-red-50"
    },
    { 
      icon: Package, 
      text: "Qualité aléatoire", 
      color: "text-red-600",
      bg: "bg-red-50"
    },
  ];

  const solutions = [
    { 
      icon: CheckCircle, 
      text: "12 paires minimum seulement", 
      color: "text-green-600",
      bg: "bg-green-50",
      highlight: "12 PAIRES"
    },
    { 
      icon: Clock, 
      text: "Livraison 4-7 jours", 
      color: "text-green-600",
      bg: "bg-green-50",
      highlight: "4-7 JOURS"
    },
    { 
      icon: Shield, 
      text: "Tailles européennes 36-41", 
      color: "text-green-600",
      bg: "bg-green-50",
      highlight: "TAILLES EU"
    },
    { 
      icon: CheckCircle, 
      text: "Qualité artisanale contrôlée", 
      color: "text-green-600",
      bg: "bg-green-50",
      highlight: "PREMIUM"
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal overflow-hidden relative">
      {/* Pattern de fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Titre choc */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6">
            STOP aux Galères
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent mt-2">
              des Fournisseurs Chinois
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-medium">
            Vous en avez marre des délais interminables, des MOQ astronomiques et des tailles inadaptées ?
          </p>
        </motion.div>

        {/* Grille Comparaison */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* PROBLÈMES - Chine */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-red-500/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-red-500">
                Fournisseurs Chinois
              </h3>
            </div>

            <div className="space-y-4">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={`flex items-start gap-3 p-3 rounded-lg ${problem.bg}`}
                >
                  <problem.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${problem.color}`} strokeWidth={2.5} />
                  <p className="text-white/90 font-medium text-sm md:text-base">
                    {problem.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-red-500/20">
              <p className="text-red-400 font-bold text-center text-lg">
                = Stock bloqué + Trésorerie asphyxiée
              </p>
            </div>
          </motion.div>

          {/* SOLUTIONS - Maison Médina */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-green-600/20 to-gold-500/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-green-500 relative overflow-hidden"
          >
            {/* Badge "SOLUTION" */}
            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg">
              Solution
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-green-400">
                Maison Médina
              </h3>
            </div>

            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={`flex items-start gap-3 p-3 rounded-lg ${solution.bg} border border-green-500/30`}
                >
                  <solution.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${solution.color}`} strokeWidth={2.5} />
                  <p className="text-white font-medium text-sm md:text-base">
                    {solution.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-green-500/20">
              <p className="text-green-400 font-bold text-center text-lg">
                = Flexibilité + Rentabilité immédiate
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="bg-gradient-to-r from-gold-400 via-gold-500 to-copper p-6 md:p-8 rounded-2xl max-w-4xl mx-auto shadow-2xl">
            <p className="text-2xl md:text-3xl font-black text-white mb-4 flex items-center justify-center gap-3">
              <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Testez SANS RISQUE avec 12 paires
            </p>
            <p className="text-white/90 text-lg mb-6">
              Pas besoin d'immobiliser 10 000€ pour tester un produit. 
              <br className="hidden md:block" />
              Commencez petit, vendez vite, recommandez !
            </p>
            <button
              onClick={() => document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-charcoal px-8 md:px-12 py-4 md:py-5 rounded-xl font-black text-lg md:text-xl hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Découvrir nos modèles →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AntiChina;
