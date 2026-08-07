import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SceneConfig {
  key: number;
  selector: string;
  tag: string;
  title: string;
  desc: string;
}

export const HeroTimeline: React.FC = () => {
  const spacerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  // Monitor video loading status
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
    };

    if (video.readyState >= 1) {
      setIsVideoReady(true);
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const scenes: SceneConfig[] = [
    {
      key: 1,
      selector: '.h-scene-1',
      tag: '01 / Entrance',
      title: 'Where Luxury Finds Its Place',
      desc: 'Spaces thoughtfully crafted to inspire extraordinary living.',
    },
    {
      key: 2,
      selector: '.h-scene-2',
      tag: '02 / Suite',
      title: 'Designed Around Timeless Living',
      desc: 'Elegant collections that bring harmony, comfort, and sophistication into every home.',
    },
    {
      key: 3,
      selector: '.h-scene-3',
      tag: '03 / Detail',
      title: 'Crafted Beyond Expectations',
      desc: 'Every curve, every finish, every detail reflects our commitment to exceptional craftsmanship.',
    },
    {
      key: 4,
      selector: '.h-scene-4',
      tag: '04 / Collection',
      title: 'Curated For Every Vision',
      desc: 'A premium collection of basins, sanitaryware, vanities, and shower systems designed for modern architecture.',
    },
    {
      key: 5,
      selector: '.h-scene-5',
      tag: '05 / Showroom',
      title: 'Experience Om Mangalam',
      desc: 'Where timeless design, enduring quality, and inspired living come together.',
    },
  ];

  useEffect(() => {
    if (!isVideoReady) return;

    const spacer = spacerRef.current;
    const viewport = viewportRef.current;
    const video = videoRef.current;
    if (!spacer || !viewport || !video) return;

    const ctx = gsap.context(() => {
      // 1. Initial text styling hidden
      gsap.set('.scene-heading', { y: 30, opacity: 0, filter: 'blur(8px)' });
      gsap.set('.scene-desc', { y: 20, opacity: 0 });
      gsap.set('.scene-buttons', { y: 15, opacity: 0 });
      gsap.set('.hero-scene', { opacity: 0, pointerEvents: 'none' });
      gsap.set('.hero-scroll-prompt', { opacity: 0.6 });

      // First scene is visible initially
      gsap.set('.h-scene-1', { opacity: 1, pointerEvents: 'auto' });

      // One-time load entrance animation for Scene 1 (so it's visible immediately on load)
      gsap.fromTo(
        '.h-scene-1 .scene-heading',
        { y: 30, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power4.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.h-scene-1 .scene-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.82, duration: 0.9, ease: 'power3.out', delay: 0.4 } // 200ms delay
      );

      // Proxy object to scrub video playback currentTime
      const videoProxy = { currentTime: 0 };
      const videoDuration = video.duration || 0;

      // 2. Master ScrollTrigger Timeline
      // spacer is h-[1400vh] to reduce scrub speed by 50%
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          start: 'top top',
          end: 'bottom bottom',
          pin: viewport,
          scrub: 3.5, // heavier luxury scroll interpolation lag
        },
      });

      // Synchronize video timeline scrub directly with scroll trigger progress
      tl.to(videoProxy, {
        currentTime: videoDuration,
        ease: 'none',
        duration: 10.0, // timeline virtual duration units
        onUpdate: () => {
          if (video && video.readyState >= 2) {
            video.currentTime = videoProxy.currentTime;
          }
        },
      }, 0);

      const chapDur = 2.0; // 5 chapters, total timeline duration 10.0
      const fadeStart = 1.8; // Transition starts at 90% mark (10% scene transition)

      // Fade out bottom scroll prompt early in the scroll sequence
      tl.to('.hero-scroll-prompt', { opacity: 0, duration: 0.8, ease: 'power2.out' }, 0.0);

      scenes.forEach((scene, idx) => {
        const start = idx * chapDur;

        // A. Cross dissolve Entrance of the Scene container (except Scene 1)
        if (idx > 0) {
          const prevFadeStart = (idx - 1) * chapDur + fadeStart;
          tl.to(
            scene.selector,
            { opacity: 1, pointerEvents: 'auto', duration: 0.2, ease: 'power2.inOut' },
            prevFadeStart
          );
        }

        // B. Outgoing Cross dissolve Exit of the Scene container
        if (idx < scenes.length - 1) {
          tl.to(
            scene.selector,
            { opacity: 0, pointerEvents: 'none', duration: 0.2, ease: 'power2.inOut' },
            start + fadeStart
          );
        }

        // C. Text Entrance Sequence (runs on active scene, skip Scene 1 mount load)
        if (idx > 0) {
          // Heading enters (0.0 to 0.3 is text introduction, heading takes 0.2)
          tl.fromTo(
            `${scene.selector} .scene-heading`,
            { y: 30, opacity: 0, filter: 'blur(8px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.25, ease: 'power4.out' },
            start + 0.05
          );

          // Description: starts 200ms later (0.10 offset), duration 0.2 units
          tl.fromTo(
            `${scene.selector} .scene-desc`,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 0.82, duration: 0.2, ease: 'power3.out' },
            start + 0.15
          );
        }

        // Scene 5 CTA reveals last (350ms after description: 0.15 + 0.25 offset)
        if (idx === 4) {
          tl.fromTo(
            `${scene.selector} .scene-buttons`,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' },
            start + 0.4
          );
        }

        // D. Outgoing Text exits sequentially (Heading first, Description 150ms later)
        if (idx < scenes.length - 1) {
          // Heading exits first (at start + 1.8)
          tl.to(
            `${scene.selector} .scene-heading`,
            { y: -30, opacity: 0, filter: 'blur(8px)', duration: 0.15, ease: 'power2.in' },
            start + 1.8
          );

          // Description exits second (150ms delay, i.e., start + 1.85)
          tl.to(
            `${scene.selector} .scene-desc`,
            { y: -20, opacity: 0, duration: 0.15, ease: 'power2.in' },
            start + 1.85
          );
        }
      });

      ScrollTrigger.refresh();
    }, spacer);

    return () => ctx.revert();
  }, [isVideoReady]);

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
    <div ref={spacerRef} className="relative w-full h-[1400vh] bg-black">
      {/* Viewport Locked Video Container */}
      <div
        ref={viewportRef}
        className="w-full h-screen overflow-hidden bg-black text-[#F8F5EF] relative showroom-viewport select-none"
      >
        {/* HTML5 Video Element */}
        <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
          {/* Subtle overlay gradient: Left rgba(0,0,0,0.35) -> transparent right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent z-10 pointer-events-none" />
          
          <video
            ref={videoRef}
            src="/assets/project1.mp4"
            className="w-full h-full object-cover filter brightness-[0.95]"
            preload="auto"
            muted
            playsInline
          />
        </div>

        {/* Dynamic Alternating Text Position Wrapper */}
        {scenes.map((scene) => (
          <div
            key={scene.key}
            className={`hero-scene ${scene.selector.substring(1)} absolute z-30 flex flex-col pointer-events-none w-full
              left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 text-center items-center max-w-[90%]
              md:left-[7vw] md:top-[45%] md:translate-x-0 md:-translate-y-1/2 md:w-[460px] md:max-w-[460px] md:text-left md:items-start
              lg:left-[8vw] lg:top-[45%] lg:w-[520px] lg:max-w-[520px]`}
            style={{
              opacity: scene.key === 1 ? 1 : 0,
              pointerEvents: scene.key === 1 ? 'auto' : 'none',
            }}
          >
            {/* Small Category Label */}
            <span
              className="scene-tag text-[10px] md:text-xs tracking-luxury text-[#F8F5EF]/60 uppercase font-sans font-light mb-8"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.25)' }}
            >
              {scene.tag}
            </span>

            {/* Cormorant Garamond Heading */}
            <h2
              className="scene-heading text-[40px] md:text-[56px] lg:text-[72px] font-serif font-medium text-[#F8F5EF] tracking-[0.02em] leading-[1.1] mb-8"
              style={{
                opacity: 0,
                textShadow: '0 2px 10px rgba(0,0,0,0.25)',
              }}
            >
              {scene.title}
            </h2>

            {/* Inter Body Copy */}
            <p
              className="scene-desc text-[18px] md:text-[20px] text-[#F8F5EF]/82 font-sans font-light leading-[1.7] max-w-[520px] mb-10"
              style={{
                opacity: 0,
                textShadow: '0 2px 10px rgba(0,0,0,0.25)',
              }}
            >
              {scene.desc}
            </p>

            {/* Final Scene Button */}
            {scene.key === 5 && (
              <div
                className="scene-buttons flex flex-col sm:flex-row gap-4"
                style={{ opacity: 0 }}
              >
                <button
                  onClick={() => handleCTA('#collections')}
                  className="hero-cta-btn pointer-events-auto cursor-pointer"
                >
                  Explore Collections
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Scroll indicator prompt at bottom center */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-luxury text-[#F8F5EF]/60 z-30 pointer-events-none uppercase font-sans hero-scroll-prompt">
          <span>Scroll to explore</span>
          <span className="animate-bounce text-xs">&darr;</span>
        </div>
      </div>
    </div>
  );
};

export default HeroTimeline;
