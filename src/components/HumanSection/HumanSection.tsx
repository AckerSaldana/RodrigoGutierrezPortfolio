import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HumanSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function HumanSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const ghostNameRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const ghostNumRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const copperRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const labelCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const bio1Ref = useRef<HTMLParagraphElement>(null);
  const bio2Ref = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const ghostName = ghostNameRef.current;
    const figure = figureRef.current;
    const ghostNum = ghostNumRef.current;
    const textLayer = textLayerRef.current;
    const copper = copperRef.current;
    const accent = accentRef.current;
    const labelChars = labelCharsRef.current.filter(Boolean) as HTMLSpanElement[];
    const bio1 = bio1Ref.current;
    const bio2 = bio2Ref.current;
    const signature = signatureRef.current;

    if (
      !section || !viewport || !ghostName || !figure ||
      !ghostNum || !textLayer || !copper || !accent ||
      !bio1 || !bio2 || !signature
    ) return;

    const ctx = gsap.context(() => {
      // ── Desktop: pinned scrubbed timeline ──
      gsap.matchMedia().add('(min-width: 769px)', () => {
        // Initial states
        gsap.set(ghostName, { opacity: 0 });
        gsap.set(figure, {
          clipPath: 'circle(0% at 50% 60%)',
          scale: 1.15,
        });
        gsap.set(ghostNum, { opacity: 0 });
        gsap.set(copper, { scaleX: 0 });
        gsap.set(accent, { scaleX: 0 });
        gsap.set(labelChars, { opacity: 0, y: 8 });
        gsap.set(bio1, { opacity: 0, y: 25 });
        gsap.set(bio2, { opacity: 0, y: 25 });
        gsap.set(signature, { opacity: 0, y: 10 });

        // ── Master timeline ──
        const tl = gsap.timeline();

        // Phase 1 — Emergence (0–0.30)
        // Ghost name fades in
        tl.to(ghostName, {
          opacity: 1,
          duration: 0.2,
          ease: 'none',
        }, 0);

        // Figure iris-open + counter-zoom
        tl.to(figure, {
          clipPath: 'circle(55% at 50% 60%)',
          scale: 1.0,
          duration: 0.3,
          ease: 'power2.out',
        }, 0);

        // Phase 2 — Anchoring (0.30–0.50)
        // Copper line sweeps left→right
        tl.to(copper, {
          scaleX: 1,
          duration: 0.2,
          ease: 'power2.inOut',
        }, 0.30);

        // Ghost "06" fades in
        tl.to(ghostNum, {
          opacity: 1,
          duration: 0.2,
          ease: 'none',
        }, 0.35);

        // Phase 3 — The Words (0.48–0.84)
        // Accent line
        tl.to(accent, {
          scaleX: 1,
          duration: 0.08,
          ease: 'power2.out',
        }, 0.48);

        // Label chars stagger
        tl.to(labelChars, {
          opacity: 1,
          y: 0,
          stagger: 0.015,
          duration: 0.14,
          ease: 'power2.out',
        }, 0.50);

        // Bio paragraph 1 fades + slides up
        tl.to(bio1, {
          opacity: 0.85,
          y: 0,
          duration: 0.14,
          ease: 'power2.out',
        }, 0.56);

        // Bio paragraph 2 fades + slides up
        tl.to(bio2, {
          opacity: 0.85,
          y: 0,
          duration: 0.14,
          ease: 'power2.out',
        }, 0.64);

        // Signature name
        tl.to(signature, {
          opacity: 0.7,
          y: 0,
          duration: 0.12,
          ease: 'power2.out',
        }, 0.72);

        // Phase 4 — Settling (0.84–1.0): parallax drifts settle

        // ── Continuous parallax (layered into same ScrollTrigger) ──
        // Increased slightly to compensate for shorter scroll distance
        tl.to(ghostName, { y: -60, duration: 1, ease: 'none' }, 0);
        tl.to(ghostNum, { y: -42, duration: 1, ease: 'none' }, 0);
        tl.to(copper, { y: -25, duration: 1, ease: 'none' }, 0);
        tl.to(figure, { y: -18, duration: 1, ease: 'none' }, 0);
        tl.to(textLayer, { y: -8, duration: 1, ease: 'none' }, 0);

        // ── Pin & scrub — let ScrollTrigger handle pin spacing ──
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: viewport,
          pinSpacing: true,
          scrub: 1,
          animation: tl,
        });
      });

      // ── Mobile: no pin, simple scroll reveals ──
      gsap.matchMedia().add('(max-width: 768px)', () => {
        gsap.set(ghostName, { opacity: 0 });
        gsap.set(figure, {
          clipPath: 'circle(0% at 50% 60%)',
          scale: 1.1,
        });
        gsap.set(ghostNum, { opacity: 0 });
        gsap.set(copper, { scaleX: 0 });
        gsap.set(accent, { scaleX: 0 });
        gsap.set(labelChars, { opacity: 0, y: 8 });
        gsap.set(bio1, { opacity: 0, y: 15 });
        gsap.set(bio2, { opacity: 0, y: 15 });
        gsap.set(signature, { opacity: 0 });

        // Ghost name
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
          animation: gsap.to(ghostName, { opacity: 1, ease: 'none' }),
        });

        // Figure iris-open
        ScrollTrigger.create({
          trigger: section,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 1,
          animation: gsap.to(figure, {
            clipPath: 'circle(55% at 50% 60%)',
            scale: 1.0,
            ease: 'power2.out',
          }),
        });

        // Ghost number
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'top 20%',
          scrub: 1,
          animation: gsap.to(ghostNum, { opacity: 1, ease: 'none' }),
        });

        // Copper line
        ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'top 15%',
          scrub: 1,
          animation: gsap.to(copper, { scaleX: 1, ease: 'power2.inOut' }),
        });

        // Text reveals
        ScrollTrigger.create({
          trigger: textLayer,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1,
          animation: gsap.timeline()
            .to(accent, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
            .to(labelChars, { opacity: 1, y: 0, stagger: 0.03, duration: 0.4, ease: 'power2.out' }, 0.1)
            .to(bio1, { opacity: 0.85, y: 0, duration: 0.4, ease: 'power2.out' }, 0.2)
            .to(bio2, { opacity: 0.85, y: 0, duration: 0.4, ease: 'power2.out' }, 0.35)
            .to(signature, { opacity: 0.7, duration: 0.3, ease: 'none' }, 0.4),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Render label chars for stagger animation
  const labelText = 'THE HUMAN BEHIND THE WORK';
  let charIdx = 0;
  const renderLabelChars = () =>
    labelText.split('').map((char, i) => {
      if (char === ' ') return <span key={i}>&nbsp;</span>;
      const idx = charIdx++;
      return (
        <span
          key={i}
          ref={(el) => { labelCharsRef.current[idx] = el; }}
          className="human__label-char"
        >
          {char}
        </span>
      );
    });

  return (
    <section ref={sectionRef} className="human">
      <div ref={viewportRef} className="human__viewport">
        {/* Z-0: Ghost name */}
        <div ref={ghostNameRef} className="human__layer human__ghost-name">
          <span>RODRIGO</span>
        </div>

        {/* Z-1: Figure cutout */}
        <div ref={figureRef} className="human__layer human__figure">
          <img
            src="/rodrigo-cutout.png"
            alt="Rodrigo Gutiérrez"
            loading="lazy"
          />
        </div>

        {/* Z-2: Ghost number */}
        <div ref={ghostNumRef} className="human__layer human__ghost-number">
          <span>06</span>
        </div>

        {/* Z-3: Text column — single editorial block */}
        <div ref={textLayerRef} className="human__layer human__text-layer">
          <div className="human__text-column">
            <div ref={accentRef} className="human__accent-line" />
            <span className="human__label">{renderLabelChars()}</span>
            <p ref={bio1Ref} className="human__bio">
              I grew up taking things apart before I knew how to put them back
              together. That curiosity led me from Saltillo to Monterrey, then to
              Esslingen, Germany — where I picked up a third language, a love for
              precision manufacturing, and a habit of eating Brötchen for
              breakfast.
            </p>
            <p ref={bio2Ref} className="human__bio">
              When I'm not buried in CAD or debugging ROS nodes, I mentor FRC
              robotics teams, teach conversational German to engineering students,
              and look for the next thing I don't yet understand. I speak Spanish,
              English, German, and enough French to order coffee without
              embarrassing myself.
            </p>
            <span ref={signatureRef} className="human__signature">
              — Rodrigo Gutiérrez Peña
            </span>
          </div>
        </div>

        {/* Z-4: Copper line */}
        <div ref={copperRef} className="human__layer human__copper-line" />
      </div>
    </section>
  );
}
