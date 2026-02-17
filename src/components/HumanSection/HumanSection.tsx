import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HumanSection.css';

gsap.registerPlugin(ScrollTrigger);

const bioLines = [
  'I grew up taking things apart before I knew how to put them back together.',
  'That curiosity led me from Saltillo to Monterrey, then to Esslingen, Germany —',
  'where I picked up a third language, a love for precision manufacturing,',
  'and a habit of eating Brötchen for breakfast. Later, I found myself in Ontario,',
  'then Houston, each stop reshaping how I think about making things.',
  '',
  'When I\'m not buried in CAD or debugging ROS nodes, I mentor FIRST robotics teams,',
  'teach conversational German to engineering students, and look for the next thing',
  'I don\'t yet understand. I speak Spanish, English, German, and enough French',
  'to order coffee without embarrassing myself.',
];

const interests = ['ROBOTICS', 'LANGUAGE', 'TEACHING', 'TRAVEL', 'MAKING THINGS MOVE'];

export default function HumanSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const figureWrapRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bioLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tagsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const signatureRef = useRef<HTMLSpanElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rule = ruleRef.current;
    const figureWrap = figureWrapRef.current;
    const figure = figureRef.current;
    const content = contentRef.current;
    const label = labelRef.current;
    const lines = bioLinesRef.current.filter(Boolean) as HTMLSpanElement[];
    const tags = tagsRef.current.filter(Boolean) as HTMLSpanElement[];
    const signature = signatureRef.current;
    const ghost = ghostRef.current;

    if (!section || !rule || !figureWrap || !figure || !content) return;

    const ctx = gsap.context(() => {
      gsap.matchMedia().add(
        {
          desktop: '(min-width: 769px)',
          mobile: '(max-width: 768px)',
        },
        (context) => {
          const { desktop } = context.conditions!;

          if (desktop) {
            // ==========================================
            // DESKTOP — Pinned split animation
            // ==========================================
            const masterTl = gsap.timeline();

            // --- Initial states ---
            gsap.set(rule, { opacity: 0, scaleY: 0 });
            gsap.set(figure, { opacity: 0, scale: 1.12 });
            gsap.set(content, { opacity: 0 });
            if (label) gsap.set(label, { opacity: 0, letterSpacing: '0.6em' });
            gsap.set(lines, { clipPath: 'inset(0 100% 0 0)' });
            gsap.set(tags, { opacity: 0, y: 8, letterSpacing: '0.4em' });
            if (signature) gsap.set(signature, { opacity: 0 });
            if (ghost) gsap.set(ghost, { opacity: 0.03 });

            // =============================================
            // Phase 0: Entry (0–10%) — Copper rule appears
            // =============================================
            masterTl.to(rule, {
              opacity: 0.6,
              scaleY: 1,
              duration: 0.1,
              ease: 'power2.out',
            }, 0);

            // =============================================
            // Phase 1: Arrival (10–30%) — Figure fades in centered
            // =============================================
            masterTl.to(figure, {
              opacity: 1,
              scale: 1.0,
              duration: 0.2,
              ease: 'power2.out',
            }, 0.1);

            // =============================================
            // Phase 2: The Split (30–50%) — Figure slides left, content appears
            // =============================================
            masterTl.to(figureWrap, {
              xPercent: -100,
              duration: 0.2,
              ease: 'power3.inOut',
            }, 0.3);

            masterTl.to(content, {
              opacity: 1,
              duration: 0.15,
              ease: 'power2.out',
            }, 0.35);

            if (label) {
              masterTl.to(label, {
                opacity: 1,
                letterSpacing: '0.35em',
                duration: 0.15,
                ease: 'power2.out',
              }, 0.35);
            }

            // =============================================
            // Phase 3: Bio (50–80%) — Line-by-line clip-path wipe
            // =============================================
            if (lines.length > 0) {
              masterTl.to(lines, {
                clipPath: 'inset(0 0% 0 0)',
                stagger: 0.08,
                duration: 0.3,
                ease: 'none',
              }, 0.5);
            }

            // =============================================
            // Phase 4: Seal (80–100%) — Tags tighten, signature, figure settles
            // =============================================
            if (tags.length > 0) {
              masterTl.to(tags, {
                opacity: 1,
                y: 0,
                duration: 0.08,
                stagger: 0.02,
                ease: 'power2.out',
              }, 0.8);

              masterTl.to(tags, {
                letterSpacing: '0.12em',
                duration: 0.12,
                stagger: 0.02,
                ease: 'power2.inOut',
              }, 0.85);
            }

            if (signature) {
              masterTl.to(signature, {
                opacity: 0.7,
                duration: 0.1,
                ease: 'power2.out',
              }, 0.88);
            }

            // Figure subtle settle
            masterTl.to(figure, {
              y: -5,
              scale: 0.98,
              duration: 0.15,
              ease: 'power2.out',
            }, 0.85);

            // Master ScrollTrigger — pin the section
            ScrollTrigger.create({
              trigger: section,
              start: 'top top',
              end: '+=200%',
              pin: true,
              scrub: 1,
              animation: masterTl,
            });

            // Independent parallax — ghost "06"
            if (ghost) {
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
            }

            // Independent parallax — figure vertical drift
            gsap.to(figureWrap, {
              y: -40,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            });
          } else {
            // ==========================================
            // MOBILE — Simple scroll-triggered fades
            // ==========================================

            // Figure
            gsap.set(figure, { opacity: 0, y: 30 });
            ScrollTrigger.create({
              trigger: figure,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
              animation: gsap.to(figure, { opacity: 1, y: 0, ease: 'power2.out' }),
            });

            // Label
            if (label) {
              gsap.set(label, { opacity: 0, y: 15 });
              ScrollTrigger.create({
                trigger: label,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 1,
                animation: gsap.to(label, { opacity: 1, y: 0, ease: 'power2.out' }),
              });
            }

            // Bio lines — clip-path wipe
            if (lines.length > 0) {
              gsap.set(lines, { clipPath: 'inset(0 100% 0 0)' });
              ScrollTrigger.create({
                trigger: content,
                start: 'top 75%',
                end: 'center 50%',
                scrub: 1,
                animation: gsap.to(lines, {
                  clipPath: 'inset(0 0% 0 0)',
                  stagger: 0.1,
                  ease: 'none',
                }),
              });
            }

            // Tags
            if (tags.length > 0) {
              gsap.set(tags, { opacity: 0 });
              ScrollTrigger.create({
                trigger: tags[0]?.parentElement || content,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
                animation: gsap.to(tags, {
                  opacity: 1,
                  stagger: 0.08,
                  ease: 'power2.out',
                }),
              });
            }

            // Signature
            if (signature) {
              gsap.set(signature, { opacity: 0 });
              ScrollTrigger.create({
                trigger: signature,
                start: 'top 90%',
                end: 'top 70%',
                scrub: 1,
                animation: gsap.to(signature, { opacity: 0.7, ease: 'power2.out' }),
              });
            }
          }
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="human" data-section="06">
      <div ref={pinRef} className="human__pin">
        {/* Copper vertical rule */}
        <div ref={ruleRef} className="human__copper-rule" />

        {/* Cutout figure */}
        <div ref={figureWrapRef} className="human__figure-wrap">
          <img
            ref={figureRef}
            className="human__figure"
            src="/rodrigo-cutout.png"
            alt="Rodrigo Gutiérrez"
            loading="lazy"
          />
        </div>

        {/* Text content */}
        <div ref={contentRef} className="human__content">
          <div ref={labelRef} className="human__label">THE HUMAN</div>

          <div className="human__bio">
            {bioLines.map((line, i) => {
              if (line === '') return <br key={i} />;
              return (
                <span
                  key={i}
                  ref={(el) => { bioLinesRef.current[i] = el; }}
                  className="human__bio-line"
                >
                  {line}{' '}
                </span>
              );
            })}
          </div>

          <div className="human__interests">
            {interests.map((tag, i) => (
              <span
                key={tag}
                ref={(el) => { tagsRef.current[i] = el; }}
                className="human__interest-tag"
              >
                {tag}
              </span>
            ))}
          </div>

          <span ref={signatureRef} className="human__signature">
            — Rodrigo Gutiérrez Peña
          </span>
        </div>

        {/* Ghost section number */}
        <div ref={ghostRef} className="human__section-number" aria-hidden="true">
          06
        </div>
      </div>
    </section>
  );
}
