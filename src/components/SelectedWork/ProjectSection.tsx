import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectData } from '../../data/projects';
import './ProjectSection.css';

gsap.registerPlugin(ScrollTrigger);

export type VariantKey = 'A' | 'B' | 'C' | 'D';

interface Props {
  project: ProjectData;
  variant: VariantKey;
  style?: React.CSSProperties;
}

interface VariantConfig {
  bg: { from: gsap.TweenVars; to: gsap.TweenVars };
  chars: { from: gsap.TweenVars; to: gsap.TweenVars };
  desc: { from: gsap.TweenVars; to: gsap.TweenVars };
  ghost: { from: gsap.TweenVars; to: gsap.TweenVars };
  tags: { from: gsap.TweenVars; to: gsap.TweenVars };
  section?: { from: string; to: string }; // clip-path
}

const VARIANT_CONFIGS: Record<VariantKey, VariantConfig> = {
  A: {
    bg: { from: { scale: 1 }, to: { scale: 1.08 } },
    chars: { from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } },
    desc: { from: { opacity: 0, y: 15 }, to: { opacity: 0.85, y: 0 } },
    ghost: { from: { opacity: 0.02 }, to: { opacity: 0.05 } },
    tags: { from: { opacity: 0 }, to: { opacity: 0.6 } },
  },
  B: {
    bg: { from: { x: '0%' }, to: { x: '-8%' } },
    chars: { from: { opacity: 0, x: 40 }, to: { opacity: 1, x: 0 } },
    desc: { from: { opacity: 0, x: 20 }, to: { opacity: 0.85, x: 0 } },
    ghost: { from: { opacity: 0.02 }, to: { opacity: 0.05 } },
    tags: { from: { opacity: 0, y: 10 }, to: { opacity: 0.6, y: 0 } },
    section: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
  },
  C: {
    bg: { from: { scale: 1.12 }, to: { scale: 1 } },
    chars: { from: { opacity: 0, clipPath: 'inset(100% 0 0 0)' }, to: { opacity: 1, clipPath: 'inset(0% 0 0 0)' } },
    desc: { from: { opacity: 0, y: 10 }, to: { opacity: 0.85, y: 0 } },
    ghost: { from: { opacity: 0.02 }, to: { opacity: 0.05 } },
    tags: { from: { opacity: 0 }, to: { opacity: 0.6 } },
    section: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
  },
  D: {
    bg: { from: { rotation: -0.8, x: '-3%' }, to: { rotation: 0.8, x: '3%' } },
    chars: { from: { opacity: 0, x: -40 }, to: { opacity: 1, x: 0 } },
    desc: { from: { opacity: 0, x: -20 }, to: { opacity: 0.85, x: 0 } },
    ghost: { from: { opacity: 0.02 }, to: { opacity: 0.05 } },
    tags: { from: { opacity: 0 }, to: { opacity: 0.6 } },
    section: { from: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', to: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' },
  },
};

export default function ProjectSection({ project, variant, style }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const titleCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const padded = String(project.index).padStart(2, '0');
  const config = VARIANT_CONFIGS[variant];
  const variantClass = `project-section--${variant.toLowerCase()}`;

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    const ghost = ghostRef.current;
    const chars = titleCharsRef.current.filter(Boolean);
    const desc = descRef.current;
    const tags = tagsRef.current.filter(Boolean);

    if (!section || !visual || !ghost || !desc) return;

    const triggers: ScrollTrigger[] = [];
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      // Section clip-path reveal (variants B, C, D)
      if (config.section) {
        gsap.set(section, { clipPath: config.section.from });
        const sectionSt = ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1,
          animation: gsap.to(section, {
            clipPath: config.section.to,
            ease: 'power2.inOut',
          }),
        });
        triggers.push(sectionSt);
      }

      // Background motion
      gsap.set(visual, config.bg.from);
      const bgSt = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        animation: gsap.to(visual, { ...config.bg.to, ease: 'none' }),
      });
      triggers.push(bgSt);

      // Ghost number
      gsap.set(ghost, config.ghost.from);
      const ghostSt = ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'center center',
        scrub: 1,
        animation: gsap.to(ghost, { ...config.ghost.to, ease: 'none' }),
      });
      triggers.push(ghostSt);

      // Title chars stagger
      if (chars.length > 0) {
        gsap.set(chars, config.chars.from);
        const charsSt = ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'top 10%',
          scrub: 1,
          animation: gsap.to(chars, {
            ...config.chars.to,
            stagger: 0.04,
            ease: 'power2.out',
          }),
        });
        triggers.push(charsSt);
      }

      // Description
      gsap.set(desc, config.desc.from);
      const descSt = ScrollTrigger.create({
        trigger: section,
        start: 'top 35%',
        end: 'top 5%',
        scrub: 1,
        animation: gsap.to(desc, { ...config.desc.to, ease: 'power2.out' }),
      });
      triggers.push(descSt);

      // Tags stagger
      if (tags.length > 0) {
        gsap.set(tags, config.tags.from);
        const tagsSt = ScrollTrigger.create({
          trigger: section,
          start: 'top 40%',
          end: 'top 5%',
          scrub: 1,
          animation: gsap.to(tags, {
            ...config.tags.to,
            stagger: 0.08,
            ease: 'none',
          }),
        });
        triggers.push(tagsSt);
      }
    });

    // Mobile: unified simple animation
    mm.add('(max-width: 768px)', () => {
      gsap.set(visual, { scale: 1 });
      const bgSt = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        animation: gsap.to(visual, { scale: 1.05, ease: 'none' }),
      });
      triggers.push(bgSt);

      gsap.set(ghost, { opacity: 0.02 });
      const ghostSt = ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'center center',
        scrub: 1,
        animation: gsap.to(ghost, { opacity: 0.05, ease: 'none' }),
      });
      triggers.push(ghostSt);

      if (chars.length > 0) {
        gsap.set(chars, { opacity: 0, y: 20 });
        const charsSt = ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'top 10%',
          scrub: 1,
          animation: gsap.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            ease: 'power2.out',
          }),
        });
        triggers.push(charsSt);
      }

      gsap.set(desc, { opacity: 0, y: 10 });
      const descSt = ScrollTrigger.create({
        trigger: section,
        start: 'top 35%',
        end: 'top 5%',
        scrub: 1,
        animation: gsap.to(desc, { opacity: 0.85, y: 0, ease: 'power2.out' }),
      });
      triggers.push(descSt);

      if (tags.length > 0) {
        gsap.set(tags, { opacity: 0 });
        const tagsSt = ScrollTrigger.create({
          trigger: section,
          start: 'top 40%',
          end: 'top 5%',
          scrub: 1,
          animation: gsap.to(tags, { opacity: 0.6, stagger: 0.08, ease: 'none' }),
        });
        triggers.push(tagsSt);
      }
    });

    return () => {
      mm.revert();
      triggers.forEach((t) => t.kill());
    };
  }, [config]);

  const renderTitleChars = (text: string) => {
    let charIdx = 0;
    return text.split('').map((char, i) => {
      if (char === ' ') return <span key={i}>&nbsp;</span>;
      const idx = charIdx++;
      return (
        <span
          key={i}
          ref={(el) => {
            titleCharsRef.current[idx] = el;
          }}
          className="project-section__char"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`project-section ${variantClass}`}
      style={style}
    >
      <div ref={visualRef} className="project-section__visual">
        <img
          src={project.image}
          alt={project.title}
          className="project-section__image"
        />
      </div>

      <div ref={ghostRef} className="project-section__ghost-number">
        {padded}
      </div>

      <div className="project-section__content">
        <h2 className="project-section__title">
          {renderTitleChars(project.title)}
        </h2>
        <p ref={descRef} className="project-section__description">
          {project.description}
        </p>
      </div>

      <div className="project-section__tags">
        {project.tags.map((tag, i) => (
          <span
            key={tag}
            ref={(el) => {
              tagsRef.current[i] = el;
            }}
            className="project-section__tag"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
