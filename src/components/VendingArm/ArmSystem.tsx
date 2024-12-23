import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useVendingStore } from '../../store/useVendingStore';

export function ArmSystem() {
  const controls = useAnimation();
  const { isVending, selectedSharepack } = useVendingStore();

  React.useEffect(() => {
    if (isVending) {
      const sequence = async () => {
        // Initial delay before arm appears
        await controls.start({
          opacity: 1,
          transition: { duration: 0.3 }
        });

        // Move to pack position (50% slower)
        await controls.start({
          x: selectedSharepack ? "25%" : 0,
          y: "50%",
          transition: { duration: 0.75, ease: "easeInOut" }
        });

        // Grab animation
        await controls.start({
          scale: 1.05,
          transition: { duration: 0.3 }
        });

        // Move down with pack (50% slower)
        await controls.start({
          y: "80%",
          transition: { duration: 0.75, ease: "easeIn" }
        });

        // Release
        await controls.start({
          scale: 1,
          transition: { duration: 0.3 }
        });

        // Return to hidden position
        await controls.start({
          opacity: 0,
          transition: { duration: 0.3, delay: 0.2 }
        });
      };

      sequence();
    }
  }, [isVending, controls, selectedSharepack]);

  if (!isVending) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Vertical Track */}
      <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Arm Assembly */}
      <motion.div
        className="absolute left-1/2 top-[10%]"
        initial={{ opacity: 0 }}
        animate={controls}
      >
        {/* Main Arm */}
        <motion.div
          className="relative w-1 h-12 bg-gradient-to-b from-gray-600 to-gray-700"
          animate={isVending ? {
            rotateZ: [-5, 5, -5],
          } : {}}
          transition={{ duration: 3, repeat: Infinity }} // Slower rotation
        >
          {/* Claw */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            animate={isVending ? {
              scaleX: [1, 1.2, 1],
            } : {}}
            transition={{ duration: 1.5 }} // Slower claw movement
          >
            <div className="flex gap-0.5">
              <motion.div
                className="w-0.5 h-4 bg-gray-600"
                animate={isVending ? { rotate: [-20, 0, -20] } : {}}
                transition={{ duration: 1.5 }}
              />
              <motion.div
                className="w-0.5 h-4 bg-gray-600"
                animate={isVending ? { rotate: [20, 0, 20] } : {}}
                transition={{ duration: 1.5 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}