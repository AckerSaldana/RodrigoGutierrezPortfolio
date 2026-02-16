import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import IntroStrip from './components/IntroStrip';
import SelectedWork from './components/SelectedWork/SelectedWork';
import TheArchive from './components/TheArchive/TheArchive';
import Timeline from './components/Timeline/Timeline';
import HumanSection from './components/HumanSection/HumanSection';
import ContactSection from './components/ContactSection/ContactSection';
import ScrollProgress from './components/ScrollProgress';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis smooth scrolling after loading
    if (!isLoading) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.destroy();
      };
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {!isLoading && (
        <>
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
