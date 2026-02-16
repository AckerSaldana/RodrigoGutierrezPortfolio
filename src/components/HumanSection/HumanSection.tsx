import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HumanSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function HumanSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const biosRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const inner = innerRef.current;
    const accent = accentRef.current;
    const name = nameRef.current;
    const bios = biosRef.current.filter(Boolean) as HTMLParagraphElement[];

    if (!section || !frame || !inner || !accent || !name || bios.length === 0)
      return;

    const ctx = gsap.context(() => {
      // ── Desktop ──
      gsap.matchMedia().add('(min-width: 769px)', () => {
        gsap.set(frame, { clipPath: 'inset(0 100% 0 0)' });
        gsap.set(inner, { scale: 1.08 });
        gsap.set(accent, { scaleX: 0 });
        gsap.set(name, { opacity: 0 });
        gsap.set(bios, { opacity: 0, y: 20 });

        // Photo clip-path reveal
        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          end: 'top 15%',
          scrub: 1,
          animation: gsap.to(frame, {
            clipPath: 'inset(0 0% 0 0)',
            ease: 'none',
          }),
        });

        // Counter-zoom
        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          end: 'top 15%',
          scrub: 1,
          animation: gsap.to(inner, { scale: 1, ease: 'none' }),
        });

        // Accent line
        ScrollTrigger.create({
          trigger: section,
          start: 'top 35%',
          end: 'top 10%',
          scrub: 1,
          animation: gsap.to(accent, { scaleX: 1, ease: 'none' }),
        });

        // Name
        ScrollTrigger.create({
          trigger: section,
          start: 'top 30%',
          end: 'top 10%',
          scrub: 1,
          animation: gsap.to(name, { opacity: 0.6, ease: 'none' }),
        });

        // Bios
        ScrollTrigger.create({
          trigger: section,
          start: 'top 25%',
          end: 'top 0%',
          scrub: 1,
          animation: gsap.to(bios, {
            opacity: 0.85,
            y: 0,
            stagger: 0.15,
            ease: 'none',
          }),
        });
      });

      // ── Mobile ──
      gsap.matchMedia().add('(max-width: 768px)', () => {
        gsap.set(frame, { clipPath: 'inset(0 100% 0 0)' });
        gsap.set(inner, { scale: 1.08 });
        gsap.set(accent, { scaleX: 0 });
        gsap.set(name, { opacity: 0 });
        gsap.set(bios, { opacity: 0, y: 20 });

        ScrollTrigger.create({
          trigger: section,
          start: 'top 75%',
          end: 'top 30%',
          scrub: 1,
          animation: gsap.to(frame, {
            clipPath: 'inset(0 0% 0 0)',
            ease: 'none',
          }),
        });

        ScrollTrigger.create({
          trigger: section,
          start: 'top 75%',
          end: 'top 30%',
          scrub: 1,
          animation: gsap.to(inner, { scale: 1, ease: 'none' }),
        });

        ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'top 20%',
          scrub: 1,
          animation: gsap.to(accent, { scaleX: 1, ease: 'none' }),
        });

        ScrollTrigger.create({
          trigger: section,
          start: 'top 40%',
          end: 'top 20%',
          scrub: 1,
          animation: gsap.to(name, { opacity: 0.6, ease: 'none' }),
        });

        ScrollTrigger.create({
          trigger: section,
          start: 'top 35%',
          end: 'top 10%',
          scrub: 1,
          animation: gsap.to(bios, {
            opacity: 0.85,
            y: 0,
            stagger: 0.15,
            ease: 'none',
          }),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="human">
      <div ref={frameRef} className="human__photo-frame">
        <div ref={innerRef} className="human__photo-inner">
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80"
            alt="Rodrigo in a workshop setting"
            loading="lazy"
          />
        </div>
      </div>
      <div className="human__text">
        <div ref={accentRef} className="human__accent-line" />
        <span ref={nameRef} className="human__name">
          RODRIGO GUTIÉRREZ PEÑA
        </span>
        <p
          ref={(el) => {
            biosRef.current[0] = el;
          }}
          className="human__bio"
        >
          I grew up taking things apart before I knew how to put them back
          together. That curiosity led me from Saltillo to Monterrey, then to
          Esslingen, Germany — where I picked up a third language, a love for
          precision manufacturing, and a habit of eating Brötchen for
          breakfast.
        </p>
        <p
          ref={(el) => {
            biosRef.current[1] = el;
          }}
          className="human__bio"
        >
          When I'm not buried in CAD or debugging ROS nodes, I mentor FRC
          robotics teams, teach conversational German to engineering students,
          and look for the next thing I don't yet understand. I speak Spanish,
          English, German, and enough French to order coffee without
          embarrassing myself.
        </p>
      </div>
    </section>
  );
}
