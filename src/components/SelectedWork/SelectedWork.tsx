import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import ProjectSection from './ProjectSection';
import ProjectCounter from './ProjectCounter';
import type { VariantKey } from './ProjectSection';
import './SelectedWork.css';

gsap.registerPlugin(ScrollTrigger);

const VARIANTS: VariantKey[] = ['A', 'B', 'C', 'D'];

export default function SelectedWork() {
  const headerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const charIndexRef = useRef(0);

  useEffect(() => {
    const header = headerRef.current;
    const chars = charsRef.current.filter(Boolean);
    if (!header || chars.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    gsap.set(chars, { opacity: 0.1 });

    const st = ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      end: 'top 30%',
      scrub: 1,
      animation: gsap.to(chars, {
        opacity: 1,
        stagger: 0.03,
        ease: 'none',
      }),
    });
    triggers.push(st);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // Reset counter before each render
  charIndexRef.current = 0;

  const renderChars = (text: string, isAccent?: boolean) => {
    return text.split('').map((char, i) => {
      if (char === ' ') return <span key={i}>&nbsp;</span>;
      const idx = charIndexRef.current++;
      return (
        <span
          key={i}
          ref={(el) => {
            charsRef.current[idx] = el;
          }}
          className={`sw-header__char${isAccent ? ' sw-header__char--accent' : ''}`}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section className="selected-work">
      <div ref={headerRef} className="sw-header">
        <h2 className="sw-header__title">
          {renderChars('SELECTED WORK')}
        </h2>
      </div>
      {projects.map((project, i) => (
        <ProjectSection
          key={project.id}
          project={project}
          variant={VARIANTS[i % 4]}
          style={{ zIndex: i + 1 }}
        />
      ))}
      <ProjectCounter
        total={projects.length}
        sectionSelector=".project-section"
        containerSelector=".selected-work"
      />
    </section>
  );
}
