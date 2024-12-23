import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PackCardProps {
  pack: {
    id: string;
    name: string;
    price: number;
    color: string;
    description: string;
    image: string;
  };
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}

export function PackCard({ pack, isSelected, isDisabled, onSelect }: PackCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      disabled={isDisabled}
      className={`
        relative w-full aspect-[3/4] rounded-xl overflow-hidden
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      whileHover={!isDisabled ? { scale: 1.02 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${pack.color}`} />
      
      {/* Image */}
      <div className="absolute inset-0">
        <img 
          src={pack.image}
          alt={pack.name}
          className="w-full h-full object-cover opacity-80 mix-blend-overlay"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white text-shadow">{pack.name}</h3>
          <p className="text-sm text-white/90">{pack.description}</p>
        </div>

        <div className="text-xl font-bold text-white text-shadow">
          ${pack.price.toFixed(2)}
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-primary" />
        </div>
      )}

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.button>
  );
}