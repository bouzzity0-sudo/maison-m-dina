import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Check, Star } from 'lucide-react';

const ComfortSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const features = [
        {
            title: "Semelle ergonomique",
            desc: "Épouse la forme du pied"
        },
        {
            title: "Cuir vegan souple",
            desc: "Ne blesse pas, même neuf"
        },
        {
            title: "Cambrure anatomique",
            desc: "Maintien optimal"
        },
        {
            title: "Amorti renforcé",
            desc: "Sensation nuage"
        }
    ];

    return (
        <section className="py-16 sm:py-20 md:py-24 bg-stone-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
                            <img
                                src="/images/products/Modele 4/beige.jpg"
                                alt="Mule confort portée"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                            {/* Floating Badge */}
                            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg max-w-[200px]">
                                <div className="flex items-center gap-1 text-amber-500 mb-1">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                </div>
                                <p className="text-xs font-bold text-gray-900">
                                    "Enfin des mules jolies ET confortables"
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-blue-100">
                            <Heart className="w-4 h-4" />
                            CONFORT EXCEPTIONNEL
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
                            L'argument qui fait<br />
                            <span className="text-blue-600">vendre en boutique</span>
                        </h2>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Vos clientes ne veulent plus souffrir dans leurs chaussures. Nos mules sont conçues pour être portées toute la journée sans aucune douleur.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-5 h-5 text-blue-600" strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{feature.title}</h4>
                                        <p className="text-sm text-gray-500">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-gray-900">Taux de satisfaction confort</span>
                                <span className="font-bold text-green-600">4.9/5</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full w-[98%]" />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Basé sur 94 avis boutiques partenaires</p>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ComfortSection;
