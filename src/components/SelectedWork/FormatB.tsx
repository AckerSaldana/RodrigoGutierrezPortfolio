import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectData } from '../../data/projects';
import './FormatB.css';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  project: ProjectData;
  onProjectClick?: (project: ProjectData, e: React.MouseEvent) => void;
}

export default function FormatB({ project, onProjectClick }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  const padded = String(project.index).padStart(2, '0');

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    const text = textRef.current;
    const chars = titleCharsRef.current.filter(Boolean);
    const desc = descRef.current;
    const number = numberRef.current;

    if (!section || !imageWrap || !text || !desc) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        // Image mask reveal: clip-path wipe left-to-right
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1,
          animation: gsap.to(imageWrap, {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            ease: 'power2.out',
          }),
        });

        // Parallax split: image at 0.85x speed
        gsap.to(imageWrap, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // Number fade
        if (number) {
          gsap.set(number, { opacity: 0, y: 20 });
          ScrollTrigger.create({
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 1,
            animation: gsap.to(number, { opacity: 1, y: 0, ease: 'power2.out' }),
          });
        }

        // Title chars stagger
        if (chars.length > 0) {
          gsap.set(chars, { opacity: 0, x: 30 });
          ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            end: 'top 10%',
            scrub: 1,
            animation: gsap.to(chars, {
              opacity: 1,
              x: 0,
              stagger: 0.03,
              ease: 'power2.out',
            }),
          });
        }

        // Description
        gsap.set(desc, { opacity: 0, y: 15 });
        ScrollTrigger.create({
          trigger: section,
          start: 'top 40%',
          end: 'top 5%',
          scrub: 1,
          animation: gsap.to(desc, { opacity: 0.85, y: 0, ease: 'power2.out' }),
        });
      });

      // Mobile: simple reveals
      mm.add('(max-width: 768px)', () => {
        if (chars.length > 0) {
          gsap.set(chars, { opacity: 0, y: 15 });
          ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            end: 'top 10%',
            scrub: 1,
            animation: gsap.to(chars, { opacity: 1, y: 0, stagger: 0.03, ease: 'power2.out' }),
          });
        }
        gsap.set(desc, { opacity: 0 });
        ScrollTrigger.create({
          trigger: section,
          start: 'top 40%',
          end: 'top 10%',
          scrub: 1,
          animation: gsap.to(desc, { opacity: 0.85, ease: 'none' }),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const renderTitleChars = (text: string) => {
    let charIdx = 0;
    return text.split('').map((char, i) => {
      if (char === ' ') return <span key={i}>&nbsp;</span>;
      const idx = charIdx++;
      return (
        <span
          key={i}
          ref={(el) => { titleCharsRef.current[idx] = el; }}
          className="format-b__char"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section ref={sectionRef} className="format-b" data-cursor="project" onClick={(e) => onProjectClick?.(project, e)}>
      <div ref={textRef} className="format-b__text">
        <div ref={numberRef} className="format-b__number">{padded}</div>
        <h3 className="format-b__title">{renderTitleChars(project.title)}</h3>
        <p ref={descRef} className="format-b__desc">{project.description}</p>
        <span className="format-b__info">{project.date} &middot; {project.location}</span>
        <div className="format-b__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="format-b__tag">{tag}</span>
          ))}
        </div>
      </div>

      <div ref={imageWrapRef} className="format-b__image-wrap">
        <div
          className="format-b__ghost"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <img
          src={project.image}
          alt={project.title}
          className="format-b__image"
          loading="lazy"
        />
      </div>
    </section>
  );
}
