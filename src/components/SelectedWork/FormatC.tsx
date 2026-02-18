import { Fragment, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectData } from '../../data/projects';
import './FormatC.css';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  project: ProjectData;
  onProjectClick?: (project: ProjectData, e: React.MouseEvent) => void;
}

export default function FormatC({ project, onProjectClick }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const images = project.images || [project.image];

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const strip = stripRef.current;

    if (!section || !viewport || !strip) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        // Scroll distance: how far the strip must translate left so the
        // last frame ends flush with the viewport's right edge.
        // Frames have an explicit CSS width (40vw) so this is
        // deterministic — no dependency on image load timing.
        const getScrollDistance = () => {
          const visibleWidth = viewport.clientWidth - strip.offsetLeft;
          return Math.max(0, strip.scrollWidth - visibleWidth);
        };

        // Pin viewport and convert vertical scroll → horizontal strip movement
        gsap.to(strip, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            pin: viewport,
            scrub: 1,
            invalidateOnRefresh: true,
            // Cursor state for filmstrip
            onEnter: () => document.body.setAttribute('data-filmstrip', 'true'),
            onLeave: () => document.body.removeAttribute('data-filmstrip'),
            onEnterBack: () => document.body.setAttribute('data-filmstrip', 'true'),
            onLeaveBack: () => document.body.removeAttribute('data-filmstrip'),
          },
        });

        // First image clip-path wipe in
        const firstFrame = strip.querySelector('.format-c__frame');
        if (firstFrame) {
          gsap.set(firstFrame, { clipPath: 'inset(0 100% 0 0)' });
          ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            animation: gsap.to(firstFrame, {
              clipPath: 'inset(0 0% 0 0)',
              ease: 'power2.out',
            }),
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="format-c" data-cursor="drag" onClick={(e) => onProjectClick?.(project, e)}>
      <div ref={viewportRef} className="format-c__viewport">
        <div className="format-c__info">
          <h3 className="format-c__title">{project.title}</h3>
          <p className="format-c__desc">{project.description}</p>
          <span className="format-c__scroll-hint">SCROLL &rarr;</span>
          <div className="format-c__meta">
            <span>{project.date}</span>
            <span>&middot;</span>
            <span>{project.location}</span>
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div ref={stripRef} className="format-c__strip">
          {images.map((img, i) => (
            <Fragment key={i}>
              {i > 0 && <div className="format-c__separator" />}
              <div className="format-c__frame">
                <img
                  src={img}
                  alt={`${project.title} — ${i + 1}`}
                  className="format-c__frame-image"
                  loading="lazy"
                />
                <span className="format-c__frame-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="format-c__frame-caption">
                  FIG. {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
