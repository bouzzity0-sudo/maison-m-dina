import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, CheckCircle } from 'lucide-react';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      id: 1,
      name: "Laurent",
      company: "Boutique Partenaire - Aix-en-Provence",
      text: "3ème commande en 2 mois ! Le modèle MM-SAB-002 en noir part en 10 jours chrono. Mes clientes adorent le rapport qualité-prix. Marge de 18€/paire, je recommande les yeux fermés.",
      initials: "L",
      color: "#C67C4E",
      date: "Il y a 2 semaines",
      verified: true
    },
    {
      id: 2,
      name: "Sophie",
      company: "Concept Store - Lyon 6ème",
      text: "Enfin un fournisseur qui comprend ! Les lots personnalisés par taille changent tout. Fini le stock mort de 36-37. Le camel et le beige nude s'arrachent. Livraison en 5 jours pile.",
      initials: "S",
      color: "#2C2C2C",
      date: "Il y a 1 mois",
      verified: true
    },
    {
      id: 3,
      name: "David",
      company: "Chaussures & Accessoires - Bordeaux",
      text: "Qualité bluffante pour le prix. Les finitions cousues tiennent la route face à mes fournisseurs à 25€. Le modèle compensé (MM-SAB-004) fait un carton en ce moment. Service réactif sur WhatsApp.",
      initials: "D",
      color: "#C67C4E",
      date: "Il y a 3 semaines",
      verified: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4 px-2">
            Témoignages Clients
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Découvrez ce que nos partenaires B2B pensent de nos chaussures artisanales
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg active:shadow-xl md:hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="text-5xl sm:text-6xl text-[#C67C4E] opacity-20 leading-none mb-3 sm:mb-4">
                "
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-base sm:text-lg mb-5 sm:mb-6 italic leading-relaxed">
                {testimonial.text}
              </p>

              {/* Stars + Verified Badge */}
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-[#C67C4E] text-[#C67C4E]"
                    />
                  ))}
                </div>
                {testimonial.verified && (
                  <div className="flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                    <CheckCircle className="w-4 h-4" fill="currentColor" />
                    <span>Achat vérifié</span>
                  </div>
                )}
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-gray-100">
                {/* Avatar with Initials */}
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0"
                  style={{ backgroundColor: testimonial.color }}
                >
                  {testimonial.initials}
                </div>

                {/* Name & Company */}
                <div className="flex-1">
                  <h4 className="font-semibold text-[#2C2C2C] text-base sm:text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {testimonial.company}
                  </p>
                  {testimonial.date && (
                    <p className="text-gray-400 text-xs mt-1">
                      {testimonial.date}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
