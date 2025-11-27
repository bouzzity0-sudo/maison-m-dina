import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, FileText, Sparkles, ArrowDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const AnimatedHero = () => {
    const containerRef = useRef(null);
    const bgRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const contentRef = useRef(null);
    const { setCursor } = useTheme();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Effect
            gsap.to(bgRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Timeline d'entrée
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // 1. Fade in background
            tl.fromTo(bgRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5 });

            // 2. Title Reveal (Split Text simulation via CSS/GSAP)
            tl.fromTo(titleRef.current,
                { y: 100, opacity: 0, rotateX: -20 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1 },
                '-=1'
            );

            // 3. Subtitle Reveal
            tl.fromTo(subtitleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.6'
            );

            // 4. Content Reveal (Buttons, Badges)
            tl.fromTo(contentRef.current.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                '-=0.4'
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-9"
        >
            {/* Background Image with Parallax */}
            <div className="absolute inset-0 overflow-hidden">
                <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    <img
                        src="/hero-bg.jpg"
                        alt="Artisanat marocain architecture"
                        className="w-full h-full object-cover brightness-[0.5] saturate-[1.05]"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/40 to-noir/80" />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24 md:py-40 lg:py-56">

                {/* Title */}
                <div className="overflow-hidden mb-4 sm:mb-6">
                    <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-medium text-white tracking-tight leading-tight drop-shadow-2xl">
                        L'Excellence de l'Artisanat
                        <span className="block text-gradient-gold mt-2 sm:mt-4 font-serif italic">
                            Marocain
                        </span>
                    </h1>
                </div>

                {/* Subtitle */}
                <div ref={subtitleRef}>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 font-light max-w-3xl mx-auto leading-relaxed px-4 font-sans drop-shadow-md">
                        Fournisseur B2B de mules et sabots en cuir véritable.
                        <span className="block mt-2 text-white/80 text-sm sm:text-base">Alliant tradition séculaire et design contemporain.</span>
                    </p>
                </div>

                {/* Interactive Content Container */}
                <div ref={contentRef} className="flex flex-col items-center gap-10">

                    {/* Badge & Price */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                        <div
                            className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 group transition-all duration-300 hover:bg-black/50"
                            onMouseEnter={() => setCursor('text', 'Trusted')}
                            onMouseLeave={() => setCursor('default')}
                        >
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-white/90 font-sans font-medium text-sm tracking-wide group-hover:text-white transition-colors">
                                Partenaire de 500+ boutiques
                            </span>
                        </div>

                        <div className="flex items-baseline gap-3 text-white drop-shadow-lg">
                            <span className="text-xs font-sans uppercase tracking-widest text-white/70 font-medium">Dès</span>
                            <span className="text-5xl sm:text-6xl font-sans font-bold text-champagne tracking-tight">13,49€</span>
                            <span className="text-xs font-sans uppercase tracking-widest text-white/70 font-medium">HT</span>
                        </div>
                    </div>

                    {/* USP */}
                    <div className="inline-flex flex-wrap justify-center items-center gap-6 sm:gap-10 bg-black/20 backdrop-blur-sm py-4 px-8 rounded-full border border-white/5">
                        {['Fait Main à Fès', 'Cuir Véritable', 'Livraison Europe'].map((usp, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-champagne rounded-full" />
                                <span className="text-xs sm:text-sm font-sans font-bold text-white tracking-widest uppercase shadow-black drop-shadow-md">{usp}</span>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto w-full px-4">
                        <button
                            onClick={() => scrollToSection('#collections')}
                            onMouseEnter={() => setCursor('button')}
                            onMouseLeave={() => setCursor('default')}
                            className="group relative overflow-hidden bg-champagne text-noir px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:bg-champagne-light w-full sm:w-auto min-w-[200px]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Voir la Collection
                                <Eye className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>

                        <button
                            onClick={() => scrollToSection('#calculateur')}
                            onMouseEnter={() => setCursor('button')}
                            onMouseLeave={() => setCursor('default')}
                            className="group relative overflow-hidden bg-transparent border border-white/20 text-white px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/5 w-full sm:w-auto min-w-[200px]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Calculer ma Marge
                                <FileText className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                            </span>
                        </button>

                        <button
                            onClick={() => scrollToSection('#contact')}
                            onMouseEnter={() => setCursor('button')}
                            onMouseLeave={() => setCursor('default')}
                            className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/20 w-full sm:w-auto min-w-[200px]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Demander un devis
                                <FileText className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div
                        className="text-white/30 hover:text-champagne transition-colors cursor-pointer"
                        onClick={() => scrollToSection('#collections')}
                        onMouseEnter={() => setCursor('button')}
                        onMouseLeave={() => setCursor('default')}
                    >
                        <ArrowDown className="w-5 h-5 mx-auto" strokeWidth={1} />
                        <span className="text-[10px] uppercase tracking-widest mt-1 block">Découvrir</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnimatedHero;
