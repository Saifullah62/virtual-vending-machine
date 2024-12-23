import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, VolumeIcon } from 'lucide-react';
import { useSoundStore } from '../store/useSoundStore';

export function SoundControls() {
  const { isMuted, volume, toggleMute, setVolume } = useSoundStore();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2">
      <motion.button
        onClick={toggleMute}
        className="p-2 bg-white/10 backdrop-blur-sm rounded-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : volume > 0.5 ? (
          <Volume2 className="w-5 h-5 text-white" />
        ) : (
          <VolumeIcon className="w-5 h-5 text-white" />
        )}
      </motion.button>

      <div className="w-24 bg-white/10 backdrop-blur-sm rounded-full p-2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full accent-primary"
        />
      </div>
    </div>
  );
}