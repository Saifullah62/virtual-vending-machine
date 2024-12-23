import { useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

export function useParallaxLayers() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useGesture({
    onMove: ({ xy: [px, py] }) => {
      api.start({
        x: (px - window.innerWidth / 2) / 50,
        y: (py - window.innerHeight / 2) / 50,
      });
    },
  });

  const calculateOffset = (depth: number) => ({
    transform: `translate3d(${x.to(x => x * depth)}px, ${y.to(y => y * depth)}px, 0)`,
  });

  return { bind, calculateOffset };
}