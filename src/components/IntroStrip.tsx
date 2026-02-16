import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './IntroStrip.css';

gsap.registerPlugin(ScrollTrigger);

const languages = [
  { code: 'ES', name: 'Spanish', proficiency: 100 },
  { code: 'EN', name: 'English', proficiency: 95 },
  { code: 'DE', name: 'German', proficiency: 70 },
  { code: 'FR', name: 'French', proficiency: 55 },
];

const philosophyText =
  'I believe engineering is about solving real problems with creative precision. From wildfire-fighting drones to robotic systems, I find meaning in turning complex challenges into elegant solutions.';

export default function IntroStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const chars = charsRef.current.filter(Boolean);
    const bars = barsRef.current.filter(Boolean);

    if (!section || chars.length === 0 || bars.length === 0) return;

    // Set initial states - characters start dim
    gsap.set(chars, { opacity: 0.15 });
    gsap.set(bars, { scaleX: 0 });

    // Scroll-scrubbed animation for characters
    gsap.to(chars, {
      opacity: 1,
      stagger: 0.02,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'center center',
        scrub: 1,
      },
    });

    // Scroll-scrubbed animation for language bars
    bars.forEach((bar, index) => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: `top ${55 - index * 5}%`,
          end: 'center center',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Split text into individual character spans
  const renderCharacters = (text: string) => {
    let charIndex = 0;
    return text.split('').map((char, index) => {
      if (char === ' ') {
        return <span key={index}>&nbsp;</span>;
      }
      const currentIndex = charIndex;
      charIndex++;
      return (
        <span
          key={index}
          ref={(el) => {
            charsRef.current[currentIndex] = el;
          }}
          className="intro-char"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section ref={sectionRef} className="intro-strip">
      <div className="intro-strip-content">
        <blockquote className="intro-quote">
          <p>{renderCharacters(philosophyText)}</p>
        </blockquote>

        <div className="intro-languages">
          {languages.map((lang, index) => (
            <div key={lang.code} className="language-item">
              <div className="language-header">
                <span className="language-code">{lang.code}</span>
                <span className="language-percent">{lang.proficiency}%</span>
              </div>
              <div className="language-bar-track">
                <div
                  ref={(el) => {
                    barsRef.current[index] = el;
                  }}
                  className="language-bar-fill"
                  style={
                    { '--proficiency': `${lang.proficiency}%` } as React.CSSProperties
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
