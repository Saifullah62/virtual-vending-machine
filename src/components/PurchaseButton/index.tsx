import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Loader } from 'lucide-react';
import { useVendingStore } from '../../store/useVendingStore';

interface PurchaseButtonProps {
  onPurchase: () => void;
  disabled?: boolean;
}

export function PurchaseButton({ onPurchase, disabled }: PurchaseButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { selectedSharepack } = useVendingStore();

  const handleClick = async () => {
    if (disabled || isLoading) return;
    setIsLoading(true);
    await onPurchase();
    setIsLoading(false);
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`
        relative overflow-hidden rounded-xl px-6 py-3
        bg-gradient-to-r from-primary to-primary/80
        text-white font-semibold
        transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <div className="flex items-center gap-2">
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <ShoppingCart className="w-5 h-5" />
        )}
        <span>
          {isLoading ? 'Processing...' : `Purchase ${selectedSharepack?.price ? `($${selectedSharepack.price})` : ''}`}
        </span>
      </div>
    </motion.button>
  );
}