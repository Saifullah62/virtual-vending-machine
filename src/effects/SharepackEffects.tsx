import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

interface SharepackEffectsProps {
  type: 'standard' | 'premium' | 'rare' | 'achievement';
  isActive: boolean;
}

const effectConfigs = {
  standard: {
    color: '#3B82F6',
    particleCount: 20,
    velocity: 0.5,
  },
  premium: {
    color: '#D4AF37',
    particleCount: 30,
    velocity: 0.7,
  },
  rare: {
    color: '#9333EA',
    particleCount: 40,
    velocity: 0.9,
  },
  achievement: {
    color: '#10B981',
    particleCount: 50,
    velocity: 1.1,
  },
};

export function SharepackEffects({ type, isActive }: SharepackEffectsProps) {
  const config = effectConfigs[type];
  const [{ glow }, api] = useSpring(() => ({
    glow: 0,
    config: { tension: 120, friction: 14 },
  }));

  React.useEffect(() => {
    if (isActive) {
      api.start({ glow: 1, loop: true });
    } else {
      api.stop();
      api.set({ glow: 0 });
    }
  }, [isActive, api]);

  return (
    <AnimatePresence>
      {isActive && (
        <>
          <animated.div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: glow.to(
                v => `0 0 ${20 * v}px ${config.color}`,
              ),
              opacity: glow,
            }}
          />
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: config.particleCount }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ backgroundColor: config.color }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                  scale: [0, 1, 0],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2 / config.velocity,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}