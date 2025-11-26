import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Instagram, ExternalLink } from 'lucide-react';

const InstagramGallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Photos de la galerie Instagram
  const galleryImages = [
    {
      id: 1,
      src: '/images/products/Modele.simple.boucle/MM-SAB-001-camel.jpg',
      alt: 'Sabot Boucle Classique Camel - En boutique',
      likes: '127',
    },
    {
      id: 2,
      src: '/images/products/modele.strass/MM-SAB-002-noir.jpg',
      alt: 'Sabot Perforé Strass Noir - Collection premium',
      likes: '203',
    },
    {
      id: 3,
      src: '/images/products/Modele 4/rose.jpg',
      alt: 'Sabot Minimaliste Rose - Tendance 2025',
      likes: '156',
    },
    {
      id: 4,
      src: '/images/products/modele.strass/MM-SAB-002-bordeaux.jpg',
      alt: 'Sabot Strass Bordeaux - Style élégant',
      likes: '189',
    },
    {
      id: 5,
      src: '/images/products/modele.strass/MM-SAB-002-bleu.jpg',
      alt: 'Sabot Strass Bleu Jean - Chic et confortable',
      likes: '142',
    },
    {
      id: 6,
      src: '/images/products/Modele 4/turquoise.jpg',
      alt: 'Sabot Minimaliste Turquoise - Couleur vive',
      likes: '178',
    },
  ];

  return (
    <section id="instagram" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider shadow-lg mb-4"
          >
            <Instagram className="w-4 h-4" />
            Rejoignez notre communauté
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
            Nos produits chez nos partenaires
          </h2>

          <motion.div
            className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mx-auto rounded-full shadow-lg"
            animate={{
              boxShadow: [
                '0 4px 20px rgba(236, 72, 153, 0.5)',
                '0 4px 30px rgba(236, 72, 153, 0.8)',
                '0 4px 20px rgba(236, 72, 153, 0.5)',
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <p className="text-base sm:text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Découvrez comment nos boutiques partenaires mettent en valeur nos collections artisanales
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-contain bg-white transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  console.warn('Instagram gallery image failed to load:', image.src);
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80&fit=crop';
                }}
              />

              {/* Overlay doré au hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <p className="text-xs sm:text-sm font-semibold mb-2 line-clamp-2">
                    {image.alt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-current" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                      <span className="text-xs sm:text-sm font-bold">{image.likes}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>

              {/* Badge Instagram icon */}
              <div className="absolute top-3 right-3 bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                <Instagram className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-base sm:text-lg text-gray-700 mb-6">
            Suivez-nous pour découvrir nos nouveautés et inspirations quotidiennes
          </p>
          <motion.a
            href="https://instagram.com/ateliersmedina.fr"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full text-base sm:text-lg font-bold shadow-lg shadow-pink-400/40 hover:shadow-[0_10px_40px_rgba(236,72,153,0.6)] transition-all duration-300"
          >
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            Suivez @ateliersmedina.fr
          </motion.a>

          <p className="text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">500+ professionnels</span> nous font déjà confiance
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramGallery;
