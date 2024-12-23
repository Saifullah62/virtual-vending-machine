import React from 'react';
import { Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { useVendingStore } from '../store/useVendingStore';
import { Display } from './Display';
import { Controls } from './Controls';
import { VendingArm } from './VendingArm';
import { SharepackSlot } from './SharepackSlot';
import { VendingGlass } from './VendingGlass';
import { ParticleEffect } from './ParticleEffect';
import { AchievementPopup } from './AchievementPopup';
import { RotatingDisplay } from './RotatingDisplay';
import { AdminPanel } from './Admin/AdminPanel';
import { LightingSystem } from './LightingSystem';
import { DispenserUnit } from './DispenserUnit';
import { PackSelection } from './PackSelection';
import { CardRevealSequence } from './CardReveal/CardRevealSequence';
import { useDatabase } from '../hooks/useDatabase';
import { Logo } from './Logo';
import { DemoButton } from './DemoButton';

export function VendingMachine() {
  const { isVending, selectedSharepack, purchaseSharepack } = useVendingStore();
  const { connect } = useDatabase();
  const [showReveal, setShowReveal] = React.useState(false);
  const [isDemoActive, setIsDemoActive] = React.useState(false);

  React.useEffect(() => {
    connect();
  }, [connect]);

  const handleDemoClick = async () => {
    if (isDemoActive) return;
    setIsDemoActive(true);
    
    try {
      await purchaseSharepack();
      setTimeout(() => {
        setShowReveal(true);
      }, 2000);
    } finally {
      setTimeout(() => {
        setIsDemoActive(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <DemoButton
        onClick={handleDemoClick}
        isDisabled={isDemoActive || isVending}
        isActive={isDemoActive}
      />

      <div className="relative w-[50px] xs:w-[350px] sm:w-[400px] md:w-[500px] mx-auto">
        {/* Machine Frame */}
        <div className="absolute inset-0 bg-secondary rounded-3xl transform -skew-x-1 scale-[1.02] opacity-80 blur-sm" />
        <div className="relative bg-secondary rounded-3xl shadow-2xl overflow-hidden">
          {/* Machine Header */}
          <div className="relative p-3 xs:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 xs:p-2 bg-primary rounded-full shadow-neon">
                  <Logo className="w-4 h-4 xs:w-6 xs:h-6" />
                </div>
                <span className="text-sm xs:text-base md:text-xl font-bold text-white tracking-wide">
                  SharePacks™
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 0.8, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
          </div>

          {/* Machine Content */}
          <div className="relative p-3 xs:p-4 md:p-6 space-y-3 xs:space-y-4 md:space-y-6">
            <Display />
            <PackSelection />
            
            {/* Display Window */}
            <div className="relative h-[200px] xs:h-[300px] md:h-[400px] bg-white/95 rounded-2xl overflow-hidden">
              <VendingGlass />
              <LightingSystem />
              <RotatingDisplay />
              <VendingArm />
              <SharepackSlot />
              <DispenserUnit />
              <ParticleEffect isActive={isVending} />
            </div>
          </div>

          {/* Machine Base */}
          <div className="relative h-4 xs:h-6 md:h-8 bg-secondary-dark">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
          </div>
        </div>

        {/* Edge Lighting */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </div>
      
      <AdminPanel />
      <AchievementPopup achievement={null} />
      
      {showReveal && selectedSharepack && (
        <CardRevealSequence
          packId={selectedSharepack.id}
          onComplete={() => {
            setShowReveal(false);
            setIsDemoActive(false);
          }}
        />
      )}
    </div>
  );
}