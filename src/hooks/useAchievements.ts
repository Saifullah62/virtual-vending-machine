import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

interface AchievementStore {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  purchaseCount: number;
  incrementPurchaseCount: () => void;
}

export const useAchievements = create<AchievementStore>()(
  persist(
    (set) => ({
      achievements: [
        {
          id: 'first_purchase',
          title: 'First Steps',
          description: 'Purchase your first SharePack',
          unlocked: false,
          icon: '🎯',
        },
        {
          id: 'five_streak',
          title: 'High Roller',
          description: 'Purchase 5 SharePacks in a row',
          unlocked: false,
          icon: '🎲',
        },
      ],
      purchaseCount: 0,
      unlockAchievement: (id) =>
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === id ? { ...achievement, unlocked: true } : achievement
          ),
        })),
      incrementPurchaseCount: () =>
        set((state) => ({ purchaseCount: state.purchaseCount + 1 })),
    }),
    {
      name: 'sharepack-achievements',
    }
  )
);