import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ArchiveProjectData } from '../../data/archiveProjects';

interface ArchiveItemProps {
  project: ArchiveProjectData;
}

export default function ArchiveItem({ project }: ArchiveItemProps) {
  const [expanded, setExpanded] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLImageElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const handleToggle = useCallback(() => {
    const detail = detailRef.current;
    const inner = innerRef.current;
    if (!detail || !inner) return;

    if (!expanded) {
      setExpanded(true);
      const height = inner.offsetHeight;
      gsap.set(detail, { height: 0 });
      gsap.to(detail, {
        height,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(detail, { height: 'auto' });
          ScrollTrigger.refresh();
        },
      });
      gsap.fromTo(
        inner,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.15, ease: 'power2.out' },
      );
    } else {
      const height = detail.offsetHeight;
      gsap.set(detail, { height });
      gsap.to(detail, {
        height: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          setExpanded(false);
          ScrollTrigger.refresh();
        },
      });
    }
  }, [expanded]);

  const handleMouseEnter = useCallback(() => {
    const ghost = ghostRef.current;
    if (!ghost) return;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(ghost, {
      opacity: 0.06,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const ghost = ghostRef.current;
    if (!ghost) return;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(ghost, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className={`archive-item${expanded ? ' archive-item--expanded' : ''}`}>
      <div className="archive-item__ghost" aria-hidden="true">
        <img
          ref={ghostRef}
          className="archive-item__ghost-img"
          src={project.image}
          alt=""
          loading="lazy"
        />
      </div>

      <button
        className="archive-item__row"
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-expanded={expanded}
      >
        <span className="archive-item__title">{project.title}</span>
        <span className="archive-item__dots" />
        <span className="archive-item__year">{project.year}</span>
      </button>

      <div ref={detailRef} className="archive-item__detail">
        <div ref={innerRef} className="archive-item__detail-inner">
          <div className="archive-item__detail-text">
            <p className="archive-item__description">{project.description}</p>
            <div className="archive-item__tags">
              {project.tags.map((tag) => (
                <span key={tag} className="archive-item__tag">{tag}</span>
              ))}
            </div>
            <div className="archive-item__copper-rule" />
          </div>
          <img
            className="archive-item__detail-image"
            src={project.image}
            alt={project.title}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
