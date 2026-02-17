import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ParallaxTarget {
  selector: string;
  intensity: number; // px of movement
}

const defaultTargets: ParallaxTarget[] = [
  { selector: '.grain-overlay', intensity: 2 },
  { selector: '.format-a__image, .format-b__image, .human__photo', intensity: 8 },
  { selector: '.sw-header__ghost, .sw-breathing__ghost, .format-b__number', intensity: 4 },
];

export default function useMouseParallax(targets: ParallaxTarget[] = defaultTargets) {
  const xRef = useRef(0);
  const yRef = useRef(0);

  useEffect(() => {
    // Only active on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1...1 from center
      xRef.current = (e.clientX / window.innerWidth - 0.5) * 2;
      yRef.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      targets.forEach(({ selector, intensity }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          gsap.to(el, {
            x: xRef.current * intensity,
            y: yRef.current * intensity,
            duration: 1,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    const tickerId = gsap.ticker.add(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(tickerId as unknown as gsap.TickerCallback);
    };
  }, [targets]);
}
