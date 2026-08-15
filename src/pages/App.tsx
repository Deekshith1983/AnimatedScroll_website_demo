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
import { MaterialShowcase } from '../sections/MaterialShowcase';
import { DesignedExperiences } from '../sections/DesignedExperiences';
import { LuxuryCounters } from '../sections/LuxuryCounters';
import { GalleryShowcase } from '../sections/GalleryShowcase';
import { Testimonials } from '../sections/Testimonials';
import { CTAWrapper } from '../sections/CTAWrapper';
import { Footer } from '../components/Footer/Footer';

gsap.registerPlugin(ScrollTrigger);

const IMAGES_TO_PRELOAD = [
  '/assets/hero-poster.jpg',
  '/assets/8.png',
  '/assets/3.jpg',
  '/assets/4.jpg',
  '/assets/7.jpg',
  '/assets/6.jpg',
  '/assets/2.png',
  '/logo/logo.jpg',
];

export const App: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const [isLoaderComplete, setIsLoaderComplete] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const lenisRef = useRef<Lenis | null>(null);

  // Monitor breakpoint query for preload link priority matching
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

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

  // Monitor scroll for champagne progress line — direct DOM update, no React re-render
  useEffect(() => {
    if (!isLoaderComplete) return;

    const bar = scrollBarRef.current;
    if (!bar) return;

    // GSAP quickSetter writes height directly to the DOM element, bypassing React
    const setBarHeight = gsap.quickSetter(bar, 'height', '%');

    const handleScrollProgress = () => {
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      if (totalH <= 0) return;
      const pct = (window.scrollY / totalH) * 100;
      setBarHeight(pct);
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
          <meta name="description" content="Om Mangalam curates high-end luxury bathroom environments, designer basins, and premium ceramics. Visit our Jaipur showroom." />
          <meta name="keywords" content="Om Mangalam, luxury bathroom, sanitaryware, designer basins, luxury showroom, vanity systems, architecture" />
          <link rel="canonical" href="https://ommangalam.com" />
          {/* Preload only the viewport-appropriate Hero video as early as possible */}
          {isMobile ? (
            <link rel="preload" as="video" href="/assets/project1-scroll-mobile.mp4" type="video/mp4" />
          ) : (
            <link rel="preload" as="video" href="/assets/project1-scroll.mp4" type="video/mp4" />
          )}
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
              ref={scrollBarRef}
              className="scroll-indicator-progress"
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
            <div className="relative w-full z-10 bg-[#F8F5EF]">
              <Welcome />
              <CollectionsGrid />
              <MaterialShowcase />
              <DesignedExperiences />
              <LuxuryCounters />
              <GalleryShowcase />
              <Testimonials />
              <CTAWrapper
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
