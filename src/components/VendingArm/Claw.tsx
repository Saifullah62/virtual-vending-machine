import React from 'react';
import { motion } from 'framer-motion';
import { useClawControl } from './useClawControl';

interface ClawProps {
  isGrabbing: boolean;
  width: number;
  height: number;
}

export function Claw({ isGrabbing, width, height }: ClawProps) {
  const { gripStrength, servoPosition } = useClawControl(isGrabbing);

  return (
    <motion.div className="relative" style={{ width, height }}>
      {/* Left Pincer */}
      <motion.div
        className="absolute left-0 top-0 w-2 bg-gray-600 rounded-b-lg origin-top"
        style={{ height: '100%' }}
        animate={{
          rotateZ: isGrabbing ? -20 - gripStrength : -20,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-transparent" />
      </motion.div>

      {/* Right Pincer */}
      <motion.div
        className="absolute right-0 top-0 w-2 bg-gray-600 rounded-b-lg origin-top"
        style={{ height: '100%' }}
        animate={{
          rotateZ: isGrabbing ? 20 + gripStrength : 20,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-500/20" />
      </motion.div>

      {/* Servo Motor */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-500 rounded-full"
        animate={{
          rotateZ: servoPosition,
        }}
      >
        <div className="absolute inset-1 bg-gray-600 rounded-full">
          <div className="absolute inset-[2px] bg-gray-700 rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}