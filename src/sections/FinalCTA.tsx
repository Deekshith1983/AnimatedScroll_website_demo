import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  onVisitClick: () => void;
  onContactClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onVisitClick, onContactClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bgImage = bgImageRef.current;
    const content = contentRef.current;
    if (!section || !bgImage || !content) return;

    // Detect mobile/tablet screen sizes to skip heavy scroll-bound parallax
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        // Slow background zoom on scroll-in
        gsap.fromTo(
          bgImage,
          { scale: 1.05, yPercent: -5 },
          {
            scale: 1.15,
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      } else {
        // Set static padding scale on mobile so image covers frame correctly
        gsap.set(bgImage, { scale: 1.08, yPercent: 0 });
      }

      // Text reveal on viewport entry
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[80vh] min-h-[500px] flex flex-col justify-center items-center px-6 md:px-16 overflow-hidden bg-charcoal"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Dark Cinematic Overlay */}
        <div className="absolute inset-0 bg-black/75 z-10 pointer-events-none" />
        
        {/* Reusing hero image for narrative closure */}
        <img
          ref={bgImageRef}
          src="/assets/2.png"
          alt="Luxury Bathroom Design Concept"
          className="w-full h-[120%] object-cover absolute top-[-10%] left-0 origin-center will-change-transform opacity-50"
          loading="lazy"
        />
      </div>

      {/* Foreground Content */}
      <div
        ref={contentRef}
        className="max-w-3xl w-full mx-auto text-center relative z-20 flex flex-col items-center space-y-6 md:space-y-8"
      >
        <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#c5a880] uppercase font-sans font-light">
          10 / Curated Solace
        </span>
        
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-wide uppercase leading-tight gold-glow">
          Every Detail <br /> Shapes The Experience.
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-[#a1a1aa] font-sans font-light leading-relaxed max-w-xl">
          Discover curated collections crafted to transform everyday spaces into timeless expressions of luxury.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 w-full justify-center">
          <button
            onClick={onVisitClick}
            className="px-8 py-3.5 bg-ivory text-charcoal text-[11px] tracking-luxury uppercase hover:bg-[#c5a880] hover:text-charcoal transition-all duration-500 font-sans font-medium"
          >
            Visit Showroom
          </button>
          <button
            onClick={onContactClick}
            className="px-8 py-3.5 border border-ivory/30 text-ivory text-[11px] tracking-luxury uppercase hover:border-[#c5a880] hover:text-[#c5a880] transition-all duration-500 font-sans font-medium"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
