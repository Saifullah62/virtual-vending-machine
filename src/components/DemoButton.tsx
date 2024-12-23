import React from 'react';
import { PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useVendingStore } from '../store/useVendingStore';

interface DemoButtonProps {
  onClick: () => void;
  isDisabled: boolean;
  isActive: boolean;
}

export function DemoButton({ onClick, isDisabled, isActive }: DemoButtonProps) {
  const { startDemoPurchase } = useVendingStore();

  const handleClick = () => {
    if (!isDisabled) {
      startDemoPurchase();
      onClick();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        fixed top-4 left-4 px-6 py-3 
        bg-gradient-to-r from-primary to-primary-dark
        text-white rounded-full shadow-lg
        flex items-center gap-2 transition-all duration-300
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-neon'}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <PlayCircle className="w-5 h-5" />
      <span className="font-semibold">Try Demo</span>
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
        />
      )}
    </motion.button>
  );
}