import { useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/web';

interface LightingConfig {
  baseIntensity: number;
  spotlightIntensity: number;
  ambientIntensity: number;
}

export function useLightingSystem(config: LightingConfig) {
  const lightRef = useRef<HTMLDivElement>(null);
  const [{ brightness }, api] = useSpring(() => ({
    brightness: config.baseIntensity,
    config: { tension: 120, friction: 14 },
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      api.start({
        brightness: config.baseIntensity + Math.random() * 0.1,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [api, config.baseIntensity]);

  const updateSpotlight = (x: number, y: number) => {
    if (!lightRef.current) return;
    const rect = lightRef.current.getBoundingClientRect();
    const relativeX = (x - rect.left) / rect.width;
    const relativeY = (y - rect.top) / rect.height;
    
    return {
      x: relativeX * 100,
      y: relativeY * 100,
      intensity: config.spotlightIntensity,
    };
  };

  return { lightRef, brightness, updateSpotlight };
}