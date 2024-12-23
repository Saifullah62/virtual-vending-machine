import { Howl } from 'howler';

// Define all sound effects
const sounds = {
  // UI Sounds
  buttonClick: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3'],
    volume: 0.5,
  }),
  
  // Vending Machine Sounds
  servo: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-robot-servo-movement-1604.mp3'],
    volume: 0.5,
  }),
  grab: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-game-ball-tap-2073.mp3'],
    volume: 0.3,
  }),
  drop: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-plastic-bubble-click-1124.mp3'],
    volume: 0.4,
  }),
  
  // Card Pack Sounds
  whoosh: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-fast-small-sweep-transition-166.mp3'],
    volume: 0.3,
  }),
  clank: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-metal-hit-woosh-1485.mp3'],
    volume: 0.4,
  }),
  mechanism: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-mechanical-technology-shutdown-3171.mp3'],
    volume: 0.3,
  }),
  unwrap: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-paper-slide-1530.mp3'],
    volume: 0.4,
  }),
  reveal: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-magical-surprise-sparkle-671.mp3'],
    volume: 0.5,
  }),
  
  // Achievement Sounds
  achievement: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'],
    volume: 0.4,
  }),
  
  // Payment Sounds
  paymentSuccess: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-coin-win-notification-1992.mp3'],
    volume: 0.4,
  }),
  paymentError: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'],
    volume: 0.4,
  }),
};

export function useSound() {
  const playSound = (soundName: keyof typeof sounds) => {
    sounds[soundName].play();
  };

  const stopSound = (soundName: keyof typeof sounds) => {
    sounds[soundName].stop();
  };

  const stopAllSounds = () => {
    Object.values(sounds).forEach(sound => sound.stop());
  };

  return { playSound, stopSound, stopAllSounds };
}