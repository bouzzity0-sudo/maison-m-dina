import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Collections', href: '#collections' },
    { name: 'Savoir-faire', href: '#heritage' },
    { name: 'Avantages', href: '#avantages' },
    { name: 'Tarifs', href: '#tarifs' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        aria-label="Menu principal"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, '#hero')}
              aria-label="Maison Médina - Accueil"
              className={`text-xl md:text-2xl lg:text-3xl font-display font-medium tracking-wide transition-colors duration-300 ${isScrolled ? 'text-noir' : 'text-white drop-shadow-md'
                }`}
            >
              MAISON MÉDINA
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`font-sans text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:text-champagne ${isScrolled
                    ? 'text-gray-600'
                    : 'text-white/90 hover:text-white drop-shadow-sm'
                    }`}
                >
                  {link.name}
                </a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                aria-label="Demander un devis"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-sm font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg flex items-center gap-2 ${isScrolled
                  ? 'bg-noir text-white hover:bg-gray-800'
                  : 'bg-white text-noir hover:bg-gray-100'
                  }`}
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                Demander un devis
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              whileTap={{ scale: 0.95 }}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${isScrolled ? 'text-noir' : 'text-white'
                }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-sable-light"
          >
            <div className="flex flex-col h-full pt-28 pb-10 px-8">
              <nav className="flex-1 flex flex-col justify-center space-y-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-4xl font-display font-light text-noir hover:text-champagne transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full bg-noir text-white px-6 py-5 rounded-sm font-bold text-sm tracking-widest uppercase text-center shadow-xl flex items-center justify-center gap-3"
              >
                <FileText className="w-5 h-5" />
                Demander un devis
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
