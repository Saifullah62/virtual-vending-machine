import { useSound } from '../../../hooks/useSound';
import { useCallback } from 'react';

export function useCardRevealSounds() {
  const { playSound: playSoundBase } = useSound();

  const soundEffects = {
    whoosh: 'whoosh',
    clank: 'clank',
    servo: 'servo',
    mechanism: 'mechanism',
    unwrap: 'unwrap',
    reveal: 'reveal',
  } as const;

  const playSound = useCallback((effect: keyof typeof soundEffects) => {
    playSoundBase(soundEffects[effect]);
  }, [playSoundBase]);

  const stopAllSounds = useCallback(() => {
    Object.values(soundEffects).forEach(sound => {
      // Add logic to stop specific sounds
    });
  }, []);

  return { playSound, stopAllSounds };
}