import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Navigation, Loader and Utilities
import { Navigation } from '../components/Navigation/Navigation';
import { Loader } from '../components/Loader/Loader';
import { CustomCursor } from '../components/Common/CustomCursor';
import { DustParticles } from '../components/Common/DustParticles';

// Hybrid Showroom Elements
import { HeroTimeline } from '../components/Hero/HeroTimeline';
import { Welcome } from '../sections/Welcome';
import { CollectionsGrid } from '../sections/CollectionsGrid';
import { DesignedExperiences } from '../sections/DesignedExperiences';
import { LuxuryCounters } from '../sections/LuxuryCounters';
import { CTAWrapper } from '../sections/CTAWrapper';
import { Footer } from '../components/Footer/Footer';

gsap.registerPlugin(ScrollTrigger);

const IMAGES_TO_PRELOAD = [
  '/assets/pc/1.png',
  '/assets/pc/2.png',
  '/assets/pc/3.png',
  '/assets/pc/4.png',
  '/assets/pc/5.png',
  '/assets/mobile_tablet/1.png',
  '/assets/mobile_tablet/2.png',
  '/assets/mobile_tablet/3.jpg',
  '/assets/mobile_tablet/4.jpg',
  '/assets/mobile_tablet/5.jpg',
  '/logo/logo.jpg',
];

export const App: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isLoaderComplete, setIsLoaderComplete] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Progressive preloading with Image.decode() for smooth layout initialization
  useEffect(() => {
    let loadedCount = 0;
    const total = IMAGES_TO_PRELOAD.length;
    const startTime = Date.now();
    const minDuration = 2200; // Easing in loader for luxury feel

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
          img.decode ? img.decode().then(() => {
            updateProgress();
            resolve();
          }).catch(() => {
            updateProgress();
            resolve();
          }) : (img.onload = () => {
            updateProgress();
            resolve();
          });
        });
      });

      await Promise.all(promises);

      const elapsed = Date.now() - startTime;
      const remaining = minDuration - elapsed;

      if (remaining > 0) {
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

  // Initialize Lenis scroll engine
  useEffect(() => {
    if (!isLoaderComplete) return;

    const lenis = new Lenis({
      duration: 1.5, // heavily damped scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
    });

    lenisRef.current = lenis;

    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    (window as any).lenis = lenis;

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      (window as any).lenis = null;
      lenisRef.current = null;
    };
  }, [isLoaderComplete]);

  // Monitor scroll for champagne progress line update
  useEffect(() => {
    if (!isLoaderComplete) return;

    const handleScrollProgress = () => {
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      if (totalH <= 0) return;
      const pct = (window.scrollY / totalH) * 100;
      setScrollProgress(pct);
    };

    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, [isLoaderComplete]);

  // Navigate directly to target slide positions on the timeline
  const handleLinkClick = (selector: string) => {
    const lenis = lenisRef.current || (window as any).lenis;
    if (!lenis) return;

    if (selector === '#hero') {
      lenis.scrollTo(0, { duration: 2.2 });
      return;
    }

    const targetEl = document.querySelector(selector);
    if (targetEl) {
      lenis.scrollTo(targetEl, {
        duration: 2.2,
        offset: -40, // slight offset for floating navigation navbar spacing
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <HelmetProvider>
      <div className="bg-ivory text-espresso min-h-screen relative selection:bg-bronze selection:text-ivory overflow-x-hidden">
        {/* SEO Metadata Setup */}
        <Helmet>
          <title>Om Mangalam — Premium Bathroom & Sanitaryware Showroom</title>
          <meta name="description" content="Om Mangalam curates high-end luxury bathroom environments, designer basins, and premium ceramics. Visit our Indiranagar showroom." />
          <meta name="keywords" content="Om Mangalam, luxury bathroom, sanitaryware, designer basins, luxury showroom, vanity systems, architecture" />
          <link rel="canonical" href="https://ommangalam.com" />
        </Helmet>

        {/* Ambient paper noise overlay for warm tactile feeling */}
        <div className="noise-overlay" />

        {/* Premium magnetic outline cursor */}
        <CustomCursor />

        {/* Floating dust particle canvas layer */}
        <DustParticles />

        {/* Vertical Left Side Champagne Scroll Progress Indicator */}
        {isLoaderComplete && (
          <div className="scroll-indicator-bar hidden md:block">
            <div
              className="scroll-indicator-progress"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>
        )}

        {/* Preloader Screen */}
        <Loader progress={progress} onComplete={() => setIsLoaderComplete(true)} />

        {/* Cinematic Layout Pinning */}
        {isLoaderComplete && (
          <>
            {/* Floating Glass Rounded Navbar */}
            <Navigation onLinkClick={handleLinkClick} />

            {/* Pinned Hero Story Section (Walkthrough scenes 1-7) */}
            <div id="hero">
              <HeroTimeline />
            </div>

            {/* Normal Scrolling Content Sections below Hero */}
            <div className="relative w-full z-10 bg-ivory">
              <Welcome />
              <CollectionsGrid />
              <DesignedExperiences />
              <LuxuryCounters />
              <CTAWrapper
                onExploreClick={() => handleLinkClick('#collections')}
                onContactClick={() => handleLinkClick('#contact')}
              />
              <Footer
                onBackToTop={() => handleLinkClick('#hero')}
                onLinkClick={handleLinkClick}
              />
            </div>
          </>
        )}
      </div>
    </HelmetProvider>
  );
};

export default App;
