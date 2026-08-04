import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BreathingImage from '../components/Common/BreathingImage';

gsap.registerPlugin(ScrollTrigger);

export const ComfortCraftsmanship: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const foregroundCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !foregroundCardRef.current) return;

    const ctx = gsap.context(() => {
      // Foreground card moves faster (Parallax scroll effect)
      gsap.fromTo(
        foregroundCardRef.current,
        { y: 80 },
        {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0d0d0d] text-ivory py-32 md:py-48 px-6 md:px-16 overflow-hidden border-t border-[#c5a880]/10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        {/* Left Column (Image): Takes 7 cols */}
        <div className="lg:col-span-7 w-full aspect-[4/3] lg:aspect-[3/4] max-h-[700px] relative overflow-hidden border border-[#c5a880]/20 shadow-2xl z-0">
          <BreathingImage
            src="/assets/5.jpg"
            alt="Comfort & Craftsmanship Sanitaryware"
            parallaxSpeed={6}
          />
        </div>

        {/* Right Column / Foreground Floating Card: Takes 5 cols, positioned with higher z-index and moves faster */}
        <div
          ref={foregroundCardRef}
          className="lg:col-span-5 w-full bg-charcoal/95 border border-[#c5a880]/15 p-8 md:p-12 shadow-2xl z-10 lg:-ml-16 relative luxury-blur will-change-transform"
        >
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#c5a880] uppercase font-sans font-light block mb-4">
            05 / Engineering & Comfort
          </span>
          
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white tracking-wide uppercase leading-tight mb-6">
            Comfort Meets <br /> Craftsmanship
          </h2>
          
          <p className="text-xs md:text-sm text-[#a1a1aa] font-sans font-light leading-relaxed mb-6">
            Contemporary sanitaryware engineered for exceptional comfort, seamless functionality, and lasting elegance in every environment.
          </p>
          
          <div className="border-t border-[#c5a880]/10 pt-6 mt-6 flex flex-col space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#a1a1aa] font-sans font-light">Ergonomic Form Factor</span>
              <span className="text-accent font-serif font-light font-bold">100% Custom</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#a1a1aa] font-sans font-light">Water Efficiency Rating</span>
              <span className="text-accent font-serif font-light font-bold">5-Star Eco</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComfortCraftsmanship;
