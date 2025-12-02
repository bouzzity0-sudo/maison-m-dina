import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, Package, Clock, CreditCard, Shield, Truck, RefreshCw } from 'lucide-react';

const FAQItem = ({ question, answer, icon: Icon, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors duration-200 group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center text-white shadow-md">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
            {question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-6 h-6 text-amber-500" strokeWidth={2.5} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-5 sm:pb-6 pl-16 sm:pl-20">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqData = [
    {
      icon: Package,
      question: "Quelle est la quantité minimum de commande ?",
      answer: "Nous acceptons les commandes à partir de 100 paires. Vous pouvez panacher les modèles, les couleurs et les tailles comme vous le souhaitez pour atteindre ce minimum. C'est idéal pour tester notre qualité sans gros risque."
    },
    {
      icon: CreditCard,
      question: "Pourquoi 13,50€ alors que je trouve des mules à 8€ ailleurs ?",
      answer: "La différence est radicale : à 8€, vous achetez souvent du carton pâte et du simili bas de gamme qui craque en 2 semaines. Nos mules sont en cuir vegan premium, avec semelle ergonomique et finitions cousues main. Vos clientes reviendront pour la qualité et le confort durable, pas pour le prix le plus bas."
    },
    {
      icon: Clock,
      question: "Quels sont les délais de livraison ?",
      answer: "Comptez 14 jours ouvrés pour la fabrication et la livraison. C'est le temps nécessaire pour garantir une qualité artisanale irréprochable sur chaque paire. Nous ne stockons pas, nous fabriquons à la demande pour vous."
    },
    {
      icon: Shield,
      question: "Puis-je commander un échantillon ?",
      answer: "Oui, nous encourageons vivement la commande d'échantillons pour valider la qualité. Contactez-nous sur WhatsApp pour recevoir votre paire de test."
    },
    {
      icon: Truck,
      question: "Livrez-vous partout en Europe ?",
      answer: "Oui, nous livrons en France, Belgique, Suisse, Espagne et dans toute l'Europe. Les frais de port sont calculés au plus juste selon le poids de votre commande."
    },
    {
      icon: RefreshCw,
      question: "Comment se passe le réassort ?",
      answer: "Le réassort est très simple et rapide. Une fois client, vous pouvez recommander par petites quantités (min 30 paires) pour compléter vos stocks sur les couleurs qui marchent le mieux."
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider shadow-lg">
              Questions fréquentes B2B
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
            Tout ce que vous devez savoir
          </h2>

          <motion.div
            className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-400/50"
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

          <p className="text-base sm:text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Réponses claires aux questions essentielles pour démarrer votre partenariat en toute confiance
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4 sm:space-y-5">
          {faqData.map((item, index) => (
            <FAQItem key={index} {...item} index={index} />
          ))}
        </div>

        {/* CTA après FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-base sm:text-lg text-gray-700 mb-6">
            Vous avez d'autres questions ? Notre équipe est là pour vous répondre
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 hover:from-amber-500 hover:via-yellow-600 hover:to-amber-500 text-black px-8 py-4 rounded-full text-base sm:text-lg font-bold shadow-lg shadow-amber-400/40 hover:shadow-[0_10px_40px_rgba(251,191,36,0.6)] transition-all duration-300"
          >
            Contactez-nous maintenant
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
