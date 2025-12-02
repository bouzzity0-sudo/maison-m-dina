import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Palette, Check, ArrowRight } from 'lucide-react';

const ColorSwatch = ({ name, hex, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ y: -5, scale: 1.05 }}
        className="flex flex-col items-center gap-3 group"
    >
        <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-lg border-4 border-white ring-1 ring-gray-100 transition-shadow duration-300 group-hover:shadow-xl relative overflow-hidden"
            style={{ backgroundColor: hex }}
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <span className="text-sm font-medium text-gray-700 text-center group-hover:text-black transition-colors">
            {name}
        </span>
    </motion.div>
);

const ColorsSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const colors = [
        { name: 'Rose poudré', hex: '#D4A5A5' },
        { name: 'Vert sauge', hex: '#7A7A52' },
        { name: 'Terracotta', hex: '#E67E50' },
        { name: 'Ocre', hex: '#D4A23A' },
        { name: 'Beige nude', hex: '#E5D4C1' },
        { name: 'Camel', hex: '#C4915B' },
        { name: 'Noir', hex: '#1A1A1A' },
        { name: 'Bordeaux', hex: '#6B4347' },
        { name: 'Bleu jean', hex: '#4A7BA7' },
        { name: 'Gris anthracite', hex: '#333333' },
        { name: 'Taupe', hex: '#B8A894' },
        { name: 'Cognac', hex: '#8B5A3C' },
    ];

    const benefits = [
        "Vos concurrents n'ont que 2-3 couleurs basiques",
        "Vous différenciez votre offre sans effort",
        "Réassort rapide par couleur (14 jours)",
        "Testez les tendances avec MOQ 100 paires seulement"
    ];

    return (
        <section id="colors" className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Content */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="space-y-4 mb-10">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Pourquoi c'est un atout majeur :</h3>
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                        <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                                    </div>
                                    <span className="text-gray-700 font-medium">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-800 transition-colors"
                        >
                            Voir le catalogue complet
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>

                    {/* Right Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 sm:gap-8">
                        {colors.map((color, index) => (
                            <ColorSwatch
                                key={index}
                                {...color}
                                delay={0.1 + (index * 0.05)}
                            />
                        ))}
                    </div>

                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 sm:mt-20 bg-gray-50 rounded-2xl p-6 sm:p-8 text-center border border-gray-100"
                >
                    <p className="text-gray-900 font-bold text-lg sm:text-xl">
                        MOQ : 100 paires par couleur • Mix de tailles personnalisable
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ColorsSection;
