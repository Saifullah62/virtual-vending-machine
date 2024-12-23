import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Bitcoin } from 'lucide-react';
import { PaymentMethod } from '../../services/payments/types';

interface PaymentTabsProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentTabs({ selectedMethod, onSelect }: PaymentTabsProps) {
  return (
    <div className="flex gap-2 p-2 bg-gray-100 rounded-lg">
      <motion.button
        onClick={() => onSelect('stripe')}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
          selectedMethod === 'stripe' ? 'bg-white shadow-md' : 'hover:bg-white/50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <CreditCard className="w-5 h-5" />
        <span>Card</span>
      </motion.button>

      <motion.button
        onClick={() => onSelect('bsv')}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
          selectedMethod === 'bsv' ? 'bg-white shadow-md' : 'hover:bg-white/50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Bitcoin className="w-5 h-5" />
        <span>BSV</span>
      </motion.button>
    </div>
  );
}