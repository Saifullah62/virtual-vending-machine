import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { PackDrop } from './phases/PackDrop';
import { DispenserMechanism } from './phases/DispenserMechanism';
import { PackUnwrapping } from './phases/PackUnwrapping';
import { CardRevealAnimation } from './phases/CardRevealAnimation';
import { useCardRevealStore } from './store/useCardRevealStore';
import { SkipButton } from './SkipButton';
import { ParticleSystem } from './effects/ParticleSystem';
import { useCardRevealSounds } from './hooks/useCardRevealSounds';

interface CardRevealSequenceProps {
  packId: string;
  onComplete: () => void;
}

export function CardRevealSequence({ packId, onComplete }: CardRevealSequenceProps) {
  const { currentPhase, skipSequence, isSkipped } = useCardRevealStore();
  const { playSound, stopAllSounds } = useCardRevealSounds();

  React.useEffect(() => {
    return () => {
      stopAllSounds();
    };
  }, [stopAllSounds]);

  const handleSkip = () => {
    stopAllSounds();
    skipSequence();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <AnimatePresence mode="wait">
        {!isSkipped && (
          <motion.div
            className="relative w-full max-w-lg aspect-[3/4]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {currentPhase === 'drop' && <PackDrop packId={packId} />}
            {currentPhase === 'dispenser' && <DispenserMechanism packId={packId} />}
            {currentPhase === 'unwrap' && <PackUnwrapping packId={packId} />}
            {currentPhase === 'reveal' && <CardRevealAnimation packId={packId} onComplete={onComplete} />}
            
            <ParticleSystem phase={currentPhase} />
            <SkipButton onClick={handleSkip} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}