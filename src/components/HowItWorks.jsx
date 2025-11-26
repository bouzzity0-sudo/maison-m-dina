import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calculator, Mail, CreditCard, Truck, TrendingUp } from 'lucide-react';

const StepCard = ({ number, icon: Icon, title, description, timing, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      {/* Step number badge */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg z-10">
        <span className="text-2xl font-black text-white">{number}</span>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border-2 border-gray-100 hover:border-amber-200 h-full">
        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-amber-600" strokeWidth={2} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4">
          {description}
        </p>

        {/* Timing badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {timing}
        </div>
      </div>

      {/* Arrow (hidden on last item) */}
      {number < 5 && (
        <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2 z-0">
          <svg className="w-16 h-16 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      number: 1,
      icon: Calculator,
      title: 'Calculez votre commande',
      description: 'Utilisez notre calculateur en ligne ou contactez-nous directement par WhatsApp pour composer votre lot personnalisé.',
      timing: '5 minutes'
    },
    {
      number: 2,
      icon: Mail,
      title: 'Recevez votre devis',
      description: 'Nous vous envoyons un devis détaillé avec prix dégressifs, frais de port et récapitulatif complet par email.',
      timing: 'Sous 2h'
    },
    {
      number: 3,
      icon: CreditCard,
      title: 'Validez et Payez',
      description: 'Choisissez votre mode de paiement: virement bancaire, carte bancaire ou PayPal Business. Paiement 100% sécurisé.',
      timing: 'Instantané'
    },
    {
      number: 4,
      icon: Truck,
      title: 'Production et Expédition',
      description: 'Votre commande est préparée avec soin et expédiée en express. Vous recevez un numéro de tracking pour suivre votre colis.',
      timing: '4-7 jours'
    },
    {
      number: 5,
      icon: TrendingUp,
      title: 'Recevez et Vendez',
      description: 'Vous recevez vos mules prêtes à vendre, vous les proposez à vos clients et réalisez votre marge de +120%.',
      timing: 'Immédiat'
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg">
              Processus simple et rapide
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
            Comment ça marche ?
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

          <p className="text-base sm:text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
            De la commande à la livraison, tout est pensé pour vous faire gagner du temps et maximiser vos marges
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 mb-12">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              {...step}
              delay={index * 0.15}
            />
          ))}
        </div>

        {/* CTA Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl p-8 sm:p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Prêt à démarrer votre première commande ?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Du devis à la livraison en moins de 10 jours • Garantie satisfait ou remboursé 30 jours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#calculateur"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#calculateur')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-amber-600 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calculator className="w-5 h-5" />
              Utiliser le calculateur
            </motion.a>
            <motion.a
              href="https://wa.me/33786350825?text=Bonjour, je souhaite passer une commande"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-black/30 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contacter sur WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
