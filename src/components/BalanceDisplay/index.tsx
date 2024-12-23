import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { useVendingStore } from '../../store/useVendingStore';

export function BalanceDisplay() {
  const { balance } = useVendingStore();

  return (
    <div className="relative p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
      <div className="flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-primary" />
        <motion.span
          key={balance}
          className="text-2xl font-bold text-primary font-mono"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {balance.toFixed(2)}
        </motion.span>
      </div>
      
      {/* LED Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: [
            '0 0 0px rgba(223, 70, 48, 0.3)',
            '0 0 20px rgba(223, 70, 48, 0.3)',
            '0 0 0px rgba(223, 70, 48, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </div>
  );
}