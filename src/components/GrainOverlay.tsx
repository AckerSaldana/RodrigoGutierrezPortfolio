import { useEffect } from 'react';
import './GrainOverlay.css';

export default function GrainOverlay() {
  useEffect(() => {
    // Check for reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    // Animate baseFrequency for subtle shimmer
    let frame: number;
    let t = 0;
    const turbulence = document.getElementById('grain-turbulence');
    if (!turbulence) return;

    const animate = () => {
      t += 0.15;
      const val = 0.65 + Math.sin(t) * 0.02;
      turbulence.setAttribute('baseFrequency', `${val}`);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="grain-overlay" aria-hidden="true">
      <svg>
        <filter id="grain-filter">
          <feTurbulence
            id="grain-turbulence"
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
