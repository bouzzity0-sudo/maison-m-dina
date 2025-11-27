// ============================================================================
// CUSTOM CURSOR - Premium Interactive Cursor (Awwwards-level)
// ============================================================================
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isVisible, setIsVisible] = useState(true)
  
  // Only show on desktop (not touch devices)
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const hasMouse = useMediaQuery('(pointer: fine)')

  // Smooth cursor movement with spring physics
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Don't render cursor on mobile/touch devices
    if (isMobile || !hasMouse) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY, isMobile, hasMouse])

  useEffect(() => {
    // Don't add listeners on mobile
    if (isMobile || !hasMouse) return

    // Detect interactive elements
    const handleMouseEnter = () => setCursorVariant('hover')
    const handleMouseLeave = () => setCursorVariant('default')

    // Target interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-pointer'
    )

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isMobile, hasMouse])

  // Don't render on mobile/touch devices
  if (isMobile || !hasMouse) return null

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(201, 168, 92, 0.3)',
      border: '2px solid rgba(201, 168, 92, 0.8)',
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: 'rgba(201, 168, 92, 0.15)',
      border: '2px solid rgba(201, 168, 92, 1)',
    },
  }

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom cursor */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
          ...variants[cursorVariant],
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-full h-full rounded-full backdrop-blur-sm" />
      </motion.div>

      {/* Cursor dot (center point) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1 h-1 bg-champagne rounded-full"
        style={{
          x: useSpring(cursorX, { damping: 30, stiffness: 800 }),
          y: useSpring(cursorY, { damping: 30, stiffness: 800 }),
          translateX: 15,
          translateY: 15,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: cursorVariant === 'hover' ? 2 : 1,
        }}
      />
    </>
  )
}

export default CustomCursor
