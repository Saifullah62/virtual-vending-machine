import React from 'react';
import { motion } from 'framer-motion';
import { useVendingStore } from '../../store/useVendingStore';
import { PackGrid } from './PackGrid';
import { PaymentModal } from '../PaymentModal';

export function PackSelection() {
  const { balance, selectedSharepack } = useVendingStore();
  const [showPayment, setShowPayment] = React.useState(false);

  return (
    <div className="space-y-4">
      {/* Balance Display */}
      <div className="flex justify-between items-center">
        <span className="text-white/80">Your Balance:</span>
        <motion.span
          className="text-xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={balance}
        >
          ${balance.toFixed(2)}
        </motion.span>
      </div>

      {/* Pack Selection */}
      <PackGrid />

      {/* Add Funds Button */}
      <motion.button
        onClick={() => setShowPayment(true)}
        className="w-full px-4 py-3 bg-primary text-white rounded-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Add Funds
      </motion.button>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        amount={selectedSharepack?.price || 5.00}
      />
    </div>
  );
}