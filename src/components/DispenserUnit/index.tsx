import React from 'react';
import { motion } from 'framer-motion';
import { useVendingStore } from '../../store/useVendingStore';

export function DispenserUnit() {
  const { isVending } = useVendingStore();

  return (
    <div className="absolute bottom-0 left-0 right-0 h-24">
      {/* Dispenser Slot */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-16">
        <div className="relative w-full h-full">
          {/* Slot Frame */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>

          {/* Delivery Door */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-600 to-gray-700"
            animate={isVending ? {
              scaleY: [1, 0, 1],
              transition: { delay: 1.5, duration: 0.3 },
            } : {}}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>

          {/* Interior Light */}
          <motion.div
            className="absolute inset-2 bg-blue-400/10 rounded-lg blur-sm"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </div>
      </div>
    </div>
  );
}