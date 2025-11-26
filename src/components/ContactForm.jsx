import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: '',
    quantity: 100,
  });

  const [status, setStatus] = useState({
    type: '', // 'success', 'error', ''
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    // Validation simple
    if (!formData.name || !formData.email || !formData.phone) {
      setStatus({
        type: 'error',
        message: 'Veuillez remplir tous les champs obligatoires.',
      });
      setIsSubmitting(false);
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Veuillez entrer une adresse email valide.',
      });
      setIsSubmitting(false);
      return;
    }

    // Simulation d'envoi (remplacez par votre logique d'envoi)
    try {
      // TODO: Intégrer avec EmailJS, Web3Forms, ou votre backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Pour l'instant, on ouvre WhatsApp avec les infos
      const whatsappMessage = `Nouveau contact:\nNom: ${formData.name}\nEmail: ${formData.email}\nTél: ${formData.phone}\nProduit: ${formData.product || 'Non précisé'}\nMessage: ${formData.message || 'Aucun'}`;
      const whatsappUrl = `https://wa.me/33786350825?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      setStatus({
        type: 'success',
        message: 'Merci ! Nous vous contacterons très bientôt.',
      });

      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        phone: '',
        product: '',
        message: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue. Veuillez réessayer.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Responsive */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 id="form-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-3 md:mb-4 px-2">
            Demander un Devis B2B
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2">
            Professionnels : contactez-nous pour recevoir votre devis fournisseur personnalisé
          </p>
        </motion.div>

        {/* Formulaire - Padding réduit sur mobile */}
        <motion.form
          role="form"
          aria-labelledby="form-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-6 md:p-10 lg:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5 md:mb-6">
            {/* Nom */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
                Nom complet <span className="text-accent-rose">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={status.type === 'error' && !formData.name}
                className="w-full px-4 py-4 border border-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-rose focus:border-transparent transition-all text-base min-h-[48px]"
                placeholder="Votre nom"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
                Email <span className="text-accent-rose">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={status.type === 'error' && (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))}
                aria-describedby={status.type === 'error' ? 'status-message' : undefined}
                className="w-full px-4 py-4 border border-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-rose focus:border-transparent transition-all text-base min-h-[48px]"
                placeholder="votre@email.com"
                inputMode="email"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-2">
                Téléphone <span className="text-accent-rose">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={status.type === 'error' && !formData.phone}
                className="w-full px-4 py-4 border border-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-rose focus:border-transparent transition-all text-base min-h-[48px]"
                placeholder="06 XX XX XX XX"
                inputMode="tel"
              />
            </div>

            {/* Produit */}
            <div>
              <label htmlFor="product" className="block text-sm font-semibold text-charcoal mb-2">
                Produit intéressé
              </label>
              <select
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-rose focus:border-transparent transition-all bg-white text-base min-h-[48px]"
              >
                <option value="">Sélectionnez un produit</option>
                <option value="Mules">Mules</option>
                <option value="Mocassins">Mocassins</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>

          {/* Quantité estimée */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="quantity" className="block text-sm font-semibold text-charcoal mb-2">
              Quantité estimée pour votre première commande
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                id="quantity"
                name="quantity"
                min="30"
                max="5000"
                step="50"
                value={formData.quantity}
                onChange={handleChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex-shrink-0 w-24 px-4 py-2 bg-amber-50 border-2 border-amber-200 rounded-lg text-center">
                <span className="text-lg font-bold text-amber-600">{formData.quantity}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Minimum 30 paires • Capacité de production : plusieurs milliers</p>
          </div>

          {/* Message */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-4 border border-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-rose focus:border-transparent transition-all resize-none text-base"
              placeholder="Parlez-nous de votre projet..."
            />
          </div>

          {/* Status Message */}
          {status.message && (
            <motion.div
              id="status-message"
              role="alert"
              aria-live="polite"
              aria-atomic="true"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              )}
              <p className="text-sm font-medium">{status.message}</p>
            </motion.div>
          )}

          {/* Submit Button - Hauteur confortable tactile */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
            className="w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 hover:from-amber-500 hover:via-yellow-600 hover:to-amber-500 text-black py-4 md:py-4 px-6 md:px-8 rounded-full font-bold text-base md:text-lg shadow-lg shadow-amber-400/40 hover:shadow-[0_10px_40px_rgba(251,191,36,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 md:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 min-h-[56px]"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  aria-hidden="true"
                />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                Envoyer la demande
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactForm;
