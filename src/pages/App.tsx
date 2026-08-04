import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Navigation, Loader and Footer
import { Navigation } from '../components/Navigation/Navigation';
import { Loader } from '../components/Loader/Loader';
import { Footer } from '../components/Footer/Footer';

// Sections
import { Hero } from '../sections/Hero';
import { Welcome } from '../sections/Welcome';
import { Experience } from '../sections/Experience';
import { SignatureBasins } from '../sections/SignatureBasins';
import { VanitySolutions } from '../sections/VanitySolutions';
import { ComfortCraftsmanship } from '../sections/ComfortCraftsmanship';
import { Collections } from '../sections/Collections';
import { ShowerSystems } from '../sections/ShowerSystems';
import { DesignedExperiences } from '../sections/DesignedExperiences';
import { LuxuryCounters } from '../sections/LuxuryCounters';
import { FinalCTA } from '../sections/FinalCTA';

gsap.registerPlugin(ScrollTrigger);

const IMAGES_TO_PRELOAD = [
  '/assets/1.png',
  '/assets/2.png',
  '/assets/3.png',
  '/assets/4.jpg',
  '/assets/5.jpg',
  '/assets/6.jpg',
  '/assets/7.jpg',
  '/assets/8.jpg',
  '/logo/logo.jpg',
];

export const App: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoaderComplete, setIsLoaderComplete] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Progressive image preloading logic
  useEffect(() => {
    let loadedCount = 0;
    const total = IMAGES_TO_PRELOAD.length;
    const startTime = Date.now();
    const minDuration = 2000; // Minimum 2s load time to appreciate the luxury reveal

    const updateProgress = () => {
      loadedCount++;
      const currentPercent = Math.min(99, Math.round((loadedCount / total) * 100));
      setProgress(currentPercent);
    };

    const preloadAll = async () => {
      const promises = IMAGES_TO_PRELOAD.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            updateProgress();
            resolve();
          };
          img.onerror = () => {
            updateProgress();
            resolve();
          };
        });
      });

      await Promise.all(promises);

      const elapsed = Date.now() - startTime;
      const remaining = minDuration - elapsed;

      if (remaining > 0) {
        // Smoothly animate the final stretch of loader
        let current = loadedCount ? Math.round((loadedCount / total) * 100) : 0;
        const interval = setInterval(() => {
          current += 2;
          if (current >= 100) {
            setProgress(100);
            clearInterval(interval);
          } else {
            setProgress(current);
          }
        }, remaining / 35);
      } else {
        setProgress(100);
      }
    };

    preloadAll();
  }, []);

  // Initialize Lenis smooth scroll and integrate with GSAP ScrollTrigger
  useEffect(() => {
    if (!isLoaderComplete) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    // Connect Lenis events to GSAP ScrollTrigger update loop
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Sync Lenis frame updates with GSAP ticker loop
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Make lenis instance globally accessible for navbar actions
    (window as any).lenis = lenis;

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      (window as any).lenis = null;
      lenisRef.current = null;
    };
  }, [isLoaderComplete]);

  // Smooth scroll handler to target elements
  const handleLinkClick = (selector: string) => {
    const lenis = lenisRef.current || (window as any).lenis;
    if (lenis) {
      if (selector === '#hero') {
        lenis.scrollTo(0, { duration: 1.8 });
      } else {
        lenis.scrollTo(selector, {
          offset: 0,
          duration: 1.8,
        });
      }
    } else {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <HelmetProvider>
      <div className="bg-[#0a0a0a] text-[#eae6df] min-h-screen relative selection:bg-[#c5a880] selection:text-charcoal overflow-x-hidden">
        {/* SEO Metadata Setup */}
        <Helmet>
          <title>Om Mangalam — Premium Bathroom & Sanitaryware Showroom</title>
          <meta name="description" content="Om Mangalam curates high-end luxury bathroom environments, designer basins, and premium ceramics. Visit our indiranagar showroom." />
          <meta name="keywords" content="Om Mangalam, luxury bathroom, sanitaryware, designer basins, luxury showroom, vanity systems, architecture" />
          <link rel="canonical" href="https://ommangalam.com" />
        </Helmet>

        {/* Elegant noise overlay for tactile feel */}
        <div className="noise-overlay" />

        {/* Preloader Screen */}
        <Loader
          progress={progress}
          onComplete={() => setIsLoaderComplete(true)}
        />

        {/* Main Orchestration once loader completes */}
        {isLoaderComplete && (
          <>
            {/* Header Sticky Navbar */}
            <Navigation onLinkClick={handleLinkClick} />

            {/* Single Scroll Sections */}
            <main className="relative z-10 w-full">
              <Hero
                onExploreClick={() => handleLinkClick('#about')}
                onVisitClick={() => handleLinkClick('#contact')}
              />
              <Welcome />
              <Experience />
              <SignatureBasins />
              <VanitySolutions />
              <ComfortCraftsmanship />
              <Collections />
              <ShowerSystems />
              <DesignedExperiences />
              <LuxuryCounters />
              <FinalCTA
                onVisitClick={() => handleLinkClick('#contact')}
                onContactClick={() => handleLinkClick('#contact')}
              />
            </main>

            {/* Premium Brand Footer */}
            <Footer
              onBackToTop={() => handleLinkClick('#hero')}
              onLinkClick={handleLinkClick}
            />
          </>
        )}
      </div>
    </HelmetProvider>
  );
};

export default App;
