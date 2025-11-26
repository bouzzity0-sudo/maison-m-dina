import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Eye, FileText, Sparkles } from 'lucide-react';
import { useState } from 'react';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 150]);
  const y2 = useTransform(scrollY, [0, 800], [0, -50]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      }
    }
  };

  const uspVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.6,
      }
    }
  };

  const uspItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.9 + (i * 0.1),
      }
    })
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-9"
      onMouseMove={handleMouseMove}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Artisanat marocain architecture"
          className="w-full h-full object-cover brightness-[0.5] saturate-[1.05]"
          onError={(e) => {
            console.warn('Hero background image failed to load');
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop';
          }}
        />
        {/* Overlay dégradé plus sombre pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/40 to-noir/80" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Accent visuel - Bande dorée en haut */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
      </div>

      {/* Floating Particles */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles
              className="text-champagne"
              size={10 + Math.random() * 6}
              strokeWidth={1.5}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Content - Mobile optimized */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24 md:py-40 lg:py-56">
        <motion.div
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={titleVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-medium text-white mb-4 sm:mb-6 tracking-tight leading-tight drop-shadow-2xl"
          >
            L'Excellence de l'Artisanat
            <motion.span
              variants={subtitleVariants}
              className="block text-gradient-gold mt-2 sm:mt-4 font-serif italic"
            >
              Marocain
            </motion.span>
          </motion.h1>

          <motion.p
            variants={subtitleVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 font-light max-w-3xl mx-auto leading-relaxed px-4 font-sans drop-shadow-md"
          >
            Fournisseur B2B de mules et sabots en cuir véritable.
            <span className="block mt-2 text-white/80 text-sm sm:text-base">Alliant tradition séculaire et design contemporain.</span>
          </motion.p>

          {/* Badge de confiance + Prix */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10 sm:mb-14"
          >
            {/* Badge confiance - Glassmorphism plus opaque */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 group transition-all duration-300 hover:bg-black/50"
            >
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 font-sans font-medium text-sm tracking-wide group-hover:text-white transition-colors">
                Partenaire de 500+ boutiques
              </span>
            </motion.div>

            {/* Prix - Nouveau Design Épuré */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-baseline gap-3 text-white drop-shadow-lg"
            >
              <span className="text-xs font-sans uppercase tracking-widest text-white/70 font-medium">Dès</span>
              <span className="text-5xl sm:text-6xl font-sans font-bold text-champagne tracking-tight">13,49€</span>
              <span className="text-xs font-sans uppercase tracking-widest text-white/70 font-medium">HT</span>
            </motion.div>
          </motion.div>

          {/* USP Line - Better visibility with background */}
          <motion.div
            variants={uspVariants}
            className="mb-10 sm:mb-16 inline-flex flex-wrap justify-center items-center gap-6 sm:gap-10 bg-black/20 backdrop-blur-sm py-4 px-8 rounded-full border border-white/5"
          >
            <motion.div variants={uspItemVariants} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-champagne rounded-full" />
              <span className="text-xs sm:text-sm font-sans font-bold text-white tracking-widest uppercase shadow-black drop-shadow-md">Fait Main à Fès</span>
            </motion.div>
            <motion.div variants={uspItemVariants} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-champagne rounded-full" />
              <span className="text-xs sm:text-sm font-sans font-bold text-white tracking-widest uppercase shadow-black drop-shadow-md">Cuir Véritable</span>
            </motion.div>
            <motion.div variants={uspItemVariants} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-champagne rounded-full" />
              <span className="text-xs sm:text-sm font-sans font-bold text-white tracking-widest uppercase shadow-black drop-shadow-md">Livraison Europe</span>
            </motion.div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto w-full px-4">
            <motion.button
              custom={0}
              variants={buttonVariants}
              onClick={() => scrollToSection('#collections')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-champagne text-noir px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:bg-champagne-light w-full sm:w-auto min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Voir la Collection
                <Eye className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>

            <motion.button
              custom={1}
              variants={buttonVariants}
              onClick={() => scrollToSection('#calculateur')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-transparent border border-white/20 text-white px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/5 w-full sm:w-auto min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Calculer ma Marge
                <FileText className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
              </span>
            </motion.button>

            <motion.button
              custom={2}
              variants={buttonVariants}
              onClick={() => scrollToSection('#contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/20 w-full sm:w-auto min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Demander un devis
                <FileText className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/30 hover:text-champagne transition-colors cursor-pointer"
            onClick={() => scrollToSection('#collections')}
          >
            <ArrowDown className="w-5 h-5 mx-auto" strokeWidth={1} />
            <span className="text-[10px] uppercase tracking-widest mt-1 block">Découvrir</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
