import { useCallback } from 'react';
import { useSound } from './useSound';

export function useSoundEffects() {
  const { playSound } = useSound();

  const playVendingSequence = useCallback(async () => {
    // Play vending sequence sounds with proper timing
    playSound('servo');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    playSound('mechanism');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    playSound('grab');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    playSound('drop');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    playSound('clank');
  }, [playSound]);

  const playRevealSequence = useCallback(async () => {
    // Play card reveal sequence sounds
    playSound('whoosh');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    playSound('unwrap');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    playSound('reveal');
  }, [playSound]);

  const playUISound = useCallback((action: 'click' | 'success' | 'error') => {
    switch (action) {
      case 'click':
        playSound('buttonClick');
        break;
      case 'success':
        playSound('paymentSuccess');
        break;
      case 'error':
        playSound('paymentError');
        break;
    }
  }, [playSound]);

  return {
    playVendingSequence,
    playRevealSequence,
    playUISound,
  };
}