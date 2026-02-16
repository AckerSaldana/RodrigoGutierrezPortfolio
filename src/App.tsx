import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import IntroStrip from './components/IntroStrip';
import SelectedWork from './components/SelectedWork/SelectedWork';
import ScrollProgress from './components/ScrollProgress';
import './App.css';

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

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

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
          </main>
        </>
      )}
    </>
  );
}

export default App;
