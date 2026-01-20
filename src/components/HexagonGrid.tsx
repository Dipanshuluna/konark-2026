import { motion } from 'framer-motion';

const HexagonGrid = () => {
  const hexagons = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 40,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-20">
      {hexagons.map((hex) => (
        <motion.div
          key={hex.id}
          className="absolute"
          style={{
            left: `${hex.x}%`,
            top: `${hex.y}%`,
            width: hex.size,
            height: hex.size,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5],
            rotate: [0, 60, 0],
          }}
          transition={{
            duration: hex.duration,
            delay: hex.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,3 95,25 95,75 50,97 5,75 5,25"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
            <polygon
              points="50,15 82,32 82,68 50,85 18,68 18,32"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
          </svg>
        </motion.div>
      ))}
      
      {/* Central hexagon pattern */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
        <motion.svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          {/* Outer hexagon */}
          <motion.polygon
            points="200,20 360,110 360,290 200,380 40,290 40,110"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            animate={{ strokeDashoffset: [0, 1000] }}
            style={{ strokeDasharray: 1000 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          {/* Middle hexagon */}
          <motion.polygon
            points="200,60 320,130 320,270 200,340 80,270 80,130"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            animate={{ strokeDashoffset: [1000, 0] }}
            style={{ strokeDasharray: 1000 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
          {/* Inner hexagon */}
          <motion.polygon
            points="200,100 280,150 280,250 200,300 120,250 120,150"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            animate={{ strokeDashoffset: [0, 600] }}
            style={{ strokeDasharray: 600 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </motion.svg>
      </div>
    </div>
  );
};

export default HexagonGrid;
