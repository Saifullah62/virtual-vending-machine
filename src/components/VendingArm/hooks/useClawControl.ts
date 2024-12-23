import { useState, useEffect } from 'react';

interface ClawControl {
  gripStrength: number;
  servoPosition: number;
  isGripping: boolean;
}

export function useClawControl(isGrabbing: boolean): ClawControl {
  const [gripStrength, setGripStrength] = useState(0);
  const [servoPosition, setServoPosition] = useState(0);
  const [isGripping, setIsGripping] = useState(false);

  useEffect(() => {
    if (isGrabbing) {
      setIsGripping(true);
      setGripStrength(10);
      setServoPosition(45);
    } else {
      setIsGripping(false);
      setGripStrength(0);
      setServoPosition(0);
    }
  }, [isGrabbing]);

  return {
    gripStrength,
    servoPosition,
    isGripping,
  };
}