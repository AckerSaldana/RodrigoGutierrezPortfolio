import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const name = nameRef.current;
    const subtitle = subtitleRef.current;

    if (!section || !name || !subtitle) return;

    // Get all individual letters
    const letters = name.querySelectorAll('.hero-letter');

    // ===== ENTRANCE ANIMATION =====
    const entranceTl = gsap.timeline();

    // Set initial state for letters
    gsap.set(letters, {
      opacity: 0,
      y: 60,
      rotateX: -90,
    });

    // Set initial state for subtitle
    gsap.set(subtitle, {
      opacity: 0,
      y: 20,
    });

    // Staggered letter reveal with 3D rotation
    entranceTl.to(letters, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: {
        amount: 0.8,
        from: 'start',
      },
    });

    // Subtitle fades in after name
    entranceTl.to(
      subtitle,
      {
        opacity: 0.6,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    );

    // ===== SCROLL PARALLAX ANIMATION =====
    // Only set up after entrance animation completes
    entranceTl.call(() => {
      letters.forEach((letter, index) => {
        // Vary the speed based on position - creates wave-like dissolve
        const speed = 0.3 + (index % 5) * 0.15;
        const direction = index % 2 === 0 ? 1 : -1;

        gsap.to(letter, {
          y: `${direction * 50 * speed}px`,
          opacity: 0.3 + (1 - speed) * 0.7,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Subtitle parallax - fades and moves up
      gsap.to(subtitle, {
        y: -30,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });
    });

    return () => {
      entranceTl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Split text into individual letter spans
  const renderLetters = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="hero-letter">
        {char}
      </span>
    ));
  };

  return (
    <section ref={sectionRef} className="hero">
      <div className="hero-content">
        <h1 ref={nameRef} className="hero-name">
          <span className="hero-name-line">{renderLetters('RODRIGO')}</span>
          <span className="hero-name-line">{renderLetters('GUTIÉRREZ')}</span>
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          MECHATRONICS ENGINEER · SALTILLO · MX
        </p>
      </div>
    </section>
  );
}
