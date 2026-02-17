import { useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SideNav.css';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'hero', label: '01 INTRO', selector: '.hero' },
  { id: 'intro', label: '02 ABOUT', selector: '.intro-strip' },
  { id: 'work', label: '03 WORK', selector: '.selected-work' },
  { id: 'archive', label: '04 ARCHIVE', selector: '.the-archive' },
  { id: 'timeline', label: '05 TIMELINE', selector: '.timeline' },
  { id: 'human', label: '06 HUMAN', selector: '.human' },
  { id: 'contact', label: '07 CONTACT', selector: '.contact' },
];

export default function SideNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section, i) => {
      const el = document.querySelector(section.selector);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleClick = useCallback((selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;
    // Use Lenis if available, otherwise scrollIntoView
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: Element) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav className="side-nav" aria-label="Section navigation">
      {sections.map((section, i) => (
        <button
          key={section.id}
          className={`side-nav__item${i === activeIndex ? ' side-nav__item--active' : ''}`}
          onClick={() => handleClick(section.selector)}
          aria-current={i === activeIndex ? 'true' : undefined}
        >
          <span className="side-nav__dash" />
          {section.label}
        </button>
      ))}
      <span className="side-nav__mobile-indicator">
        {String(activeIndex + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
      </span>
    </nav>
  );
}
