import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useVendingStore } from '../store/useVendingStore';
import { useLightingSystem } from '../effects/useLightingSystem';

const demoSharepacks = [
  {
    id: 'pack1',
    name: 'Standard Pack',
    image: 'https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?auto=format&fit=crop&q=80&w=400',
    color: 'from-blue-600 to-blue-800',
    foilColor: 'from-blue-400/30 to-purple-400/30',
    price: 5,
  },
  {
    id: 'pack2',
    name: 'Premium Pack',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&q=80&w=400',
    color: 'from-purple-600 to-purple-800',
    foilColor: 'from-purple-400/30 to-pink-400/30',
    price: 10,
  },
  {
    id: 'pack3',
    name: 'Ultra Pack',
    image: 'https://images.unsplash.com/photo-1607893378714-007fd47c8719?auto=format&fit=crop&q=80&w=400',
    color: 'from-amber-600 to-amber-800',
    foilColor: 'from-yellow-400/30 to-amber-400/30',
    price: 20,
  },
];

export function RotatingDisplay() {
  const controls = useAnimation();
  const { isVending } = useVendingStore();
  const { lightRef, brightness } = useLightingSystem({
    baseIntensity: 0.8,
    spotlightIntensity: 1,
    ambientIntensity: 0.5,
  });

  React.useEffect(() => {
    controls.start({
      rotateY: [0, 360],
      transition: {
        duration: 8,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <div className="relative w-full h-full perspective-1000" ref={lightRef}>
      {/* Dynamic Lighting Effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-blue-400/20 via-transparent to-transparent"
        animate={{
          opacity: brightness,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      
      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2), transparent 60%)',
            'radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.2), transparent 60%)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-48 h-64"
          animate={controls}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {demoSharepacks.map((pack, index) => (
            <motion.div
              key={pack.id}
              className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                transform: `rotateY(${index * 120}deg) translateZ(100px)`,
              }}
              animate={isVending ? { scale: [1, 0.9, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {/* Card Pack Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pack.color}`} />
              
              {/* Card Pack Image */}
              <div className="absolute inset-0">
                <img 
                  src={pack.image} 
                  alt={pack.name}
                  className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                />
              </div>
              
              {/* Enhanced Holographic Effect */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${pack.foilColor}`}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  background: [
                    `linear-gradient(45deg, ${pack.foilColor.split(' ')[1]} 0%, transparent 100%)`,
                    `linear-gradient(225deg, ${pack.foilColor.split(' ')[1]} 0%, transparent 100%)`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-4 text-white">
                <motion.div 
                  className="text-2xl font-bold mb-2 text-shadow-lg"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(255,255,255,0.5)',
                      '0 0 20px rgba(255,255,255,0.7)',
                      '0 0 10px rgba(255,255,255,0.5)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {pack.name}
                </motion.div>
                <div className="text-lg font-medium text-shadow">${pack.price}</div>
                
                {/* Enhanced Premium Badge */}
                <motion.div 
                  className="absolute top-4 right-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xs font-bold">PRO</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Enhanced Edge Highlights */}
              <motion.div 
                className="absolute inset-0 border border-white/20 rounded-lg"
                animate={{
                  boxShadow: [
                    'inset 0 0 10px rgba(255,255,255,0.2)',
                    'inset 0 0 20px rgba(255,255,255,0.4)',
                    'inset 0 0 10px rgba(255,255,255,0.2)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}