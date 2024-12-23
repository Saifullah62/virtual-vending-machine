import React from 'react';
import { motion } from 'framer-motion';
import { useVendingStore } from '../store/useVendingStore';

export function VendingArm() {
  const { isVending } = useVendingStore();

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Vertical Track */}
      <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-gray-700 transform -translate-x-1/2" />
      
      {/* Mechanical Arm */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2"
        initial={{ top: "10%" }}
        animate={isVending ? {
          top: ["10%", "70%", "10%"],
        } : { top: "10%" }}
        transition={{
          duration: 2,
          times: [0, 0.7, 1],
          ease: "easeInOut"
        }}
      >
        {/* Arm Base */}
        <div className="relative">
          <div className="absolute w-8 h-8 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-gray-700" />
          
          {/* Claw */}
          <motion.div
            className="absolute top-4 left-1/2 transform -translate-x-1/2"
            animate={isVending ? {
              scaleY: [1, 1.2, 1],
              scaleX: [1, 0.8, 1]
            } : {}}
            transition={{ duration: 2, times: [0, 0.7, 1] }}
          >
            <div className="w-12 h-16 flex justify-between">
              <div className="w-2 h-full bg-gray-600 rounded-b-lg transform origin-top rotate-[-20deg]" />
              <div className="w-2 h-full bg-gray-600 rounded-b-lg transform origin-top rotate-[20deg]" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}