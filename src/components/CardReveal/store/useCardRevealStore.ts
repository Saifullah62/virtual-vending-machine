import { create } from 'zustand';

export type CardRevealPhase = 'drop' | 'dispenser' | 'unwrap' | 'reveal';

interface CardRevealState {
  currentPhase: CardRevealPhase;
  isSkipped: boolean;
  advancePhase: () => void;
  skipSequence: () => void;
}

export const useCardRevealStore = create<CardRevealState>((set) => ({
  currentPhase: 'drop',
  isSkipped: false,
  advancePhase: () => set((state) => {
    const phases: CardRevealPhase[] = ['drop', 'dispenser', 'unwrap', 'reveal'];
    const currentIndex = phases.indexOf(state.currentPhase);
    const nextPhase = phases[currentIndex + 1];
    return { currentPhase: nextPhase || 'reveal' };
  }),
  skipSequence: () => set({ isSkipped: true }),
}));