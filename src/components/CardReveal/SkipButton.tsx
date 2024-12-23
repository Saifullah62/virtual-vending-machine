import React from 'react';
import { motion } from 'framer-motion';
import { SkipForward } from 'lucide-react';

interface SkipButtonProps {
  onClick: () => void;
}

export function SkipButton({ onClick }: SkipButtonProps) {
  return (
    <motion.button
      className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <SkipForward className="w-6 h-6 text-white" />
    </motion.button>
  );
}