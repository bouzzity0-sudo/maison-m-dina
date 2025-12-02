import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

const PlatformsSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className="py-16 sm:py-20 md:py-24 bg-[#f9f8f6] text-[#2c2c2c] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="inline-flex items-center gap-2 bg-[#c9a86a] text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 uppercase tracking-wider"
                    >
                        <Sparkles className="w-4 h-4" />
                        Collection Plateformes
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                        Le segment premium<br />
                        <span className="font-serif italic text-[#c9a86a]">
                            qui cartonne en 2025
                        </span>
                    </h2>

                    <p className="text-lg text-[#2c2c2c]/80 max-w-2xl mx-auto">
                        Quasi introuvable en artisanal sur le marché français. Soyez les premiers à proposer ces modèles à forte marge.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Card */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl p-8 shadow-xl border border-[#e5e5e5] relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 bg-[#2c2c2c] text-white px-6 py-2 rounded-bl-2xl font-bold uppercase text-sm tracking-wider">
                            Marge +50€ / paire
                        </div>

                        <img
                            src="/images/products/MM-SAB-004-noir.jpg"
                            alt="Sabot Plateforme Premium"
                            className="w-full h-64 object-contain mb-8 group-hover:scale-105 transition-transform duration-500"
                        />

                        <div className="space-y-4">
                            <h3 className="text-2xl font-serif italic">Sabot Plateforme Premium</h3>
                            <div className="flex items-center justify-between text-sm text-[#2c2c2c]/60 border-t border-[#e5e5e5] pt-4">
                                <span>Prix fournisseur : <span className="text-[#2c2c2c] font-bold">14,99€</span></span>
                                <span>PVP Recommandé : <span className="text-[#2c2c2c] font-bold">65€ - 85€</span></span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Arguments */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#f0ebe0] flex items-center justify-center flex-shrink-0">
                                    <TrendingUp className="w-6 h-6 text-[#c9a86a]" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2 text-[#2c2c2c]">Segment Premium Accepté</h4>
                                    <p className="text-[#2c2c2c]/70">Vos clientes acceptent de payer plus cher (65-85€) pour ce type de modèle introuvable ailleurs.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#f0ebe0] flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-6 h-6 text-[#c9a86a]" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2 text-[#2c2c2c]">Confort Supérieur</h4>
                                    <p className="text-[#2c2c2c]/70">Semelle épaisse avec amorti renforcé. Le style sans la douleur des talons.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-[#e5e5e5] shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-mono text-[#2c2c2c]/60">MOQ</span>
                                <span className="font-bold text-[#2c2c2c]">100 paires</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-mono text-[#2c2c2c]/60">Couleurs</span>
                                <span className="font-bold text-[#2c2c2c]">4 disponibles</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-mono text-[#2c2c2c]/60">Livraison</span>
                                <span className="font-bold text-[#c9a86a]">14 jours</span>
                            </div>
                        </div>

                        <button
                            onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full bg-[#2c2c2c] text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg"
                        >
                            Voir les modèles plateformes
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformsSection;
