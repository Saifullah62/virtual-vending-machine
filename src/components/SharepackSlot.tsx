import React from 'react';
import { motion } from 'framer-motion';
import { useVendingStore } from '../store/useVendingStore';

export function SharepackSlot() {
  const { selectedSharepack, isVending } = useVendingStore();

  if (!selectedSharepack) {
    return null;
  }

  return (
    <motion.div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-64"
      initial={{ y: '100%' }}
      animate={isVending ? { y: 0 } : { y: '100%' }}
      transition={{ type: 'spring', damping: 20, delay: 1.5 }}
    >
      {/* Card Pack */}
      <div className="relative w-full h-full">
        {/* Front Face */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-xl border-2 border-purple-400 overflow-hidden">
          {selectedSharepack.revealed ? (
            <div className="p-4 space-y-2">
              {selectedSharepack.cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white/90 backdrop-blur-sm rounded p-2 text-sm"
                >
                  <p className="font-bold">{card.name}</p>
                  <p className="text-xs text-gray-600">
                    Shares: {card.availableShares}/{card.totalShares}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-4">
              <div className="text-white text-center">
                <p className="font-bold text-2xl mb-2">SharePack</p>
                <p className="text-sm opacity-75">Mystery Collection</p>
              </div>
              <div className="mt-4 text-6xl text-white/50">?</div>
            </div>
          )}
        </div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg pointer-events-none" />
      </div>
    </motion.div>
  );
}