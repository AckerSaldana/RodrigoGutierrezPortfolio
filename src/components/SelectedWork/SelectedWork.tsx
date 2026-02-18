import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type ProjectData } from '../../data/projects';
import FormatA from './FormatA';
import FormatB from './FormatB';
import FormatC from './FormatC';
import './SelectedWork.css';

gsap.registerPlugin(ScrollTrigger);

const FormatMap = { A: FormatA, B: FormatB, C: FormatC } as const;

interface Props {
  onProjectClick?: (project: ProjectData, e: React.MouseEvent) => void;
}

export default function SelectedWork({ onProjectClick }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const charIndexRef = useRef(0);
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const chars = charsRef.current.filter(Boolean);
    const ghost = ghostRef.current;
    if (!header || chars.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(chars, { opacity: 0.1 });

      ScrollTrigger.create({
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

      // Ghost parallax
      if (ghost) {
        gsap.to(ghost, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: header,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Reset counter before each render
  charIndexRef.current = 0;

  const renderChars = (text: string) => {
    return text.split('').map((char, i) => {
      if (char === ' ') return <span key={i}>&nbsp;</span>;
      const idx = charIndexRef.current++;
      return (
        <span
          key={i}
          ref={(el) => { charsRef.current[idx] = el; }}
          className="sw-header__char"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section className="selected-work">
      <div ref={headerRef} className="sw-header">
        <div ref={ghostRef} className="sw-header__ghost">03</div>
        <div>
          <h2 className="sw-header__title">{renderChars('SELECTED WORK')}</h2>
          <p className="sw-header__subtitle">2021&mdash;2025</p>
        </div>
      </div>

      {projects.map((project, i) => {
        const FormatComponent = FormatMap[project.format];
        return (
          <div key={project.id}>
            <FormatComponent project={project} onProjectClick={onProjectClick} />
            {i < projects.length - 1 && (
              <div className="sw-breathing">
                <span className="sw-breathing__ghost">
                  {String(project.index + 1).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
