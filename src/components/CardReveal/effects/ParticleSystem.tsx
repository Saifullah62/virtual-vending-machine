import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardRevealPhase } from '../store/useCardRevealStore';

interface ParticleSystemProps {
  phase: CardRevealPhase;
}

export function ParticleSystem({ phase }: ParticleSystemProps) {
  const particleCount = phase === 'reveal' ? 50 : 20;

  return (
    <AnimatePresence>
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: particleCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: '50%',
              y: '50%',
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: `${50 + (Math.random() - 0.5) * 100}%`,
              y: `${50 + (Math.random() - 0.5) * 100}%`,
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 1,
              delay: i * 0.02,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}