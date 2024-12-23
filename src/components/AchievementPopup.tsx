import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AchievementPopupProps {
  achievement: {
    title: string;
    description: string;
    icon: string;
  } | null;
}

export function AchievementPopup({ achievement }: AchievementPopupProps) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{achievement.icon}</span>
            <div>
              <h3 className="font-bold">{achievement.title}</h3>
              <p className="text-sm opacity-90">{achievement.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}