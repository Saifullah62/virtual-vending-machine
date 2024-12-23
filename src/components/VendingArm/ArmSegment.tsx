import React from 'react';
import { motion } from 'framer-motion';
import { useArmPhysics } from './useArmPhysics';

interface ArmSegmentProps {
  length: number;
  angle: number;
  thickness: number;
  isGrabbing: boolean;
}

export function ArmSegment({ length, angle, thickness, isGrabbing }: ArmSegmentProps) {
  const { dampingFactor, springStrength } = useArmPhysics(length);

  return (
    <motion.div
      className="origin-top bg-gradient-to-b from-gray-600 to-gray-700"
      style={{
        width: `${thickness}px`,
        height: `${length}px`,
        borderRadius: `${thickness / 2}px`,
      }}
      animate={{
        rotateZ: angle,
        scale: isGrabbing ? [1, 1.02, 1] : 1,
      }}
      transition={{
        type: "spring",
        stiffness: springStrength,
        damping: dampingFactor,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
    </motion.div>
  );
}