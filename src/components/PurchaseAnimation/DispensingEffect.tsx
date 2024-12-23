import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DispensingEffectProps {
  isActive: boolean;
}

export function DispensingEffect({ isActive }: DispensingEffectProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="relative">
            {/* Collection Tray */}
            <div className="w-64 h-16 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
            
            {/* Impact Ripple */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <div className="w-full h-full bg-white/10 rounded-t-lg" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}