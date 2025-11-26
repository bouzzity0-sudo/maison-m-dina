import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { products } from '../data/products';
import { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Award, Scissors, MapPin, Mail, Star, Sparkles, TrendingUp } from 'lucide-react';

const ProductModal = ({ product, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const imageRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  if (!product) return null;

  // Initialiser la couleur et l'image sélectionnées
  useEffect(() => {
    setImageLoaded(false);
    if (product && product.colorVariants && product.colorVariants.length > 0) {
      setSelectedColor(product.colorVariants[0]);
      setCurrentImage(product.colorVariants[0].image);
    } else {
      setCurrentImage(product.image);
    }
  }, [product]);

  const handleWhatsApp = () => {
    const colorName = selectedColor ? selectedColor.name : 'Couleur principale';
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé par : ${product.title}\nCouleur: ${colorName}\nPrix: ${product.price}`
    );
    window.open(`https://wa.me/33786350825?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const colorName = selectedColor ? selectedColor.name : 'Couleur principale';
    const subject = encodeURIComponent(`Demande de devis - ${product.title}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nJe suis intéressé par le produit suivant :\n\nProduit : ${product.title}\nCouleur : ${colorName}\nPrix : ${product.price}\n\nPouvez-vous me fournir un devis ?\n\nCordialement`
    );
    window.location.href = `mailto:contact@maisonmedina.fr?subject=${subject}&body=${body}`;
  };

  const handleColorChange = (colorVariant) => {
    setImageLoaded(false);
    setSelectedColor(colorVariant);
    setCurrentImage(colorVariant.image);
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  // Focus trap et gestion du focus
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      // Focus sur le bouton fermer à l'ouverture
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Gestion de la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Plus sombre et plus blur pour effet depth premium */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Fermer la fenêtre de détails du produit"
            className="fixed inset-0 bg-black/90 z-50 backdrop-blur-xl"
          />

          {/* Modal - Premium E-commerce Style */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 md:inset-8 lg:inset-12 z-50 bg-white md:rounded-3xl shadow-2xl flex flex-col md:flex-row border border-black/5 max-w-7xl mx-auto"
          >
            {/* Bouton Fermer - Premium Style */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              aria-label="Fermer la fenêtre de détails"
            >
              <X className="w-5 h-5 text-gray-900" aria-hidden="true" strokeWidth={2} />
            </button>

            {/* Image - Mobile: haut, Desktop: 55% - Fond blanc uni avec loader */}
            <div className="w-full md:w-[55%] bg-white flex items-center justify-center p-4 sm:p-6 md:p-8 relative md:rounded-l-3xl">
              {/* Loader pendant le chargement */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-sand-light/20">
                  <div className="w-12 h-12 border-4 border-champagne/30 border-t-champagne rounded-full animate-spin" />
                </div>
              )}

              <div
                className="relative w-full h-full flex items-center justify-center"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  ref={imageRef}
                  key={currentImage}
                  src={currentImage || product.image}
                  alt={`${product.title}${selectedColor ? ` - ${selectedColor.name}` : ''}`}
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  onClick={() => setIsZoomed(true)}
                  className={`w-full h-full object-contain max-h-[350px] sm:max-h-[450px] md:max-h-[80vh] rounded-2xl transition-all duration-300 ${isHovering ? 'cursor-zoom-in' : 'cursor-pointer'
                    } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onError={(e) => {
                    console.warn('Modal image failed to load:', currentImage || product.image);
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80&fit=crop';
                    setImageLoaded(true);
                  }}
                />

                {/* Zoom overlay - E-commerce Style (Flyout) */}
                {isHovering && imageLoaded && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="hidden lg:block absolute top-0 left-[102%] w-[500px] h-[500px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl z-[60]"
                    style={{
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url(${currentImage || product.image})`,
                        backgroundSize: '200%', // Réduit pour éviter la pixellisation
                        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                        backgroundRepeat: 'no-repeat',
                        imageRendering: 'auto', // Meilleur rendu pour les photos
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-2 text-gray-500 text-xs font-medium text-center border-t border-gray-100">
                      Zoom HD
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Zoom Overlay */}
              <AnimatePresence>
                {isZoomed && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsZoomed(false)}
                      className="fixed inset-0 bg-black/95 z-[100] cursor-zoom-out"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                      <img
                        src={currentImage || product.image}
                        alt={`${product.title} - Zoom`}
                        className="max-w-full max-h-full object-contain cursor-zoom-out pointer-events-auto"
                        onClick={() => setIsZoomed(false)}
                      />
                      <button
                        onClick={() => setIsZoomed(false)}
                        className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all pointer-events-auto"
                      >
                        <X className="w-6 h-6 text-white" />
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Détails - Premium Layout */}
            <div className="w-full md:w-[45%] p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col gap-5 md:rounded-r-3xl">
              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-block bg-gray-100 text-gray-900 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider">
                  {product.category}
                </span>
                <span className="inline-block bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-xs font-semibold">
                  En stock
                </span>
              </div>

              {/* Title */}
              <h2 id="modal-title" className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight leading-tight">
                {product.title}
              </h2>

              {/* Code */}
              <p className="text-xs text-gray-500 font-mono -mt-3">
                Réf: {product.code}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* Features - Premium Icons */}
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-200">
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <p className="text-[10px] font-medium text-gray-600 leading-tight">Cuir vegan premium</p>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <p className="text-[10px] font-medium text-gray-600 leading-tight">Finitions cousues</p>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <p className="text-[10px] font-medium text-gray-600 leading-tight">Fabriqué à Fès</p>
                </div>
              </div>

              {/* Couleurs - Premium Apple Style */}
              {product.colorVariants && product.colorVariants.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-900 mb-3">
                    Couleur
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colorVariants.map((colorVariant, index) => (
                      <button
                        key={index}
                        onClick={() => handleColorChange(colorVariant)}
                        className={`group relative flex flex-col items-center gap-1.5 transition-all duration-200 active:scale-95 md:hover:scale-105`}
                        aria-label={`Sélectionner la couleur ${colorVariant.name}`}
                      >
                        {/* Pastille de couleur - Premium */}
                        <div
                          className={`w-12 h-12 rounded-full transition-all shadow-sm ${selectedColor?.name === colorVariant.name
                              ? 'ring-3 ring-gray-900 ring-offset-2 scale-110'
                              : 'ring-1 ring-gray-200 group-hover:ring-2 group-hover:ring-gray-400'
                            }`}
                          style={{ backgroundColor: colorVariant.hexCode }}
                        >
                          {selectedColor?.name === colorVariant.name && (
                            <svg
                              className="w-full h-full text-white drop-shadow-lg p-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        {/* Nom de la couleur */}
                        <span className={`text-[10px] text-center leading-tight ${selectedColor?.name === colorVariant.name
                            ? 'text-gray-900 font-semibold'
                            : 'text-gray-600'
                          }`}>
                          {colorVariant.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tailles - Premium Apple Style */}
              <div>
                <h3 className="text-xs font-semibold text-gray-900 mb-3">
                  Tailles disponibles
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className="h-10 flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:border-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 cursor-pointer"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prix - Premium Style */}
              <div className="relative pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-900">
                    Prix B2B
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-semibold text-gray-900 tracking-tight">
                      {product.priceB2B.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-lg font-medium text-gray-500">
                      €
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-[10px] text-right">
                  Minimum 100 paires
                </p>
              </div>

              {/* Boutons Contact - Premium Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                {/* Bouton WhatsApp */}
                <button
                  onClick={handleWhatsApp}
                  aria-label="Demander un devis sur WhatsApp (ouvre dans une nouvelle fenêtre)"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md active:bg-gray-950 transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" strokeWidth={2} />
                  <span>WhatsApp</span>
                </button>

                {/* Bouton Email */}
                <button
                  onClick={handleEmail}
                  aria-label="Demander un devis par email"
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 py-3 px-4 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 active:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" strokeWidth={2} />
                  <span>Email</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProductCard = ({ product, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <>
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        onClick={() => setIsModalOpen(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.3 } }}
        className="group bg-white rounded-2xl shadow-xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden flex flex-col border-2 border-amber-200/80 hover:border-amber-400 cursor-pointer"
      >
        {/* Image Container - Ratio agrandi pour mieux voir les produits */}
        <div className="relative aspect-square overflow-hidden bg-white p-2 sm:p-3 md:p-4">
          {/* Loader pendant le chargement */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-sand-light/20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-champagne/30 border-t-champagne rounded-full"
              />
            </div>
          )}

          <motion.img
            key={currentImage}
            src={currentImage}
            alt={`${product.title} - Chaussure artisanale ${product.category.toLowerCase()} en cuir`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: imageLoaded ? 1 : 1.1, opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.08 }}
            className="w-full h-full object-contain transition-all duration-500 ease-out rounded-lg"
            onError={(e) => {
              console.warn('Image failed to load:', currentImage);
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80&fit=crop';
              setImageLoaded(true);
            }}
          />

          {/* Badges - Top right corner */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-2">
            {/* Badge catégorie */}
            <span
              className="inline-block bg-white border-2 border-gray-200 text-gray-900 px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] shadow-md"
              aria-label={`Catégorie: ${product.category}`}
            >
              {product.category}
            </span>

            {/* Badges spéciaux */}
            {product.badges?.includes('bestseller') && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  boxShadow: [
                    "0 4px 20px rgba(251, 191, 36, 0.6)",
                    "0 8px 30px rgba(251, 191, 36, 0.8)",
                    "0 4px 20px rgba(251, 191, 36, 0.6)"
                  ]
                }}
                className="inline-block bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider shadow-2xl flex items-center gap-1.5 border-2 border-amber-300"
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Bestseller</span>
              </motion.span>
            )}

            {product.badges?.includes('new') && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black tracking-wide shadow-lg flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Nouveau 2025
              </motion.span>
            )}

            {product.badges?.includes('trending') && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-block bg-gradient-to-r from-pink-400 to-rose-500 text-white px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black tracking-wide shadow-lg flex items-center gap-1"
              >
                <TrendingUp className="w-3 h-3" />
                Tendance
              </motion.span>
            )}
          </div>
        </div>

        {/* Content Container - Espacement réduit pour compacité */}
        <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col bg-white gap-2.5 sm:gap-3 md:gap-3.5">
          {/* Titre - Plus compact */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-charcoal leading-tight tracking-tight">
            {product.title}
          </h3>

          {/* Description - Plus condensée */}
          <p className="text-charcoal/60 text-xs sm:text-sm leading-snug line-clamp-2">
            {product.description}
          </p>

          {/* Pastilles de couleurs - Plus compact */}
          {product.colorVariants && product.colorVariants.length > 0 && (
            <div>
              <p className="text-[9px] text-charcoal/50 font-bold tracking-wide mb-1.5">
                {product.colorVariants.length} {product.colorVariants.length > 1 ? 'couleurs' : 'couleur'}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {product.colorVariants.map((colorVariant, index) => (
                  <motion.button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageLoaded(false);
                      setCurrentImage(colorVariant.image);
                    }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="group/color relative"
                    title={colorVariant.name}
                  >
                    <motion.div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 shadow-md cursor-pointer ring-1 transition-all ${currentImage === colorVariant.image
                          ? 'border-champagne ring-champagne'
                          : 'border-white ring-charcoal/10 group-hover/color:border-champagne group-hover/color:ring-champagne'
                        }`}
                      style={{ backgroundColor: colorVariant.hexCode }}
                      aria-label={colorVariant.name}
                      animate={currentImage === colorVariant.image ? {
                        boxShadow: [
                          "0 0 0 0 rgba(202, 138, 4, 0)",
                          "0 0 0 8px rgba(202, 138, 4, 0.1)",
                          "0 0 0 0 rgba(202, 138, 4, 0)"
                        ]
                      } : {}}
                      transition={{
                        duration: 1.5,
                        repeat: currentImage === colorVariant.image ? Infinity : 0,
                      }}
                    />
                    {/* Tooltip au survol sur desktop uniquement */}
                    <span className="hidden md:group-hover/color:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-charcoal-dark text-champagne-light text-xs rounded-lg whitespace-nowrap pointer-events-none z-10 shadow-md">
                      {colorVariant.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Prix Section - Plus compact */}
          {product.price && (
            <div className="relative pt-3 mt-auto">
              {/* Séparateur doré */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />

              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] text-charcoal/50 tracking-wide font-bold">
                  Prix
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-charcoal">
                    {product.priceB2B.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-charcoal/60">
                    € TTC
                  </span>
                </div>
              </div>
              <p className="text-charcoal/40 text-[9px] italic text-right">
                MOQ : 100 paires
              </p>
            </div>
          )}

          {/* Bouton Voir Plus - Plus compact */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            aria-label={`Voir les détails de ${product.title}`}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 hover:from-amber-500 hover:via-yellow-600 hover:to-amber-500 text-black py-2.5 sm:py-3 px-6 rounded-full font-bold text-sm shadow-lg hover:shadow-[0_10px_40px_rgba(251,191,36,0.6)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 min-h-[44px]"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">Voir les détails</span>
          </motion.button>
        </div>
      </motion.article>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

const Collections = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('TOUS');

  // Filtrer les produits selon la catégorie sélectionnée
  const filteredProducts = activeFilter === 'TOUS'
    ? products
    : products.filter(product => product.category === activeFilter);

  // Obtenir le texte d'affichage du nombre de produits
  const getProductCountText = () => {
    const count = filteredProducts.length;
    if (activeFilter === 'TOUS') {
      return `${count} produits`;
    } else if (activeFilter === 'MULES') {
      return `${count} ${count > 1 ? 'mules' : 'mule'}`;
    }
  };

  const filters = [
    { id: 'TOUS', label: 'Tous les modèles' },
    { id: 'MULES', label: 'Mules' },
  ];

  return (
    <section id="collections" className="py-16 sm:py-20 md:py-28 lg:py-36 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile optimized */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-charcoal mb-4 sm:mb-5 md:mb-6 tracking-tight">
            Nos collections
          </h2>
          <motion.div
            className="w-24 sm:w-28 md:w-32 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-400/50"
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

        {/* Filters - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12"
        >
          {/* Filter Buttons - Touch-friendly */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all duration-500 text-sm sm:text-base md:text-lg min-h-[56px] ${activeFilter === filter.id
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-black shadow-lg shadow-amber-400/50'
                    : 'bg-white text-charcoal border-2 border-amber-200/60 hover:border-amber-400 shadow-md hover:shadow-lg'
                  }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>

          {/* Product Count - Mobile optimized */}
          <motion.p
            key={activeFilter}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-charcoal/60 font-serif italic text-sm sm:text-base md:text-lg"
          >
            {getProductCountText()}
          </motion.p>
        </motion.div>

        {/* Products Grid - 3 colonnes desktop pour cards plus petites */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-10 lg:gap-12"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Collections;
