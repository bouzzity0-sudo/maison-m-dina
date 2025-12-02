import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const Heritage = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={sectionRef} id="heritage" className="relative py-12 md:py-20 lg:py-32 bg-gray-50 overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-champagne/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image - En premier sur mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="relative order-1 lg:order-1"
          >
            <div className="aspect-square rounded-lg overflow-hidden shadow-premium md:shadow-lg">
              <img
                src="/images/Images de marketing/tannerie.jpg"
                alt="Artisan de Fès au travail - Fabrication chaussures artisanales marocaines"
                loading="lazy"
                className="w-full h-full object-cover md:hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  console.warn('Heritage image failed to load');
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1608434780243-869e0c4a50e3?w=800&q=80&fit=crop';
                }}
              />
            </div>
            {/* Decorative Element - Caché sur mobile */}
            <div className="hidden md:block absolute -bottom-6 -right-6 w-32 h-32 bg-accent-rose/20 rounded-full blur-3xl" />
          </motion.div>

          {/* Content - En second sur mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-2"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block mb-4 md:mb-6"
            >
              <span className="bg-accent-rose/10 text-accent-rose px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide border border-black/5">
                Un savoir-faire authentique et fiable
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
            >
              Artisanat marocain de Fès
              <span className="block bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 bg-clip-text text-transparent mt-1 md:mt-2">Savoir-faire traditionnel</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6 text-charcoal/80 text-sm md:text-base leading-relaxed"
            >
              <p>
                Notre atelier familial perpétue un savoir-faire artisanal transmis sur plusieurs générations.
                Nous avons fait le choix audacieux d'allier cette tradition à des matériaux modernes et éthiques.
              </p>

              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Notre engagement qualité :</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Sélection rigoureuse des matériaux vegans premium</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Fabrication artisanale avec finitions cousues main</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Conception orientée confort (semelles ergonomiques)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Pourquoi nos mules sont différentes :</h4>
                <p>
                  Contrairement aux productions industrielles, nous créons des chaussures artisanales pensées pour séduire votre clientèle et vous garantir des marges confortables.
                  <br />
                  <span className="font-bold text-gray-900">Confort réel • 12 couleurs • Fabrication maîtrisée • Matériaux durables</span>
                </p>
              </div>
            </motion.div>

            {/* Decorative Border */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-6 md:mt-8 h-1 w-20 md:w-24 bg-gradient-to-r from-accent-rose to-accent-cuivre origin-left"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Heritage;
