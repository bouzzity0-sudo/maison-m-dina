import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const EmailButton = () => {
  const email = 'contact@medina-shoes.com';
  const subject = encodeURIComponent('Demande de renseignements - Ateliers Médina');
  const body = encodeURIComponent('Bonjour,\n\nJe suis intéressé par vos chaussures artisanales Ateliers Médina.\n\nPouvez-vous me fournir plus d\'informations sur :\n- Vos tarifs B2B\n- Les conditions de commande\n- Les délais de livraison\n\nCordialement,');
  const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <motion.a
      href={mailtoUrl}
      className="fixed bottom-20 right-4 sm:bottom-24 sm:right-5 md:bottom-[88px] md:right-6 z-[100] bg-champagne text-white rounded-full p-3.5 sm:p-4 shadow-lg active:shadow-md md:hover:shadow-xl transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-champagne min-w-[56px] min-h-[56px] flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contactez-nous par email"
    >
      {/* Animation de pulsation - Desktop uniquement pour performance */}
      <motion.div
        className="hidden md:block absolute inset-0 bg-accent-rose rounded-full"
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

      {/* Icône Email - Touch-friendly size */}
      <Mail className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" strokeWidth={2.5} aria-hidden="true" />

      {/* Tooltip au survol - Desktop uniquement */}
      <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-charcoal text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
        Contactez-nous par email
      </span>
    </motion.a>
  );
};

export default EmailButton;
