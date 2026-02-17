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

    const letters = name.querySelectorAll('.hero-letter');
    const scrollTriggers: ScrollTrigger[] = [];
    let entranceTl: gsap.core.Timeline | null = null;

    // Start hidden — curtain is covering this
    gsap.set(letters, { y: '110%', rotateX: -90, opacity: 0 });
    gsap.set(subtitle, { opacity: 0, y: 20 });

    const playEntrance = () => {
      entranceTl = gsap.timeline({
        onComplete: () => {
          // Scroll parallax — only after entrance finishes
          gsap.set(letters, { clearProps: 'y,rotateX' });
          gsap.set(subtitle, { clearProps: 'y' });

          letters.forEach((letter, index) => {
            const speed = 0.3 + (index % 5) * 0.15;
            const direction = index % 2 === 0 ? 1 : -1;

            const st = ScrollTrigger.create({
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
              animation: gsap.to(letter, {
                y: `${direction * 60 * speed}px`,
                opacity: 0.3 + (1 - speed) * 0.7,
              }),
            });
            scrollTriggers.push(st);
          });

          const stSub = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: '30% top',
            scrub: 1,
            animation: gsap.to(subtitle, { y: -30, opacity: 0 }),
          });
          scrollTriggers.push(stSub);
        },
      });

      // Letters rotate up into place with stagger
      entranceTl.to(letters, {
        y: '0%',
        rotateX: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.03,
      });

      // Subtitle fades in
      entranceTl.to(subtitle, {
        opacity: 0.5,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4');
    };

    // Wait for curtain to finish opening before animating
    window.addEventListener('curtainOpen', playEntrance, { once: true });

    // Background transition — safe to create immediately
    const stBg = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      animation: gsap.to(section, { backgroundColor: '#111111' }),
    });
    scrollTriggers.push(stBg);

    return () => {
      window.removeEventListener('curtainOpen', playEntrance);
      entranceTl?.kill();
      scrollTriggers.forEach((st) => st.kill());
    };
  }, []);

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
          <span className="hero-name-line">
            {renderLetters('GUTIÉRREZ')}
            <span className="hero-letter hero-copper-dot">.</span>
          </span>
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          MECHATRONICS ENGINEER &middot; SALTILLO, MX &middot; MMXXVI
        </p>
      </div>
    </section>
  );
}
