import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import GrainOverlay from './components/GrainOverlay';
import CustomCursor from './components/CustomCursor';
import TimeSignature from './components/TimeSignature';
import SideNav from './components/SideNav';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import HeroSection from './components/HeroSection';
import IntroStrip from './components/IntroStrip';
import SelectedWork from './components/SelectedWork/SelectedWork';
import TheArchive from './components/TheArchive/TheArchive';
import Timeline from './components/Timeline/Timeline';
import HumanSection from './components/HumanSection/HumanSection';
import ContactSection from './components/ContactSection/ContactSection';
import useMouseParallax from './hooks/useMouseParallax';
import './App.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Ambient mouse parallax on desktop
  useMouseParallax();

  useEffect(() => {
    // Initialize Lenis smooth scrolling once content is rendered
    if (contentReady) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      lenisRef.current = lenis;
      // Expose Lenis for SideNav scroll-to
      (window as unknown as { __lenis: Lenis }).__lenis = lenis;

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.destroy();
        lenisRef.current = null;
      };
    }
  }, [contentReady]);

  // Fires before curtain split — renders content behind the curtain
  const handleContentReady = () => {
    setContentReady(true);
  };

  // Fires after curtain split is done — removes loading screen from DOM
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Always-visible global layers */}
      <GrainOverlay />
      <CustomCursor />

      {isLoading && (
        <LoadingScreen
          onContentReady={handleContentReady}
          onComplete={handleLoadingComplete}
        />
      )}

      {contentReady && (
        <>
          <TimeSignature />
          <SideNav />
          <ScrollProgress />
          <main className="main-content">
            <HeroSection />
            <IntroStrip />
            <SelectedWork />
            <TheArchive />
            <Timeline />
            <HumanSection />
            <ContactSection />
          </main>
        </>
      )}
    </>
  );
}

export default App;
