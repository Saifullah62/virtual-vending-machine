import React from 'react';
import { useVendingStore } from '../store/useVendingStore';
import { motion } from 'framer-motion';

export function Display() {
  const { balance, selectedSharepack } = useVendingStore();

  return (
    <div className="glass-card rounded-2xl p-4 md:p-6 space-y-4">
      <div className="bg-black/90 rounded-xl p-3 md:p-4 shadow-inner">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-primary digital-display tracking-wider">BALANCE:</span>
            <motion.span 
              className="text-primary digital-display text-xl md:text-2xl font-bold tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={balance}
            >
              ${balance.toFixed(2)}
            </motion.span>
          </div>
          {selectedSharepack && (
            <div className="flex justify-between items-center">
              <span className="text-primary digital-display tracking-wider">SELECTED:</span>
              <span className="text-primary digital-display text-xl md:text-2xl font-bold tracking-widest">
                ${selectedSharepack.price.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center">
        <motion.div
          className="text-secondary text-sm font-medium tracking-wide"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          INSERT MONEY TO START
        </motion.div>
      </div>
    </div>
  );
}