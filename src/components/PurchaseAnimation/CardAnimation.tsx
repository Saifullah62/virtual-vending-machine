import React from 'react';
import { motion } from 'framer-motion';
import type { Sharepack } from '../../types/sharepack';

interface CardAnimationProps {
  sharepack: Sharepack;
  prefersReducedMotion: boolean | null;
  onComplete: () => void;
}

export function CardAnimation({ sharepack, prefersReducedMotion, onComplete }: CardAnimationProps) {
  const variants = {
    initial: { y: 0, rotate: 0, scale: 1 },
    animate: {
      y: [0, -100, 200],
      rotate: [0, -3, 5],
      scale: [1, 1.1, 1],
      transition: {
        duration: prefersReducedMotion ? 0.5 : 1.2,
        times: [0, 0.4, 1],
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="relative w-48 h-64"
      variants={variants}
      initial="initial"
      animate="animate"
      onAnimationComplete={onComplete}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-xl overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
          animate={{
            x: [-200, 200],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 1.5,
            ease: "linear",
          }}
        />
        
        <div className="h-full flex flex-col items-center justify-center p-4">
          <div className="text-white text-center">
            <p className="font-bold text-2xl mb-2">SharePack</p>
            <p className="text-sm opacity-75">Mystery Collection</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}