import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineEntries } from '../../data/timelineEntries';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const headerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const charIndexRef = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const yearsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const detailsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const chars = charsRef.current.filter(Boolean);
    const viewport = viewportRef.current;
    const line = lineRef.current;
    const marker = markerRef.current;
    const labels = labelsRef.current.filter(Boolean) as HTMLSpanElement[];
    const years = yearsRef.current.filter(Boolean) as HTMLSpanElement[];
    const details = detailsRef.current.filter(Boolean) as HTMLDivElement[];
    const bgs = bgsRef.current.filter(Boolean) as HTMLDivElement[];
    const mobile = mobileRef.current;

    if (!header || chars.length === 0 || !viewport || !line || !marker) return;

    const ctx = gsap.context(() => {
      // ── Header char stagger ──
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

      // ── Desktop ──
      gsap.matchMedia().add('(min-width: 769px)', () => {
        // Line reveal
        gsap.set(line, { scaleX: 0 });
        ScrollTrigger.create({
          trigger: viewport,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
          animation: gsap.to(line, {
            scaleX: 1,
            ease: 'none',
          }),
        });

        // ── Initial states ──
        // First entry active, rest dimmed
        labels.forEach((el, i) => {
          gsap.set(el, {
            opacity: i === 0 ? 1 : 0.25,
            color: i === 0 ? 'var(--color-accent)' : 'var(--color-text)',
          });
        });
        years.forEach((el, i) => {
          gsap.set(el, { opacity: i === 0 ? 0.7 : 0.25 });
        });
        details.forEach((el, i) => {
          gsap.set(el, {
            opacity: i === 0 ? 1 : 0,
            y: i === 0 ? 0 : 8,
          });
        });
        bgs.forEach((el, i) => {
          gsap.set(el, { opacity: i === 0 ? 1 : 0 });
        });

        // ── Master pinned timeline ──
        const positions = timelineEntries.map((e) => e.position);
        const tl = gsap.timeline();

        // Build crossfade segments between consecutive entries
        for (let i = 0; i < positions.length - 1; i++) {
          const fromPos = positions[i] * 100;
          const toPos = positions[i + 1] * 100;

          // Move marker to next position
          tl.to(marker, {
            left: `${toPos}%`,
            ease: 'none',
            duration: 1,
          });

          // Crossfade labels at the midpoint of movement
          tl.to(
            labels[i],
            { opacity: 0.25, color: 'var(--color-text)', duration: 0.4, ease: 'none' },
            '<0.3',
          );
          tl.to(
            labels[i + 1],
            { opacity: 1, color: 'var(--color-accent)', duration: 0.4, ease: 'none' },
            '<',
          );

          // Crossfade years
          tl.to(years[i], { opacity: 0.25, duration: 0.4, ease: 'none' }, '<');
          tl.to(years[i + 1], { opacity: 0.7, duration: 0.4, ease: 'none' }, '<');

          // Crossfade details
          tl.to(
            details[i],
            { opacity: 0, y: -8, duration: 0.4, ease: 'none' },
            '<',
          );
          tl.fromTo(
            details[i + 1],
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'none' },
            '<',
          );

          // Crossfade background images
          tl.to(
            bgs[i],
            { opacity: 0, duration: 0.4, ease: 'none' },
            '<',
          );
          tl.fromTo(
            bgs[i + 1],
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: 'none' },
            '<',
          );
        }

        ScrollTrigger.create({
          trigger: viewport,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          animation: tl,
        });
      });

      // ── Mobile ──
      gsap.matchMedia().add('(max-width: 768px)', () => {
        if (!mobile) return;
        const entries = mobile.querySelectorAll('.timeline-mobile__entry');
        if (entries.length === 0) return;

        gsap.set(entries, { opacity: 0, y: 15 });
        ScrollTrigger.create({
          trigger: mobile,
          start: 'top 85%',
          end: 'bottom 60%',
          scrub: 1,
          animation: gsap.to(entries, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: 'none',
          }),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Reset char counter before each render
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
          className="timeline-header__char"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section className="timeline">
      <div ref={headerRef} className="timeline-header">
        <h2 className="timeline-header__title">{renderChars('EXPERIENCE')}</h2>
      </div>

      {/* Desktop: pinned horizontal timeline */}
      <div ref={viewportRef} className="timeline-viewport">
        <div className="timeline-backgrounds">
          {timelineEntries.map((entry, i) => (
            <div
              key={entry.id}
              className="timeline-bg"
              ref={(el) => {
                bgsRef.current[i] = el;
              }}
            >
              <img src={entry.image} alt="" loading="eager" />
            </div>
          ))}
        </div>
        <div ref={lineRef} className="timeline-line" />
        <div ref={markerRef} className="timeline-marker" />

        {timelineEntries.map((entry, i) => (
          <div
            key={entry.id}
            className="timeline-notch"
            style={{ left: `${entry.position * 100}%` }}
          >
            <span
              className="__label"
              ref={(el) => {
                labelsRef.current[i] = el;
              }}
            >
              {entry.label}
            </span>
            <div className="__tick" />
            <span
              className="__year"
              ref={(el) => {
                yearsRef.current[i] = el;
              }}
            >
              {entry.year}
            </span>
          </div>
        ))}

        <div className="timeline-details">
          {timelineEntries.map((entry, i) => (
            <div
              key={entry.id}
              className="timeline-detail"
              ref={(el) => {
                detailsRef.current[i] = el;
              }}
            >
              <span className="__role">{entry.role}</span>
              <p className="__desc">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div ref={mobileRef} className="timeline-mobile">
        <div className="timeline-mobile__line" />
        {timelineEntries.map((entry) => (
          <div key={entry.id} className="timeline-mobile__entry">
            <div className="timeline-mobile__tick" />
            <div className="timeline-mobile__label">{entry.label}</div>
            <div className="timeline-mobile__year">{entry.year}</div>
            <div className="timeline-mobile__role">{entry.role}</div>
            <p className="timeline-mobile__desc">{entry.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
