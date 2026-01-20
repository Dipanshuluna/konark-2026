import { motion } from 'framer-motion';

const FloatingElements = () => {
  // Generate floating orbs
  const orbs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 150 + 80,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  // Generate tech lines
  const lines = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    width: Math.random() * 200 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 3,
  }));

  // Generate small particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Glowing Orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(0, 150, 255, 0.05) 40%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 50, -30, 20, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.3, 0.6, 0.4, 0.5, 0.3],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Tech Lines */}
      {lines.map((line) => (
        <motion.div
          key={`line-${line.id}`}
          className="absolute h-[1px]"
          style={{
            width: line.width,
            left: `${line.x}%`,
            top: `${line.y}%`,
            rotate: `${line.rotation}deg`,
            background: `linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), transparent)`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: 'hsl(var(--primary))',
            boxShadow: '0 0 10px hsl(var(--primary))',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-30">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="cornerGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 80 L 0 0 L 80 0"
            fill="none"
            stroke="url(#cornerGrad1)"
            strokeWidth="2"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="0"
            cy="0"
            r="4"
            fill="hsl(var(--primary))"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 opacity-30 rotate-90">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.path
            d="M 0 80 L 0 0 L 80 0"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeOpacity="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-30 -rotate-90">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.path
            d="M 0 80 L 0 0 L 80 0"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeOpacity="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-30 rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.path
            d="M 0 80 L 0 0 L 80 0"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeOpacity="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Horizontal scan lines effect */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 212, 255, 0.5) 2px, rgba(0, 212, 255, 0.5) 4px)',
        }}
        animate={{
          backgroundPositionY: ['0px', '100px'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default FloatingElements;
