import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  total: number;
  sectionSelector: string; // CSS selector for each project section
  containerSelector: string; // CSS selector for the work wrapper
}

export default function ProjectCounter({ total, sectionSelector, containerSelector }: Props) {
  const counterRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const counter = counterRef.current;
    const container = document.querySelector(containerSelector);
    if (!counter || !container) return;

    const triggers: ScrollTrigger[] = [];

    // Visibility: show only while in the work section
    const visSt = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => setVisible(true),
      onLeave: () => setVisible(false),
      onEnterBack: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });
    triggers.push(visSt);

    // Track which project is currently in view
    const sections = document.querySelectorAll(sectionSelector);
    sections.forEach((section, i) => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setCurrent(i + 1),
        onEnterBack: () => setCurrent(i + 1),
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [sectionSelector, containerSelector]);

  const paddedCurrent = String(current).padStart(2, '0');
  const paddedTotal = String(total).padStart(2, '0');

  return (
    <div
      ref={counterRef}
      className={`project-counter${visible ? ' project-counter--visible' : ''}`}
    >
      <span className="project-counter__current">{paddedCurrent}</span>
      <span className="project-counter__separator">/</span>
      <span className="project-counter__total">{paddedTotal}</span>
    </div>
  );
}
