import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

type CursorState = 'default' | 'project' | 'link' | 'email' | 'drag' | 'scrolling';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // gsap.quickTo for smooth elastic follow
    xTo.current = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'elastic.out(1, 0.75)' });
    yTo.current = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'elastic.out(1, 0.75)' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo.current?.(e.clientX);
      yTo.current?.(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest('[data-cursor]');
      if (closest) {
        const cursorType = closest.getAttribute('data-cursor') as CursorState;
        setState(cursorType);
      } else if (target.closest('a, button')) {
        setState('link');
      } else {
        setState('default');
      }
    };

    const handleScroll = () => {
      setState('scrolling');
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setState('default'), 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  const labelMap: Record<CursorState, string> = {
    default: '',
    project: 'VIEW',
    link: '',
    email: '\u2192',
    drag: '\u27F7',
    scrolling: '',
  };

  return (
    <div ref={cursorRef} className={`custom-cursor custom-cursor--${state}`}>
      <div className="custom-cursor__circle">
        <span className="custom-cursor__label">{labelMap[state]}</span>
      </div>
    </div>
  );
}
