import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLightingStore } from './useLightingStore';

export function LightingSystem() {
  const controls = useAnimation();
  const { intensity, setIntensity } = useLightingStore();

  React.useEffect(() => {
    controls.start({
      opacity: [intensity * 0.8, intensity, intensity * 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [intensity, controls]);

  return (
    <>
      {/* Ambient Light */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-secondary-light/20 via-transparent to-transparent"
          animate={controls}
        />
      </div>

      {/* Edge Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Dynamic Spotlights */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, rgba(223, 70, 48, 0.1), transparent 60%)',
            'radial-gradient(circle at 70% 70%, rgba(0, 71, 171, 0.1), transparent 60%)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Reflection Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </>
  );
}