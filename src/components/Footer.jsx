import { motion } from 'framer-motion';
import { Mail, Phone, Globe, Instagram, Facebook, Linkedin, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" role="contentinfo" className="bg-brown-deep text-cream pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-xl md:text-2xl font-display font-semibold text-champagne-light mb-3 md:mb-4">
              MAISON MÉDINA
            </h2>
            <p className="text-cream/80 text-sm md:text-base leading-relaxed mb-4 md:mb-5">
              L'excellence de l'artisanat marocain directement de la médina de Fès.
            </p>
            <div className="flex gap-3 md:gap-4">
              <motion.a
                whileTap={{ scale: 0.9 }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur Instagram (ouvre dans une nouvelle fenêtre)"
                className="min-w-[48px] min-h-[48px] md:w-10 md:h-10 bg-accent-rose/20 active:bg-accent-rose md:hover:bg-accent-rose rounded-full flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep"
              >
                <Instagram className="w-5 h-5 md:w-5 md:h-5" aria-hidden="true" />
              </motion.a>
              <motion.a
                whileTap={{ scale: 0.9 }}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur Facebook (ouvre dans une nouvelle fenêtre)"
                className="min-w-[48px] min-h-[48px] md:w-10 md:h-10 bg-accent-rose/20 active:bg-accent-rose md:hover:bg-accent-rose rounded-full flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep"
              >
                <Facebook className="w-5 h-5 md:w-5 md:h-5" aria-hidden="true" />
              </motion.a>
              <motion.a
                whileTap={{ scale: 0.9 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur LinkedIn (ouvre dans une nouvelle fenêtre)"
                className="min-w-[48px] min-h-[48px] md:w-10 md:h-10 bg-accent-rose/20 active:bg-accent-rose md:hover:bg-accent-rose rounded-full flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep"
              >
                <Linkedin className="w-5 h-5 md:w-5 md:h-5" aria-hidden="true" />
              </motion.a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base md:text-lg font-display font-semibold text-sand-light mb-3 md:mb-4">
              Contactez-nous
            </h3>
            <div className="space-y-2.5 md:space-y-3 text-cream/80 text-sm md:text-base">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 mt-0.5 md:mt-1 flex-shrink-0" aria-hidden="true" />
                <span className="break-all">contact@medina-shoes.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mt-0.5 md:mt-1 flex-shrink-0" aria-hidden="true" />
                <span>+33 7 86 35 08 25</span>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="w-4 h-4 md:w-5 md:h-5 mt-0.5 md:mt-1 flex-shrink-0" aria-hidden="true" />
                <span>www.medina-shoes.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mt-0.5 md:mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Fès, Maroc</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Liens du site">
            <h3 className="text-base md:text-lg font-display font-semibold text-sand-light mb-3 md:mb-4">
              Navigation
            </h3>
            <ul className="space-y-2 text-cream/80 text-sm md:text-base">
              <li>
                <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} className="inline-block py-2 active:text-champagne-light md:hover:text-champagne-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep rounded min-h-[44px] flex items-center">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#heritage" onClick={(e) => scrollToSection(e, '#heritage')} className="inline-block py-2 active:text-champagne-light md:hover:text-champagne-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep rounded min-h-[44px] flex items-center">
                  Notre Histoire
                </a>
              </li>
              <li>
                <a href="#collections" onClick={(e) => scrollToSection(e, '#collections')} className="inline-block py-2 active:text-champagne-light md:hover:text-champagne-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep rounded min-h-[44px] flex items-center">
                  Collections
                </a>
              </li>
              <li>
                <a href="#avantages" onClick={(e) => scrollToSection(e, '#avantages')} className="inline-block py-2 active:text-champagne-light md:hover:text-champagne-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep rounded min-h-[44px] flex items-center">
                  Avantages
                </a>
              </li>
              <li>
                <a href="#tarifs" onClick={(e) => scrollToSection(e, '#tarifs')} className="inline-block py-2 active:text-champagne-light md:hover:text-champagne-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep rounded min-h-[44px] flex items-center">
                  Tarifs
                </a>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <div>
            <h3 className="text-base md:text-lg font-display font-semibold text-sand-light mb-3 md:mb-4">
              Informations Légales
            </h3>
            <ul className="space-y-2 text-cream/80 text-sm md:text-base">
              <li>
                <a href="#" className="inline-block py-2 active:text-champagne-light md:hover:text-champagne-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep rounded min-h-[44px] flex items-center">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="inline-block py-2 active:text-champagne-light md:hover:text-champagne-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep rounded min-h-[44px] flex items-center">
                  Conditions générales
                </a>
              </li>
              <li>
                <a href="#" className="inline-block py-2 active:text-champagne-light md:hover:text-champagne-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep rounded min-h-[44px] flex items-center">
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Responsive */}
        <div className="border-t border-cream/20 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-cream/60 text-xs md:text-sm text-center md:text-left">
               2024 Ateliers Médina  L'artisanat marocain d'excellence
            </p>
            <p className="text-cream/60 text-xs md:text-sm text-center md:text-right">
              Fabriqué à Fès  Médina historique  Artisanat d'exception
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
