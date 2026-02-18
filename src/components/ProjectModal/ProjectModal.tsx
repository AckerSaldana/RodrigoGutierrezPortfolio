import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import type { ProjectData } from '../../data/projects';
import './ProjectModal.css';

interface ProjectModalProps {
  project: ProjectData;
  allProjects: ProjectData[];
  clickOrigin: { x: number; y: number };
  onClose: () => void;
  onNavigate: (project: ProjectData) => void;
}

export default function ProjectModal({
  project,
  allProjects,
  clickOrigin,
  onClose,
  onNavigate,
}: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const infoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);
  const originRef = useRef(clickOrigin);
  const isAnimating = useRef(false);

  // Derive prev/next
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  // ── Isolate scroll: stop Lenis wheel events from killing modal scroll ──
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const stopProp = (e: Event) => e.stopPropagation();
    scrollEl.addEventListener('wheel', stopProp, { passive: true });
    scrollEl.addEventListener('touchmove', stopProp, { passive: true });

    return () => {
      scrollEl.removeEventListener('wheel', stopProp);
      scrollEl.removeEventListener('touchmove', stopProp);
    };
  }, []);

  // ── Pause Lenis + lock body scroll on mount, restore on unmount ──
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } })
      .__lenis;
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';

    return () => {
      lenis?.start();
      document.documentElement.style.overflow = '';
    };
  }, []);

  // ── Open animation ──
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const modal = modalRef.current;
    const chars = titleCharsRef.current.filter(Boolean);
    const info = infoRef.current;
    const gallery = galleryRef.current;

    if (!modal) return;

    const ox = originRef.current.x;
    const oy = originRef.current.y;

    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Circle clip-path expand — this IS the reveal, content is visible inside
    tl.set(modal, { clipPath: `circle(0% at ${ox}px ${oy}px)` });
    tl.to(modal, {
      clipPath: `circle(150vmax at ${ox}px ${oy}px)`,
      duration: 0.6,
      ease: 'power3.inOut',
    });

    // Title chars stagger up (set invisible first, then animate in)
    if (chars.length > 0) {
      gsap.set(chars, { opacity: 0, y: 30 });
      tl.to(
        chars,
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.4, ease: 'power2.out' },
        0.4
      );
    }

    // Info section slides up subtly
    if (info) {
      gsap.set(info, { opacity: 0, y: 20 });
      tl.to(info, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.5);
    }

    // Gallery images stagger in
    if (gallery) {
      const imgs = gallery.querySelectorAll('.project-modal__gallery-img');
      if (imgs.length > 0) {
        gsap.set(imgs, { opacity: 0, y: 30 });
        tl.to(
          imgs,
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' },
          0.6
        );
      }
    }

    // No cleanup — hasRun guard handles StrictMode (same pattern as LoadingScreen)
  }, []);

  // ── Close animation ──
  const handleClose = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const modal = modalRef.current;
    const content = contentRef.current;
    if (!modal) return;

    const ox = originRef.current.x;
    const oy = originRef.current.y;

    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      },
    });

    // Fade out content
    if (content) {
      tl.to(content, { opacity: 0, duration: 0.2, ease: 'power2.in' });
    }

    // Collapse circle
    tl.to(
      modal,
      {
        clipPath: `circle(0% at ${ox}px ${oy}px)`,
        duration: 0.5,
        ease: 'power3.inOut',
      },
      0.2
    );
  }, [onClose]);

  // ── Escape key ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleClose]);

  // ── Navigate prev/next ──
  const handleNavigate = useCallback(
    (target: ProjectData, direction: 'prev' | 'next') => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const content = contentRef.current;
      const scroll = scrollRef.current;
      if (!content) return;

      const slideOut = direction === 'next' ? -40 : 40;
      const slideIn = direction === 'next' ? 40 : -40;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      tl.to(content, { opacity: 0, x: slideOut, duration: 0.25, ease: 'power2.in' });

      tl.call(() => {
        if (scroll) scroll.scrollTop = 0;
        onNavigate(target);
      });

      tl.fromTo(
        content,
        { opacity: 0, x: slideIn },
        { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' },
        '+=0.05'
      );
    },
    [onNavigate]
  );

  // ── Reset content visibility after navigation ──
  useEffect(() => {
    if (!hasRun.current) return;

    const chars = titleCharsRef.current.filter(Boolean);
    const info = infoRef.current;
    const gallery = galleryRef.current;

    if (chars.length > 0) gsap.set(chars, { opacity: 1, y: 0 });
    if (info) gsap.set(info, { opacity: 1, y: 0 });
    if (gallery) {
      const imgs = gallery.querySelectorAll('.project-modal__gallery-img');
      if (imgs.length > 0) gsap.set(imgs, { opacity: 1, y: 0 });
    }
  }, [project.id]);

  // ── Title char splitting ──
  titleCharsRef.current = [];

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
          className="project-modal__title-char"
        >
          {char}
        </span>
      );
    });
  };

  const padded = String(currentIndex + 1).padStart(2, '0');
  const total = String(allProjects.length).padStart(2, '0');

  return (
    <div ref={modalRef} className="project-modal">
      {/* Fixed top nav */}
      <div className="project-modal__nav">
        <button
          className="project-modal__back"
          data-cursor="link"
          onClick={handleClose}
        >
          &larr; BACK
        </button>
        <span className="project-modal__index">
          {padded} / {total}
        </span>
      </div>

      <div ref={scrollRef} className="project-modal__scroll">
        <div ref={contentRef} className="project-modal__content">
          {/* Hero — image visible from the start, clip-path IS the reveal */}
          <div className="project-modal__hero">
            <img
              src={project.image}
              alt={project.title}
              className="project-modal__hero-img"
            />
            <div className="project-modal__hero-vignette" />
            <h2 className="project-modal__hero-title">
              {renderTitleChars(project.title)}
            </h2>
          </div>

          {/* Info section */}
          <div ref={infoRef} className="project-modal__info">
            <div className="project-modal__overview">
              <div className="project-modal__overview-label">OVERVIEW</div>
              <p className="project-modal__overview-text">{project.description}</p>
            </div>

            <div className="project-modal__details">
              <div>
                <div className="project-modal__detail-label">DATE</div>
                <div className="project-modal__detail-value">{project.date}</div>
              </div>
              <div>
                <div className="project-modal__detail-label">LOCATION</div>
                <div className="project-modal__detail-value">{project.location}</div>
              </div>
              <div>
                <div className="project-modal__detail-label">TAGS</div>
                <div className="project-modal__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-modal__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {project.images && project.images.length > 0 && (
            <div ref={galleryRef} className="project-modal__gallery">
              {project.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} — ${i + 1}`}
                  className="project-modal__gallery-img"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {/* Footer prev/next */}
          <div className="project-modal__footer">
            {prevProject ? (
              <button
                className="project-modal__footer-link"
                data-cursor="link"
                onClick={() => handleNavigate(prevProject, 'prev')}
              >
                <span className="project-modal__footer-dir">&larr; PREVIOUS</span>
                <span className="project-modal__footer-name">{prevProject.title}</span>
              </button>
            ) : (
              <span />
            )}
            {nextProject ? (
              <button
                className="project-modal__footer-link project-modal__footer-link--next"
                data-cursor="link"
                onClick={() => handleNavigate(nextProject, 'next')}
              >
                <span className="project-modal__footer-dir">NEXT &rarr;</span>
                <span className="project-modal__footer-name">{nextProject.title}</span>
              </button>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
