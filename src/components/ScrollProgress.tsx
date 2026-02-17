import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollProgress.css';

gsap.registerPlugin(ScrollTrigger);

const sectionNames: { selector: string; name: string }[] = [
  { selector: '.hero', name: 'INTRO' },
  { selector: '.intro-strip', name: 'ABOUT' },
  { selector: '.selected-work', name: 'WORK' },
  { selector: '.the-archive', name: 'ARCHIVE' },
  { selector: '.timeline', name: 'EXPERIENCE' },
  { selector: '.human', name: 'HUMAN' },
  { selector: '.contact', name: 'CONTACT' },
];

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState('INTRO');

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    const triggers: ScrollTrigger[] = [];

    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    sectionNames.forEach((section) => {
      const el = document.querySelector(section.selector);
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setCurrentSection(section.name),
        onEnterBack: () => setCurrentSection(section.name),
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="scroll-progress-container">
      <div ref={progressRef} className="scroll-progress-bar" />
      <span className="scroll-progress-label">{currentSection}</span>
    </div>
  );
}
