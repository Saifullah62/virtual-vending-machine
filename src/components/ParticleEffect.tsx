import React from 'react';
import { motion } from 'framer-motion';

interface ParticleProps {
  isActive: boolean;
}

export function ParticleEffect({ isActive }: ParticleProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {isActive && Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
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
            ease: 'easeOut',
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}