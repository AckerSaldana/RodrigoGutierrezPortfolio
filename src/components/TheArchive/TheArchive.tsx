import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { archiveProjects } from '../../data/archiveProjects';
import ArchiveItem from './ArchiveItem';
import './TheArchive.css';

gsap.registerPlugin(ScrollTrigger);

export default function TheArchive() {
  const headerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const charIndexRef = useRef(0);
  const separatorRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const chars = charsRef.current.filter(Boolean);
    const separator = separatorRef.current;
    const list = listRef.current;
    if (!header || chars.length === 0 || !separator || !list) return;

    const ctx = gsap.context(() => {
      // Header char-level stagger
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

      // Separator line reveal
      gsap.set(separator, { scaleX: 0 });
      ScrollTrigger.create({
        trigger: separator,
        start: 'top 85%',
        end: 'top 55%',
        scrub: 1,
        animation: gsap.to(separator, {
          scaleX: 1,
          ease: 'none',
        }),
      });

      // Row stagger entrance
      const items = list.querySelectorAll('.archive-item');
      if (items.length > 0) {
        gsap.set(items, { opacity: 0, y: 15 });

        gsap.matchMedia().add(
          {
            isDesktop: '(min-width: 769px)',
            isMobile: '(max-width: 768px)',
          },
          (context) => {
            const { isMobile } = context.conditions!;
            ScrollTrigger.create({
              trigger: list,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: 1,
              animation: gsap.to(items, {
                opacity: 1,
                y: 0,
                stagger: isMobile ? 0.03 : 0.05,
                ease: 'none',
              }),
            });
          },
        );
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
          ref={(el) => {
            charsRef.current[idx] = el;
          }}
          className="archive-header__char"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section className="the-archive">
      <div ref={headerRef} className="archive-header">
        <h2 className="archive-header__title">{renderChars('THE ARCHIVE')}</h2>
      </div>

      <div className="archive-separator">
        <div ref={separatorRef} className="archive-separator__line" />
      </div>

      <div ref={listRef} className="archive-list">
        {archiveProjects.map((project) => (
          <ArchiveItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
