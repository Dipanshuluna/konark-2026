import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring animation for the follower
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

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
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
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

      {/* Main cursor - simple glowing dot like KTJ 2D */}
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
            scale: isClicking ? 0.6 : isHovering ? 1.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Inner dot */}
          <motion.div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: 'hsl(var(--primary))',
              boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.6), 0 0 30px hsl(var(--primary) / 0.3)',
            }}
            animate={{
              backgroundColor: isHovering ? 'hsl(45 100% 55%)' : 'hsl(var(--primary))',
              boxShadow: isHovering 
                ? '0 0 15px hsl(45 100% 55%), 0 0 30px hsl(45 100% 55% / 0.6), 0 0 45px hsl(45 100% 55% / 0.3)'
                : '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.6), 0 0 30px hsl(var(--primary) / 0.3)',
            }}
          />
          
          {/* Outer ring - appears on hover */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border"
            style={{
              borderColor: 'hsl(var(--primary) / 0.4)',
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: isHovering ? 1 : 0.5,
              opacity: isHovering ? 1 : 0,
              borderColor: isHovering ? 'hsl(45 100% 55% / 0.4)' : 'hsl(var(--primary) / 0.4)',
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </motion.div>

      {/* Click ripple effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          initial={false}
          animate={{
            scale: isClicking ? [1, 3] : 1,
            opacity: isClicking ? [0.5, 0] : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <div 
            className="w-4 h-4 rounded-full border border-primary/60"
            style={{
              boxShadow: '0 0 10px hsl(var(--primary) / 0.3)',
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;