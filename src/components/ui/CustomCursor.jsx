import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../context/ThemeContext';

const CustomCursor = () => {
    const { cursorVariant, cursorText } = useTheme();
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Détection tactile
        const checkTouch = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Position initiale hors écran
        gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
        gsap.set(follower, { xPercent: -50, yPercent: -50, opacity: 0 });

        const moveCursor = (e) => {
            // Curseur principal (rapide)
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                opacity: 1,
                ease: 'power2.out'
            });

            // Follower (plus lent / inertie)
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                opacity: 1,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [isTouchDevice]);

    // Gestion des variants
    useEffect(() => {
        if (isTouchDevice) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (cursorVariant === 'text') {
            gsap.to(cursor, {
                width: 100,
                height: 100,
                backgroundColor: '#fff',
                mixBlendMode: 'difference',
                duration: 0.3,
            });
            gsap.to(follower, {
                opacity: 0,
                duration: 0.3,
            });
        } else if (cursorVariant === 'button') {
            gsap.to(cursor, {
                width: 0,
                height: 0,
                duration: 0.3,
            });
            gsap.to(follower, {
                width: 60,
                height: 60,
                backgroundColor: 'transparent',
                border: '1px solid #C9A85C', // Champagne
                duration: 0.3,
            });
        } else {
            // Default
            gsap.to(cursor, {
                width: 10,
                height: 10,
                backgroundColor: '#C9A85C',
                mixBlendMode: 'normal',
                duration: 0.3,
            });
            gsap.to(follower, {
                width: 40,
                height: 40,
                backgroundColor: 'transparent',
                border: '1px solid rgba(201, 168, 92, 0.3)',
                opacity: 1,
                duration: 0.3,
            });
        }
    }, [cursorVariant, isTouchDevice]);

    if (isTouchDevice) return null;

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
            >
                {cursorVariant === 'text' && (
                    <span className="text-black text-[10px] font-bold uppercase tracking-widest">
                        {cursorText || 'View'}
                    </span>
                )}
            </div>
            <div
                ref={followerRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
            />
        </>
    );
};

export default CustomCursor;
