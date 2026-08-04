import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreClick: () => void;
  onVisitClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onVisitClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bgImage = bgImageRef.current;
    const content = contentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    // Detect mobile/tablet screen sizes to skip heavy scroll-bound parallax
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    if (!hero || !bgImage || !content) return;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        // 1. Slow background scale from 1 to 1.08 driven by scroll
        gsap.fromTo(
          bgImage,
          { scale: 1 },
          {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );

        // 2. Slow parallax y-offset on the background image
        gsap.fromTo(
          bgImage,
          { yPercent: 0 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      } else {
        // Set static padding scale on mobile so image covers frame correctly
        gsap.set(bgImage, { scale: 1.05, yPercent: 0 });
      }

      // 3. Staggered reveal of text and buttons inside content
      const elements = content.children;
      gsap.fromTo(
        elements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.25,
          ease: 'power4.out',
          delay: 0.5,
        }
      );

      // 4. Subtle scroll indicator bounce
      if (scrollIndicator) {
        gsap.fromTo(
          scrollIndicator,
          { y: 0, opacity: 0.5 },
          {
            y: 8,
            opacity: 1,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
          }
        );
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-screen flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 overflow-hidden bg-charcoal"
    >
      {/* Background Container - Built modularly for future video/Three.js integration */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Dark Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/35 to-black/60 z-10 pointer-events-none" />
        
        {/* Cinematic Background Image */}
        <img
          ref={bgImageRef}
          src="/assets/2.png"
          alt="Luxury Bathroom Space by Om Mangalam"
          className="w-full h-[115%] object-cover absolute top-0 left-0 origin-center will-change-transform opacity-80"
          loading="eager"
        />
      </div>

      {/* Hero Content (Foreground) */}
      <div 
        ref={contentRef} 
        className="max-w-4xl w-full mx-auto text-center relative z-20 flex flex-col items-center space-y-6 md:space-y-8"
      >
        <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#c5a880] uppercase font-sans font-light">
          Welcome to Om Mangalam
        </span>
        
        {/* Large Editorial Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-ivory tracking-wide leading-tight gold-glow uppercase">
          Design Spaces That <br className="hidden md:inline" /> Inspire Timeless Living.
        </h1>
        
        {/* Editorial Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-[#a1a1aa] font-sans font-light leading-relaxed max-w-2xl">
          Om Mangalam brings together premium sanitaryware, curated collections, and thoughtfully designed bathroom environments that redefine modern luxury.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 w-full justify-center">
          <button
            onClick={onExploreClick}
            className="px-8 py-3.5 bg-ivory text-charcoal text-[11px] tracking-luxury uppercase hover:bg-[#c5a880] hover:text-charcoal transition-all duration-500 font-sans font-medium"
          >
            Explore Collections
          </button>
          <button
            onClick={onVisitClick}
            className="px-8 py-3.5 border border-ivory/30 text-ivory text-[11px] tracking-luxury uppercase hover:border-[#c5a880] hover:text-[#c5a880] transition-all duration-500 font-sans font-medium"
          >
            Visit Showroom
          </button>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-25 text-xs text-[#a1a1aa] font-light tracking-[0.25em] uppercase hover:text-ivory transition-colors"
        onClick={onExploreClick}
      >
        <span className="text-[9px]">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#c5a880] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
