import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rPathRef = useRef<SVGPathElement>(null);
  const gPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const rPath = rPathRef.current;
    const gPath = gPathRef.current;
    const container = containerRef.current;

    if (!rPath || !gPath || !container) return;

    // Get the length of each path for stroke animation
    const rLength = rPath.getTotalLength();
    const gLength = gPath.getTotalLength();

    // Set initial state - paths invisible
    gsap.set(rPath, {
      strokeDasharray: rLength,
      strokeDashoffset: rLength,
    });
    gsap.set(gPath, {
      strokeDasharray: gLength,
      strokeDashoffset: gLength,
    });

    // Create animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out and call onComplete
        gsap.to(container, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: onComplete,
        });
      },
    });

    // Draw R
    tl.to(rPath, {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'power2.inOut',
    });

    // Draw G (starts at 0.5s overlap)
    tl.to(
      gPath,
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'power2.inOut',
      },
      '-=0.5'
    );

    // Brief hold
    tl.to({}, { duration: 0.3 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loading-screen">
      <svg
        className="loading-svg"
        viewBox="0 0 220 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Smooth R - continuous flowing curve */}
        <path
          ref={rPathRef}
          className="loading-path"
          d="M15 90 L15 10 Q15 5 20 5 L45 5 Q65 5 65 25 Q65 45 45 45 L30 45 Q25 45 30 50 L60 90"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Smooth G - continuous flowing curve */}
        <path
          ref={gPathRef}
          className="loading-path"
          d="M155 30 Q155 5 130 5 Q100 5 100 30 L100 70 Q100 95 130 95 Q160 95 160 70 L160 50 L130 50"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
