import { useMemo } from 'react';
import { useSpring } from '@react-spring/web';

export function useOptimizedEffects() {
  const [springs, api] = useSpring(() => ({
    scale: 1,
    rotation: 0,
    opacity: 1,
  }));

  const memoizedAnimations = useMemo(
    () => ({
      idle: {
        scale: [1, 1.02, 1],
        rotation: [0, 1, 0],
        opacity: 1,
        config: { tension: 120, friction: 14 },
      },
      active: {
        scale: 1.1,
        rotation: 5,
        opacity: 1,
      },
      disabled: {
        scale: 0.95,
        rotation: 0,
        opacity: 0.7,
      },
    }),
    []
  );

  return {
    springs,
    api,
    animations: memoizedAnimations,
  };
}