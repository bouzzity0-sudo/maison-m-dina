import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '33786350825'; // Numéro WhatsApp français : +33 7 86 35 08 25
  const message = encodeURIComponent('Bonjour, je suis intéressé par vos chaussures artisanales Maison Médina');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 z-50 bg-[#25D366] text-white rounded-full p-3.5 sm:p-4 shadow-lg active:shadow-md md:hover:shadow-xl transition-shadow duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366] min-w-[56px] min-h-[56px] flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contactez-nous sur WhatsApp (ouvre dans une nouvelle fenêtre)"
    >
      {/* Animation de pulsation - Desktop uniquement pour performance */}
      <motion.div
        className="hidden md:block absolute inset-0 bg-[#25D366] rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      {/* Icône WhatsApp - Touch-friendly size */}
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" strokeWidth={2.5} aria-hidden="true" />

      {/* Tooltip au survol - Desktop uniquement */}
      <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-charcoal text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
        Contactez-nous sur WhatsApp
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
