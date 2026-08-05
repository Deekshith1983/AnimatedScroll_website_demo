import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SceneConfig {
  key: number;
  selector: string;
  pcImg: string;
  mobileImg: string;
  origin: string; // transform origin for dolly camera zoom
  startScale: number;
  endScale: number;
  tag: string;
  title: string;
  desc: string;
  alignClass: string; // layout grid positioning (justify-start / justify-end)
  textClass: string;  // text alignment (text-left / text-center)
}

export const HeroTimeline: React.FC = () => {
  const spacerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isMobileTablet, setIsMobileTablet] = useState<boolean>(false);

  // Monitor screen size for responsive assets
  useEffect(() => {
    const handleResize = () => {
      setIsMobileTablet(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scenes: SceneConfig[] = [
    {
      key: 1,
      selector: '.h-scene-1',
      pcImg: '/assets/pc/1.png',
      mobileImg: '/assets/mobile_tablet/1.png',
      origin: '50% 80%', // Orange designer basin in the foreground
      startScale: 1.0,
      endScale: 1.08,
      tag: 'Scene 01 — Arrival',
      title: 'Every great space begins with a feeling.',
      desc: 'Welcome to a place where craftsmanship meets timeless design. Every surface, every curve, and every material has been carefully selected to transform everyday rituals.',
      alignClass: 'justify-start',
      textClass: 'text-left',
    },
    {
      key: 2,
      selector: '.h-scene-2',
      pcImg: '/assets/pc/2.png',
      mobileImg: '/assets/mobile_tablet/2.png',
      origin: '65% 55%', // Freestanding bathtub suite focus
      startScale: 1.0,
      endScale: 1.07,
      tag: 'Scene 02 — Bathtub Suite',
      title: 'Luxury is never loud.',
      desc: 'It reveals itself through proportion, balance, and precision. Our collections are designed to create harmony between architecture, material, and light.',
      alignClass: 'justify-end',
      textClass: 'text-left',
    },
    {
      key: 3,
      selector: '.h-scene-3',
      pcImg: '/assets/pc/3.png',
      mobileImg: '/assets/mobile_tablet/3.jpg',
      origin: '35% 70%', // Commode toilet focus
      startScale: 1.0,
      endScale: 1.06,
      tag: 'Scene 03 — Sanitaryware',
      title: 'Where function becomes sculpture.',
      desc: 'Every basin is designed as a centerpiece—crafted with precision, refined through detail, and finished to elevate the character of every bathroom.',
      alignClass: 'justify-start',
      textClass: 'text-left',
    },
    {
      key: 4,
      selector: '.h-scene-4',
      pcImg: '/assets/pc/4.png',
      mobileImg: '/assets/mobile_tablet/4.jpg',
      origin: '50% 50%', // Cyan designer basin in the center
      startScale: 1.0,
      endScale: 1.06,
      tag: 'Scene 04 — Coloured Basins',
      title: 'Every finish tells a story.',
      desc: 'From warm metallic tones to handcrafted ceramics, each material has been selected not only for its beauty but for the way it interacts with light.',
      alignClass: 'justify-end',
      textClass: 'text-left',
    },
    {
      key: 5,
      selector: '.h-scene-5',
      pcImg: '/assets/pc/5.png',
      mobileImg: '/assets/mobile_tablet/5.jpg',
      origin: '50% 60%', // Zoom out from central display stand
      startScale: 1.05,
      endScale: 1.0,
      tag: 'Scene 05 — Showroom',
      title: 'Crafted Spaces. Designed to Inspire.',
      desc: 'Every detail has a purpose. Every collection has a story. Every space deserves exceptional design.',
      alignClass: 'justify-center items-center',
      textClass: 'text-center',
    },
  ];

  useEffect(() => {
    const spacer = spacerRef.current;
    const viewport = viewportRef.current;
    if (!spacer || !viewport) return;

    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set('.scene-heading', { y: 24, opacity: 0 });
      gsap.set('.scene-tag', { opacity: 0 });
      gsap.set('.scene-desc', { y: 18, opacity: 0 });
      gsap.set('.scene-buttons', { y: 12, opacity: 0 });
      gsap.set('.hero-scene', { opacity: 0, pointerEvents: 'none' });
      gsap.set('.hero-scroll-prompt', { opacity: 0.6 });

      // First scene is visible initially
      gsap.set('.h-scene-1', { opacity: 1, pointerEvents: 'auto' });

      // One-time load entrance for Scene 1 (so text is visible immediately on mount)
      gsap.fromTo(
        '.h-scene-1 .scene-heading',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.h-scene-1 .scene-tag',
        { opacity: 0 },
        { opacity: 0.6, duration: 1.0, delay: 0.2 }
      );
      gsap.fromTo(
        '.h-scene-1 .scene-desc',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 0.88, duration: 1.0, ease: 'power3.out', delay: 0.45 }
      );

      // 2. Master ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          start: 'top top',
          end: 'bottom bottom',
          pin: viewport,
          scrub: 2.5, // heavy luxurious interpolation
        },
      });

      const chapDur = 2.0; // 5 chapters, total timeline duration 10.0
      const zoomDur = 1.4; // 70% zoom duration
      const fadeStart = 1.7; // 85% mark (15% fade out/in crossover)

      // Fade out scroll indicator prompt early in scroll (first 40% of Scene 1)
      tl.to('.hero-scroll-prompt', { opacity: 0, duration: 0.8, ease: 'power2.out' }, 0.0);

      scenes.forEach((scene, idx) => {
        const start = idx * chapDur;

        // A. Cross dissolve Entrance (starts at fadeStart of the previous scene)
        if (idx > 0) {
          const prevFadeStart = (idx - 1) * chapDur + fadeStart;
          tl.to(
            scene.selector,
            { opacity: 1, pointerEvents: 'auto', duration: 0.3, ease: 'power2.inOut' },
            prevFadeStart
          );
        }

        // B. Outgoing Cross dissolve Exit (fade out at the end segment of this scene)
        if (idx < scenes.length - 1) {
          tl.to(
            scene.selector,
            { opacity: 0, pointerEvents: 'none', duration: 0.3, ease: 'power2.inOut' },
            start + fadeStart
          );
        }

        // C. Camera Dolly Zoom (70% scene duration, finishes before fade starts)
        tl.fromTo(
          `${scene.selector} .scene-img`,
          { scale: scene.startScale },
          { scale: scene.endScale, duration: zoomDur, ease: 'power3.inOut' },
          start
        );

        // D. Text Entrance Sequence (runs on active scene, skip Scene 1 since it loads once on mount)
        if (idx > 0) {
          // Heading: Fade from 0%, move upward 24px, duration 1.2s, ease Power4 Out
          tl.fromTo(
            `${scene.selector} .scene-heading`,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
            start + 0.2
          );

          // Label tag: Fades in with heading
          tl.fromTo(
            `${scene.selector} .scene-tag`,
            { opacity: 0 },
            { opacity: 0.6, duration: 1.0 },
            start + 0.2
          );

          // Body: Starts after heading (delay 0.25s), moves upward 18px, duration 1.0s
          tl.fromTo(
            `${scene.selector} .scene-desc`,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 0.88, duration: 1.0, ease: 'power3.out' },
            start + 0.45
          );
        }

        // Buttons: Appears last (delay 0.45s after heading), small fade/upward movement
        if (idx === 4) {
          tl.fromTo(
            `${scene.selector} .scene-buttons`,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            start + 0.65
          );
        }

        // Outgoing text fade (complete fade away before cross dissolve begins)
        if (idx < scenes.length - 1) {
          tl.to(
            [
              `${scene.selector} .scene-tag`,
              `${scene.selector} .scene-heading`,
              `${scene.selector} .scene-desc`
            ],
            { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' },
            start + 1.4 // begins exactly when zoom completes
          );
        }
      });

      ScrollTrigger.refresh();
    }, spacer);

    return () => ctx.revert();
  }, [isMobileTablet]);

  const handleCTA = (selector: string) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      const target = document.querySelector(selector);
      if (target) {
        lenis.scrollTo(target, {
          duration: 2.2,
          offset: -40,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
  };

  return (
    <div ref={spacerRef} className="relative w-full h-[900vh] bg-ivory">
      {/* Viewport Locked Frame */}
      <div
        ref={viewportRef}
        className="w-full h-screen overflow-hidden bg-ivory text-espresso relative showroom-viewport select-none"
      >
        {scenes.map((scene) => (
          <div
            key={scene.key}
            className={`hero-scene ${scene.selector.substring(1)} absolute inset-0 w-full h-full flex flex-col justify-center overflow-hidden`}
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 w-full h-full z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(248,245,239,0.12)] via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_65%,rgba(245,239,229,0.08)_100%)] z-10" />
              
              <img
                src={isMobileTablet ? scene.mobileImg : scene.pcImg}
                className="w-full h-full object-cover filter brightness-[0.98] scene-img will-change-transform"
                style={{
                  transformOrigin: scene.origin,
                }}
                alt={scene.title}
              />
            </div>

            {/* Ambient Lighting Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(182,138,82,0.05)_0%,transparent_60%)] z-20 pointer-events-none opacity-0 scene-light animate-light" />

            {/* Alternating Layout Content Block */}
            <div className={`w-full max-w-[1440px] mx-auto h-full flex items-center relative z-30 px-6 md:px-16 lg:px-24 ${scene.alignClass}`}>
              <div className={`max-w-[520px] w-full flex flex-col select-none ${scene.textClass}`}>
                {/* Small Label */}
                <span 
                  className="scene-tag text-[10px] md:text-xs tracking-luxury text-[#F9F6F1] uppercase font-sans font-light mb-8 opacity-0"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.18)' }}
                >
                  {scene.tag}
                </span>
                
                {/* Refined Luxury Serif Heading */}
                <h2 
                  className="scene-heading text-4xl sm:text-5xl md:text-[62px] font-serif font-light text-[#F9F6F1] tracking-[0.02em] leading-[1.08] uppercase mb-8 opacity-0"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.18)' }}
                >
                  {scene.title}
                </h2>
                
                {/* Minimal Sans-Serif Body Copy */}
                <p 
                  className="scene-desc text-base sm:text-lg md:text-[19px] text-[#F9F6F1] font-sans font-light leading-[1.7] mb-10 opacity-0"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.18)' }}
                >
                  {scene.desc}
                </p>

                {/* Final CTA Buttons */}
                {scene.key === 5 && (
                  <div className={`scene-buttons flex flex-col sm:flex-row gap-4 opacity-0 ${scene.textClass === 'text-center' ? 'justify-center' : 'justify-start'}`}>
                    <button
                      onClick={() => handleCTA('#collections')}
                      className="hero-cta-btn pointer-events-auto cursor-pointer"
                    >
                      Discover Collections
                    </button>
                    <button
                      onClick={() => handleCTA('#contact')}
                      className="hero-cta-btn pointer-events-auto cursor-pointer"
                    >
                      Visit Showroom
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Bouncing Scroll indicator prompt at bottom center */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-luxury text-[#F9F6F1]/60 z-30 pointer-events-none uppercase font-sans hero-scroll-prompt">
          <span>Scroll to explore</span>
          <span className="animate-bounce text-xs">&darr;</span>
        </div>
      </div>
    </div>
  );
};

export default HeroTimeline;
