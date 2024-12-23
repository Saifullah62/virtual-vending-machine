import React from 'react';
import { motion } from 'framer-motion';
import { useCardRevealStore } from '../store/useCardRevealStore';
import { useCardRevealSounds } from '../hooks/useCardRevealSounds';
import { CardGleamEffect } from '../effects/CardGleamEffect';

interface CardRevealAnimationProps {
  packId: string;
  onComplete: () => void;
}

export function CardRevealAnimation({ packId, onComplete }: CardRevealAnimationProps) {
  const { playSound } = useCardRevealSounds();

  React.useEffect(() => {
    playSound('reveal');
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete, playSound]);

  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        duration: 1.5,
        bounce: 0.3,
      }}
    >
      {/* Card Container */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl overflow-hidden">
        {/* Card Content */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <CardGleamEffect />
        </motion.div>
      </div>
    </motion.div>
  );
}