import { create } from 'zustand';

interface LightingState {
  intensity: number;
  setIntensity: (value: number) => void;
}

export const useLightingStore = create<LightingState>((set) => ({
  intensity: 0.5,
  setIntensity: (value) => set({ intensity: value }),
}));