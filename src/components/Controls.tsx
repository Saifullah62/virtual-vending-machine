import React from 'react';
import { useVendingStore } from '../store/useVendingStore';
import { DollarSign, ShoppingCart, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PaymentModal } from './PaymentModal';

export function Controls() {
  const { purchaseSharepack, selectedSharepack, balance } = useVendingStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
  const [isDemoActive, setIsDemoActive] = React.useState(false);

  const handlePurchase = async () => {
    if (selectedSharepack) {
      await purchaseSharepack();
    }
  };

  const handleDemoPurchase = async () => {
    if (isDemoActive) return;
    setIsDemoActive(true);
    
    // Simulate the purchase flow
    setTimeout(() => {
      purchaseSharepack();
      setTimeout(() => {
        setIsDemoActive(false);
      }, 5000); // Reset after animation completes
    }, 1000);
  };

  return (
    <>
      <div className="glass-card rounded-2xl p-6">
        <div className="grid grid-cols-2 gap-6">
          <motion.button
            onClick={() => setIsPaymentModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden group bg-primary rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="w-5 h-5" />
              <span className="font-bold">Add Funds</span>
            </div>
          </motion.button>
          
          <motion.button
            onClick={handlePurchase}
            disabled={!selectedSharepack || balance < (selectedSharepack?.price || 0)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden group bg-secondary rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-bold">Purchase</span>
            </div>
          </motion.button>
        </div>

        {/* Demo Purchase Button */}
        {!selectedSharepack && (
          <motion.button
            onClick={handleDemoPurchase}
            disabled={isDemoActive}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full mt-4 overflow-hidden group bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-center gap-2">
              <PlayCircle className="w-5 h-5" />
              <span className="font-bold">Demo Purchase</span>
            </div>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white"
              initial={{ width: "0%" }}
              animate={isDemoActive ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-emerald-500/20 blur"
              animate={isDemoActive ? {
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              } : {}}
              transition={{ duration: 2, repeat: isDemoActive ? Infinity : 0 }}
            />
          </motion.button>
        )}

        {/* Tooltip */}
        {!selectedSharepack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-center text-sm text-gray-600"
          >
            Try a demo purchase to see the vending machine in action!
          </motion.div>
        )}
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={5}
      />
    </>
  );
}