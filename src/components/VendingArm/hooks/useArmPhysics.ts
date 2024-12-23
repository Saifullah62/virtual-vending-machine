import { useMemo } from 'react';

interface ArmPhysics {
  dampingFactor: number;
  springStrength: number;
  maxTorque: number;
}

export function useArmPhysics(length: number): ArmPhysics {
  return useMemo(() => {
    // Calculate optimal damping based on arm length
    const dampingFactor = Math.max(20, 30 - length * 0.1);
    
    // Adjust spring strength for different arm lengths
    const springStrength = Math.max(200, 300 - length * 0.5);
    
    // Calculate maximum torque based on length
    const maxTorque = Math.min(100, 150 - length * 0.2);

    return {
      dampingFactor,
      springStrength,
      maxTorque,
    };
  }, [length]);
}