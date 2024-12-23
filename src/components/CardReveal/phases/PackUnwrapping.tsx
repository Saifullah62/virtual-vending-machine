import React from 'react';
import { motion } from 'framer-motion';
import { useCardRevealStore } from '../store/useCardRevealStore';
import { useCardRevealSounds } from '../hooks/useCardRevealSounds';

interface PackUnwrappingProps {
  packId: string;
}

export function PackUnwrapping({ packId }: PackUnwrappingProps) {
  const { advancePhase } = useCardRevealStore();
  const { playSound } = useCardRevealSounds();

  React.useEffect(() => {
    playSound('unwrap');
    const timer = setTimeout(() => {
      advancePhase();
    }, 2000);

    return () => clearTimeout(timer);
  }, [advancePhase, playSound]);

  return (
    <div className="relative w-full h-full">
      {/* Wrapper Layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-purple-700/80 rounded-lg"
        initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        animate={{
          clipPath: [
            'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
            'polygon(40% 0, 100% 0, 100% 100%, 0 100%)',
            'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          ],
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        {/* Foil Texture */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20" />
      </motion.div>

      {/* Tear Effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      </motion.div>
    </div>
  );
}