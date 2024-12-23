import React from 'react';
import { motion } from 'framer-motion';

export function CardGleamEffect() {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -rotate-45" />
    </motion.div>
  );
}