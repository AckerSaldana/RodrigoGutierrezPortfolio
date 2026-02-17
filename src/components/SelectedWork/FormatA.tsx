import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectData } from '../../data/projects';
import './FormatA.css';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  project: ProjectData;
}

export default function FormatA({ project }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const titleCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    const chars = titleCharsRef.current.filter(Boolean);
    const desc = descRef.current;
    const meta = metaRef.current;

    if (!section || !visual || !desc) return;

    const ctx = gsap.context(() => {
      // Clip-path reveal: inset(15%) → inset(0%)
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'top 20%',
        scrub: 1,
        animation: gsap.to(visual, {
          clipPath: 'inset(0%)',
          ease: 'power2.out',
        }),
      });

      // Ken Burns: scale 1.0 → 1.08
      gsap.to(visual, {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Title chars stagger from bottom
      if (chars.length > 0) {
        gsap.set(chars, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'top 10%',
          scrub: 1,
          animation: gsap.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            ease: 'power2.out',
          }),
        });
      }

      // Description fade in
      gsap.set(desc, { opacity: 0, y: 15 });
      ScrollTrigger.create({
        trigger: section,
        start: 'top 40%',
        end: 'top 5%',
        scrub: 1,
        animation: gsap.to(desc, { opacity: 0.85, y: 0, ease: 'power2.out' }),
      });

      // Meta tags
      if (meta) {
        gsap.set(meta, { opacity: 0 });
        ScrollTrigger.create({
          trigger: section,
          start: 'top 30%',
          end: 'top 5%',
          scrub: 1,
          animation: gsap.to(meta, { opacity: 1, ease: 'none' }),
        });
      }

      // On exit: fade out
      gsap.to(section, {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: 'bottom 20%',
          end: 'bottom top',
          scrub: 1,
        },
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
          className="format-a__char"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section ref={sectionRef} className="format-a" data-cursor="project">
      <div ref={visualRef} className="format-a__visual">
        <img
          src={project.image}
          alt={project.title}
          className="format-a__image"
          loading="lazy"
        />
        <div className="format-a__vignette" />
      </div>

      <div className="format-a__content">
        <h3 className="format-a__title">{renderTitleChars(project.title)}</h3>
        <p ref={descRef} className="format-a__desc">{project.description}</p>
      </div>

      <div ref={metaRef} className="format-a__meta">
        <span className="format-a__date">{project.date}</span>
        {project.tags.map((tag) => (
          <span key={tag} className="format-a__tag">{tag}</span>
        ))}
      </div>
    </section>
  );
}
