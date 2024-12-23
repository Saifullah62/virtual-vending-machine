import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVendingStore } from '../../store/useVendingStore';
import { CardAnimation } from './CardAnimation';
import { DispensingEffect } from './DispensingEffect';
import { useReducedMotion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';

export function PurchaseSequence() {
  const { isVending, selectedSharepack, resetPurchase } = useVendingStore();
  const prefersReducedMotion = useReducedMotion();
  const { playSound } = useSound();
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        resetPurchase();
        setIsComplete(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, resetPurchase]);

  if (!isVending || !selectedSharepack) return null;

  const handleAnimationComplete = () => {
    playSound('drop');
    setIsComplete(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        
        <div className="relative h-full flex items-center justify-center">
          <CardAnimation
            sharepack={selectedSharepack}
            prefersReducedMotion={prefersReducedMotion}
            onComplete={handleAnimationComplete}
          />
          
          <DispensingEffect isActive={isComplete} />
        </div>
      </div>
    </AnimatePresence>
  );
}