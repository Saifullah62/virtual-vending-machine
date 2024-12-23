import { create } from 'zustand';

interface SoundState {
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
}

export const useSoundStore = create<SoundState>((set) => ({
  isMuted: false,
  volume: 0.5,
  
  toggleMute: () => set((state) => ({ 
    isMuted: !state.isMuted 
  })),
  
  setVolume: (volume: number) => set({ 
    volume: Math.max(0, Math.min(1, volume)) 
  }),
}));