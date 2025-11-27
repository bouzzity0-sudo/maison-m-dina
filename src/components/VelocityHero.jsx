import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const VelocityHero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const shadowRef = useRef(null);
    const spotlightRef = useRef(null);
    const { setCursor } = useTheme();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            // Spotlight effect
            if (spotlightRef.current) {
                gsap.to(spotlightRef.current, {
                    x: clientX,
                    y: clientY,
                    duration: 0.1,
                    ease: 'power2.out'
                });
            }

            // Parallax on image (subtle)
            if (imageRef.current) {
                const { left, top, width, height } = containerRef.current.getBoundingClientRect();
                const x = (clientX - left) / width;
                const y = (clientY - top) / height;

                gsap.to(imageRef.current, {
                    x: (x - 0.5) * 30,
                    y: (y - 0.5) * 30,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text Reveal
            if (textRef.current) {
                gsap.fromTo(textRef.current.children,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: 'power4.out' }
                );
            }

            // Image Reveal (Scale + Fade)
            if (imageRef.current) {
                gsap.fromTo(imageRef.current,
                    { scale: 0.8, opacity: 0, rotation: -5 },
                    { scale: 1.0, opacity: 1, rotation: 0, duration: 1.5, ease: 'power3.out', delay: 0.2 }
                );

                // Zero Gravity Float Effect (Dynamic & Alive)
                gsap.to(imageRef.current, {
                    y: -50,
                    rotation: 2,
                    duration: 2.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

                // Shadow Breathing Effect (Deep & Marked)
                if (shadowRef.current) {
                    gsap.to(shadowRef.current, {
                        scale: 0.7,
                        opacity: 0.6,
                        duration: 2.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                }
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex items-center justify-between px-8 pt-48 pb-24 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #f5f5f0 0%, #e8e6dd 100%)'
            }}
            onMouseEnter={() => setCursor('default')}
        >
            {/* Background Zellige with Glassmorphism */}
            <div
                className="absolute inset-0 z-0 opacity-25 mix-blend-multiply pointer-events-none"
                style={{
                    backgroundImage: "url('/hero-bg.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'contrast(1.1) sepia(0.1)'
                }}
            />

            {/* Glass Overlay */}
            <div className="absolute inset-0 z-0 bg-white/30 backdrop-blur-[1px] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">

                {/* Hero Content */}
                <div ref={textRef} className="hero-content flex-1 max-w-[600px] text-center lg:text-left z-30 mx-auto lg:mx-0 relative">
                    <h1 className="text-[3rem] md:text-[5rem] font-light text-[#2c2c2c] mb-8 leading-tight">
                        L'EXCELLENCE DE<br />
                        <span className="text-[#c9a86a] italic font-serif">L'ARTISANAT MAROCAIN</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#2c2c2c] mb-6 font-medium">
                        Fournisseur B2B de mules et sabots en cuir véritable.
                    </p>
                    <p className="text-lg text-[#2c2c2c]/80 font-light">
                        Alliant tradition séculaire et design contemporain.
                    </p>
                </div>

                {/* Hero Image */}
                <div
                    className="hero-image flex-1 flex justify-center items-center relative z-20 mt-12 lg:mt-0"
                    style={{ background: 'none !important' }}
                >
                    <div className="relative w-full flex justify-center">
                        <img
                            ref={imageRef}
                            src="/images/hero-mule-user-transparent.png"
                            alt="Mule premium en cuir véritable"
                            className="w-full max-w-[400px] md:max-w-[500px] h-auto block relative z-10 drop-shadow-2xl"
                            style={{ background: 'none !important' }}
                        />
                        {/* Dynamic Shadow */}
                        <div
                            ref={shadowRef}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-black/50 blur-xl rounded-[100%] pointer-events-none"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VelocityHero;
