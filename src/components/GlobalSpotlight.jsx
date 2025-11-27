import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GlobalSpotlight = () => {
    const spotlightRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;

            gsap.to(spotlightRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.6, // Slightly smoother/slower for a global feel
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={spotlightRef}
            className="fixed top-0 left-0 w-[600px] h-[600px] bg-champagne/15 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-multiply"
            style={{ willChange: 'transform' }}
        />
    );
};

export default GlobalSpotlight;
