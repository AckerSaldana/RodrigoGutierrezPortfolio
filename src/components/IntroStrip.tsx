import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './IntroStrip.css';

gsap.registerPlugin(ScrollTrigger);

const languages = [
  { code: 'ES', proficiency: 100, label: 'NATIVE' },
  { code: 'EN', proficiency: 95, label: 'FLUENT' },
  { code: 'DE', proficiency: 70, label: 'CONVERSATIONAL' },
  { code: 'FR', proficiency: 55, label: 'BASIC' },
];

const quoteText =
  'I engineer systems that move, perceive, and respond — from wildfire drones that protect forests to robotic grippers that think with their hands. I believe the best machines are the ones you forget are machines.';

const accentWords = new Set(['engineer', 'drones', 'forests', 'grippers', 'machines']);

const locations = [
  'SALTILLO → ESSLINGEN → HOUSTON → RAMOS ARIZPE',
  'TEC DE MONTERREY · STEINBEIS · MAGNA · CINVESTAV',
];

function splitWords(text: string) {
  return text.split(/\s+/).map((word, i) => {
    const clean = word.replace(/[.,—]/g, '');
    const isAccent = accentWords.has(clean.toLowerCase());
    return { word, isAccent, key: i };
  });
}

export default function IntroStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const quoteBlockRef = useRef<HTMLDivElement>(null);
  const dataPanelRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const profileLabelRef = useRef<HTMLSpanElement>(null);
  const fillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const locationItemsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = splitWords(quoteText);

  useEffect(() => {
    const section = sectionRef.current;
    const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
    const quoteBlock = quoteBlockRef.current;
    const dataPanel = dataPanelRef.current;
    const ghost = ghostRef.current;
    const profileLabel = profileLabelRef.current;
    const fills = fillsRef.current.filter(Boolean) as HTMLDivElement[];
    const counters = countersRef.current.filter(Boolean) as HTMLSpanElement[];
    const locationItems = locationItemsRef.current.filter(Boolean) as HTMLSpanElement[];

    if (!section || wordEls.length === 0 || !quoteBlock || !dataPanel || !ghost) return;

    const ctx = gsap.context(() => {
      gsap.matchMedia().add(
        {
          desktop: '(min-width: 769px)',
          mobile: '(max-width: 768px)',
        },
        (context) => {
          const { desktop } = context.conditions!;
          const scrollEnd = desktop ? '+=300%' : '+=200%';

          const masterTl = gsap.timeline();

          // --- Initial states ---
          gsap.set(wordEls, { opacity: 0.08, filter: 'blur(4px)' });
          gsap.set(dataPanel, { opacity: 0, x: desktop ? '10vw' : 0, y: desktop ? 0 : 60 });
          if (profileLabel) gsap.set(profileLabel, { letterSpacing: '0.5em', opacity: 0 });
          gsap.set(fills, { scaleX: 0 });
          gsap.set(counters, { innerText: '0' });
          gsap.set(locationItems, { opacity: 0, y: 12 });

          // =============================================
          // ACT 1: Quote Reveal (0% – 50%)
          // =============================================
          const act1 = gsap.timeline();

          // Word-by-word reveal
          act1.to(wordEls, {
            opacity: 1,
            filter: 'blur(0px)',
            stagger: { each: 0.03 },
            ease: 'none',
            duration: 0.8,
          });

          // After words resolve, tint accent words
          const accentEls = wordEls.filter((_, i) => words[i].isAccent);
          if (accentEls.length > 0) {
            act1.to(
              accentEls,
              {
                color: 'var(--accent-copper)',
                duration: 0.15,
                stagger: 0.02,
              },
              0.5,
            );
          }

          masterTl.add(act1, 0);

          // =============================================
          // ACT 2: Transition (50% – 65%)
          // =============================================
          const act2 = gsap.timeline();

          if (desktop) {
            act2.to(quoteBlock, {
              scale: 0.55,
              x: '-25vw',
              y: '-15vh',
              opacity: 0.7,
              duration: 1,
              ease: 'power2.inOut',
            });
          } else {
            act2.to(quoteBlock, {
              scale: 0.6,
              y: '-25vh',
              opacity: 0.7,
              duration: 1,
              ease: 'power2.inOut',
            });
          }

          act2.to(
            dataPanel,
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              ease: 'power2.out',
            },
            0.2,
          );

          masterTl.add(act2, 1);

          // =============================================
          // ACT 3: Data Reveal (65% – 100%)
          // =============================================
          const act3 = gsap.timeline();

          // Profile label
          if (profileLabel) {
            act3.to(profileLabel, {
              letterSpacing: '0.15em',
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          }

          // Language bar fills
          act3.to(
            fills,
            {
              scaleX: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power2.out',
            },
            0.1,
          );

          // Counter animations
          languages.forEach((lang, i) => {
            const counter = counters[i];
            if (!counter) return;
            act3.to(
              { val: 0 },
              {
                val: lang.proficiency,
                duration: 0.5,
                ease: 'none',
                snap: { val: 1 },
                onUpdate() {
                  counter.textContent = `${Math.round(this.targets()[0].val)}%`;
                },
              },
              0.1 + i * 0.08,
            );
          });

          // Locations stagger in
          act3.to(
            locationItems,
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: 'power2.out',
            },
            0.4,
          );

          // Background transition
          act3.to(
            section,
            {
              backgroundColor: 'var(--bg-primary)',
              duration: 0.5,
              ease: 'none',
            },
            0.3,
          );

          masterTl.add(act3, 2);

          // Ghost parallax (independent)
          gsap.to(ghost, {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });

          // Master ScrollTrigger
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: scrollEnd,
            pin: true,
            scrub: 1,
            animation: masterTl,
          });
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="intro-strip" data-section="02">
      {/* Ghost number */}
      <div ref={ghostRef} className="intro-ghost" aria-hidden="true">
        02
      </div>

      {/* Quote block */}
      <div ref={quoteBlockRef} className="intro-quote-block">
        <blockquote className="intro-quote">
          <p>
            {words.map((w, i) => (
              <span
                key={w.key}
                ref={(el) => { wordsRef.current[i] = el; }}
                className={`intro-word${w.isAccent ? ' intro-word--accent' : ''}`}
              >
                {w.word}{' '}
              </span>
            ))}
          </p>
        </blockquote>
      </div>

      {/* Data panel */}
      <div ref={dataPanelRef} className="intro-data-panel">
        <span ref={profileLabelRef} className="intro-profile-label">
          PROFILE
        </span>

        <div className="intro-languages">
          {languages.map((lang, index) => (
            <div key={lang.code} className="language-item">
              <div className="language-row">
                <span className="language-code">{lang.code}</span>
                <div className="language-track">
                  <div
                    ref={(el) => { fillsRef.current[index] = el; }}
                    className="language-fill"
                    style={{ width: `${lang.proficiency}%` }}
                  />
                </div>
                <span
                  ref={(el) => { countersRef.current[index] = el; }}
                  className="language-counter"
                >
                  0%
                </span>
              </div>
              <span className="language-label">{lang.label}</span>
            </div>
          ))}
        </div>

        <div className="intro-locations">
          {locations.map((loc, i) => (
            <span
              key={i}
              ref={(el) => { locationItemsRef.current[i] = el; }}
              className="intro-location-item"
            >
              {loc}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
