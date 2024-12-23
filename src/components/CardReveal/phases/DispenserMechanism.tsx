import React from 'react';
import { motion } from 'framer-motion';
import { useCardRevealStore } from '../store/useCardRevealStore';
import { useCardRevealSounds } from '../hooks/useCardRevealSounds';

interface DispenserMechanismProps {
  packId: string;
}

export function DispenserMechanism({ packId }: DispenserMechanismProps) {
  const { advancePhase } = useCardRevealStore();
  const { playSound } = useCardRevealSounds();

  React.useEffect(() => {
    playSound('servo');
    const timer = setTimeout(() => {
      playSound('mechanism');
      advancePhase();
    }, 1000);

    return () => clearTimeout(timer);
  }, [advancePhase, playSound]);

  return (
    <div className="relative w-full h-full">
      {/* Mechanical Arms */}
      <div className="absolute inset-x-0 top-0 flex justify-between">
        <motion.div
          className="w-12 h-24 bg-gradient-to-r from-gray-600 to-gray-700"
          initial={{ x: -48 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
        />
        <motion.div
          className="w-12 h-24 bg-gradient-to-l from-gray-600 to-gray-700"
          initial={{ x: 48 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
        />
      </div>

      {/* Vibration Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [-1, 1, -1],
          y: [-1, 1, -1],
        }}
        transition={{
          duration: 0.1,
          repeat: 10,
          repeatType: "mirror",
        }}
      >
        {/* Pack Container */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 rounded-lg shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}