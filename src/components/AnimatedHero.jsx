import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, FileText, Sparkles, ArrowDown, CheckCircle2 } from 'lucide-react';
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
            // Parallax Effect - Reduced for mobile performance
            gsap.to(bgRef.current, {
                yPercent: 20,
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

            // 2. Title Reveal
            tl.fromTo(titleRef.current,
                { y: 50, opacity: 0, rotateX: -10 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1 },
                '-=1'
            );

            // 3. Subtitle Reveal
            tl.fromTo(subtitleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.6'
            );

            // 4. Content Reveal
            tl.fromTo(contentRef.current.children,
                { y: 20, opacity: 0 },
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
            className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 sm:pt-0"
        >
            {/* Background Image with Parallax */}
            <div className="absolute inset-0 overflow-hidden">
                <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    <img
                        src="/hero-bg.jpg"
                        alt="Artisanat marocain architecture"
                        className="w-full h-full object-cover object-center brightness-[0.6] saturate-[1.1]"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-noir/60 via-noir/30 to-noir/90" />
                    <div className="absolute inset-0 bg-black/10" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center h-full py-12 sm:py-24">

                {/* Badge Mobile Only - Top */}
                <div className="sm:hidden mb-6 animate-fade-in">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-white/90 text-xs font-medium tracking-wide">
                            Partenaire de 500+ boutiques
                        </span>
                    </div>
                </div>

                {/* Title */}
                <div className="overflow-visible mb-4 sm:mb-6 px-2">
                    <h1 ref={titleRef} className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-medium text-white tracking-tight drop-shadow-2xl">
                        L'Excellence de <br className="sm:hidden" /> l'Artisanat
                        <span className="block text-gradient-gold mt-2 sm:mt-4 font-serif italic text-4xl sm:text-6xl lg:text-8xl">
                            Marocain
                        </span>
                    </h1>
                </div>

                {/* Subtitle */}
                <div ref={subtitleRef} className="px-4">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 font-light max-w-3xl mx-auto leading-relaxed font-sans drop-shadow-md">
                        Fournisseur B2B de mules et sabots en cuir véritable.
                        <span className="block mt-2 text-white/80 text-sm sm:text-base">Alliant tradition séculaire et design contemporain.</span>
                    </p>
                </div>

                {/* Interactive Content Container */}
                <div ref={contentRef} className="flex flex-col items-center gap-8 sm:gap-10 w-full">

                    {/* Badge & Price - Desktop/Tablet Layout */}
                    <div className="hidden sm:flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
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

                    {/* Price Mobile */}
                    <div className="sm:hidden flex items-baseline gap-2 text-white drop-shadow-lg mb-2">
                        <span className="text-xs font-sans uppercase tracking-widest text-white/70 font-medium">Dès</span>
                        <span className="text-5xl font-sans font-bold text-champagne tracking-tight">13,49€</span>
                        <span className="text-xs font-sans uppercase tracking-widest text-white/70 font-medium">HT</span>
                    </div>

                    {/* USP - Mobile Optimized */}
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 bg-black/20 backdrop-blur-sm py-3 px-6 rounded-2xl border border-white/5 max-w-[90%] sm:max-w-none">
                        {['Fait Main à Fès', 'Cuir Véritable', 'Livraison Europe'].map((usp, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-champagne" />
                                <span className="text-[10px] sm:text-sm font-sans font-bold text-white tracking-widest uppercase shadow-black drop-shadow-md">{usp}</span>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col w-full px-6 gap-3 sm:flex-row sm:gap-4 sm:justify-center sm:items-center sm:max-w-4xl sm:px-4 mt-2">
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
                            className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/20 w-full sm:w-auto min-w-[200px]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Calculer ma Marge
                                <FileText className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                            </span>
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
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
