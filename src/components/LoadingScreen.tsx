import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onContentReady: () => void;
  onComplete: () => void;
}

export default function LoadingScreen({ onContentReady, onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const counter = counterRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!container || !counter || !left || !right) return;

    const obj = { val: 0 };

    const tl = gsap.timeline();

    // Non-linear counter: slow-fast-slow
    tl.to(obj, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        counter.textContent = String(Math.round(obj.val)).padStart(3, '0');
      },
    });

    // Brief hold at 100
    tl.to({}, { duration: 0.15 });

    // Fade counter
    tl.to(counter, {
      opacity: 0,
      duration: 0.15,
      ease: 'power2.in',
    });

    // Signal content to render — content appears behind the curtains
    tl.call(() => {
      onContentReady();
    });

    // Tiny delay for React to mount content
    tl.to({}, { duration: 0.05 });

    // Curtain split — fast, with out easing (no slow start)
    tl.to(left, {
      xPercent: -100,
      duration: 0.7,
      ease: 'power2.out',
    });

    tl.to(right, {
      xPercent: 100,
      duration: 0.7,
      ease: 'power2.out',
    }, '<');

    // Curtains are fully open — signal hero to start its entrance
    tl.call(() => {
      window.dispatchEvent(new Event('curtainOpen'));
    });

    // Remove loading screen from DOM
    tl.call(() => {
      onComplete();
    });

    // Preload fonts
    document.fonts.ready.then(() => {
      // Fonts loaded — counter continues as normal
    });

    return () => {
      tl.kill();
    };
  }, [onContentReady, onComplete]);

  return (
    <div ref={containerRef} className="loading-screen">
      <div ref={leftRef} className="loading-screen__curtain loading-screen__curtain--left" />
      <div ref={rightRef} className="loading-screen__curtain loading-screen__curtain--right" />
      <span ref={counterRef} className="loading-screen__counter">000</span>
    </div>
  );
}
