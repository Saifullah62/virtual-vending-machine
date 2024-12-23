import React from 'react';
import { motion } from 'framer-motion';
import { useCardRevealStore } from '../store/useCardRevealStore';
import { useCardRevealSounds } from '../hooks/useCardRevealSounds';

interface PackDropProps {
  packId: string;
}

export function PackDrop({ packId }: PackDropProps) {
  const { advancePhase } = useCardRevealStore();
  const { playSound } = useCardRevealSounds();

  React.useEffect(() => {
    playSound('whoosh');
    const timer = setTimeout(() => {
      playSound('clank');
      advancePhase();
    }, 500);

    return () => clearTimeout(timer);
  }, [advancePhase, playSound]);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ y: -200, rotateZ: 0 }}
      animate={{
        y: 0,
        rotateZ: [-5, 5, 0],
      }}
      transition={{
        type: "spring",
        duration: 0.5,
        bounce: 0.3,
      }}
    >
      <div className="relative w-full h-full">
        {/* Pack Container with Metallic Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 rounded-lg shadow-xl">
          {/* Metallic Highlights */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          {/* Motion Blur Effect */}
          <motion.div
            className="absolute inset-0"
            animate={{
              filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}