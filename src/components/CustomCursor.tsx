import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring animation - tight follow like KTJ
  const springConfig = { damping: 30, stiffness: 500, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Outer ring - slower follow
  const outerSpringConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const outerXSpring = useSpring(cursorX, outerSpringConfig);
  const outerYSpring = useSpring(cursorY, outerSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]');
      
      setIsHovering(!!isHoverable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Outer ring - follows with delay like KTJ */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: outerXSpring,
          y: outerYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Outer ring */}
          <div 
            className="w-8 h-8 rounded-full border"
            style={{
              borderColor: isHovering ? 'rgba(0, 212, 255, 0.6)' : 'rgba(0, 212, 255, 0.3)',
              transition: 'border-color 0.3s ease',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Inner dot - follows cursor tightly like KTJ */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isHovering ? 0.5 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Inner glowing dot */}
          <div 
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: '#00d4ff',
              boxShadow: isHovering 
                ? '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #00d4ff'
                : '0 0 6px #00d4ff, 0 0 12px rgba(0, 212, 255, 0.5)',
              transition: 'box-shadow 0.3s ease',
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;