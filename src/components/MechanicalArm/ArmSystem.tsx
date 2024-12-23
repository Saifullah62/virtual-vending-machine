import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useVendingStore } from '../../store/useVendingStore';

export function ArmSystem() {
  const controls = useAnimation();
  const { isVending, selectedSharepack } = useVendingStore();

  React.useEffect(() => {
    if (isVending) {
      controls.start({
        x: [0, 100, 0],
        y: [0, 50, 100],
        transition: {
          duration: 2,
          times: [0, 0.5, 1],
          ease: "easeInOut",
        },
      });
    }
  }, [isVending, controls]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Vertical Track */}
      <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Arm Assembly */}
      <motion.div
        className="absolute left-1/2 top-[10%]"
        animate={controls}
      >
        {/* Main Arm */}
        <div className="relative">
          <motion.div
            className="w-2 h-32 bg-gradient-to-b from-gray-600 to-gray-700 origin-top"
            animate={isVending ? {
              rotateZ: [0, -20, 0],
            } : {}}
            transition={{ duration: 2 }}
          />
          
          {/* Claw */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            animate={isVending ? {
              scaleX: [1, 1.2, 1],
            } : {}}
          >
            <div className="flex gap-1">
              <motion.div
                className="w-1 h-8 bg-gray-600 origin-top"
                animate={isVending ? { rotate: [-20, 0, -20] } : {}}
              />
              <motion.div
                className="w-1 h-8 bg-gray-600 origin-top"
                animate={isVending ? { rotate: [20, 0, 20] } : {}}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}