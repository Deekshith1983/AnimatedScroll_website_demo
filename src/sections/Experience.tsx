import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BreathingImage from '../components/Common/BreathingImage';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const horizontalPanel = horizontalPanelRef.current;
    const content = contentRef.current;
    if (!container || !horizontalPanel || !content) return;

    const ctx = gsap.context(() => {
      // Horizontal slide reveal of the panel container
      gsap.fromTo(
        horizontalPanel,
        { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
          },
        }
      );

      // Text reveal inside panel
      gsap.fromTo(
        content.querySelectorAll('.animate-fade-up'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative bg-charcoal text-ivory py-24 md:py-36 px-6 md:px-16 overflow-hidden border-t border-[#c5a880]/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-12 md:space-y-16">
        {/* Intro Tagline */}
        <div ref={contentRef} className="flex flex-col space-y-4 max-w-2xl">
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#c5a880] uppercase font-sans font-light animate-fade-up">
            02 / The Showroom Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide uppercase animate-fade-up">
            More Than Products. <br /> Complete Experiences.
          </h2>
          <p className="text-sm md:text-base text-[#a1a1aa] font-sans font-light leading-relaxed animate-fade-up">
            Our showroom is designed to help you experience complete bathroom concepts instead of individual products. Every display is carefully composed to showcase how materials, textures, lighting, and craftsmanship work together.
          </p>
        </div>

        {/* Large Horizontal Mask Reveal Panel */}
        <div
          ref={horizontalPanelRef}
          className="relative w-full aspect-[16/9] max-h-[600px] border border-[#c5a880]/20 overflow-hidden shadow-2xl"
          style={{ willChange: 'clip-path' }}
        >
          <BreathingImage
            src="/assets/8.jpg"
            alt="Om Mangalam Architectural Display Showroom"
            parallaxSpeed={8}
          />
          {/* Subtle gold framing borders on corner edges */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c5a880]/30 pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#c5a880]/30 pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#c5a880]/30 pointer-events-none z-20" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#c5a880]/30 pointer-events-none z-20" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
