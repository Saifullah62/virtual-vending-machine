import React from 'react';
import { motion } from 'framer-motion';
import { useCardRevealStore } from '../store/useCardRevealStore';
import { useCardRevealSounds } from '../hooks/useCardRevealSounds';
import { CardGleamEffect } from '../effects/CardGleamEffect';
import { SocialShare } from '../SocialShare';

interface CardRevealAnimationProps {
  packId: string;
  onComplete: () => void;
}

export function CardRevealAnimation({ packId, onComplete }: CardRevealAnimationProps) {
  const { playSound } = useCardRevealSounds();
  const [isRevealed, setIsRevealed] = React.useState(false);

  React.useEffect(() => {
    playSound('reveal');
    // Increased reveal time by 65%
    const timer = setTimeout(() => {
      setIsRevealed(true);
      onComplete();
    }, 5000); // Increased from 3000ms to 5000ms

    return () => clearTimeout(timer);
  }, [onComplete, playSound]);

  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        duration: 2.5, // Increased from 1.5s to 2.5s
        bounce: 0.2, // Reduced bounce for more dramatic reveal
      }}
    >
      {/* Card Container */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl overflow-hidden">
        {/* Card Content */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.8 }} // Increased duration and delay
        >
          <CardGleamEffect />
          
          {/* Social Share Button */}
          {isRevealed && (
            <motion.div
              className="absolute top-4 right-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <SocialShare cardId={packId} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}