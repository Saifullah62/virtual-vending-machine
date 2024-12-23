import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useVendingStore } from '../../store/useVendingStore';
import { ArmSegment } from './ArmSegment';
import { Claw } from './Claw';
import { useLightingSystem } from '../../effects/useLightingSystem';
import { useSound } from '../../hooks/useSound';

export function VendingArm() {
  const { isVending, selectedSharepack } = useVendingStore();
  const controls = useAnimation();
  const { lightRef, brightness } = useLightingSystem({
    baseIntensity: 0.6,
    spotlightIntensity: 1,
    ambientIntensity: 0.3,
  });
  const { playSound } = useSound();

  React.useEffect(() => {
    if (isVending) {
      const sequence = async () => {
        // Move to pack position
        await controls.start({
          top: "50%",
          rotateZ: 0,
          transition: { duration: 1, ease: "easeInOut" }
        });
        
        playSound('servo');
        
        // Grab animation
        await controls.start({
          scale: 1.05,
          transition: { duration: 0.3 }
        });
        
        playSound('grab');
        
        // Move down with pack
        await controls.start({
          top: "70%",
          transition: { duration: 0.5, ease: "easeIn" }
        });
        
        playSound('drop');
        
        // Release and return
        await controls.start({
          scale: 1,
          top: "10%",
          transition: { duration: 1, ease: "easeOut" }
        });
      };
      
      sequence();
    }
  }, [isVending, controls, playSound]);

  return (
    <div className="absolute inset-0 pointer-events-none" ref={lightRef}>
      {/* Vertical Track with LED Strip */}
      <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700 transform -translate-x-1/2">
        <motion.div
          className="absolute inset-0 bg-blue-400/30"
          animate={{
            opacity: brightness,
          }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
      </div>
      
      {/* Main Arm Assembly */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2"
        initial={{ top: "10%" }}
        animate={controls}
      >
        {/* Servo Motor Housing */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8">
          <motion.div
            className="w-full h-full bg-gray-600 rounded-full border-2 border-gray-700"
            animate={{
              rotateZ: isVending ? [0, 180, 360] : 0,
            }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: isVending ? Infinity : 0,
            }}
          >
            <div className="absolute inset-2 bg-gray-700 rounded-full">
              <motion.div
                className="absolute inset-[2px] bg-gray-800 rounded-full"
                animate={{
                  rotateZ: isVending ? [0, 180, 360] : 0,
                }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat: isVending ? Infinity : 0,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Upper Arm with LED Accent */}
        <div className="relative mt-8">
          <ArmSegment
            length={40}
            angle={0}
            thickness={8}
            isGrabbing={isVending}
          />
          <motion.div
            className="absolute inset-0 bg-blue-400/20"
            animate={{
              opacity: brightness,
            }}
          />
          
          {/* Lower Arm Assembly */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <ArmSegment
              length={30}
              angle={0}
              thickness={6}
              isGrabbing={isVending}
            />
            
            {/* Claw Assembly with Dynamic Lighting */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <motion.div
                className="absolute -inset-4 bg-blue-400/30 rounded-full blur-md"
                animate={{
                  scale: isVending ? [1, 1.2, 1] : 1,
                  opacity: brightness,
                }}
                transition={{ duration: 0.5 }}
              />
              <Claw
                isGrabbing={isVending}
                width={24}
                height={32}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}