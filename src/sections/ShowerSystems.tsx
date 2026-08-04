import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BreathingImage from '../components/Common/BreathingImage';

gsap.registerPlugin(ScrollTrigger);

export const ShowerSystems: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const imageReveal = imageRevealRef.current;
    const content = contentRef.current;
    if (!container || !imageReveal || !content) return;

    const ctx = gsap.context(() => {
      // Vertical reveal (clip-path reveal from top to bottom)
      gsap.fromTo(
        imageReveal,
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.6,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageReveal,
            start: 'top 80%',
          },
        }
      );

      // Vertical text cascade stagger
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.25,
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
      ref={containerRef}
      className="relative bg-[#0d0d0d] text-ivory py-24 md:py-36 px-6 md:px-16 overflow-hidden border-t border-[#c5a880]/10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
        {/* Left Column: Image Reveal - Takes 6 Cols */}
        <div
          ref={imageRevealRef}
          className="lg:col-span-6 w-full aspect-[3/4] max-h-[600px] relative overflow-hidden border border-[#c5a880]/20 shadow-2xl z-0"
          style={{ willChange: 'clip-path' }}
        >
          <BreathingImage
            src="/assets/7.jpg"
            alt="Precision Shower System Close-up"
            parallaxSpeed={10}
          />
        </div>

        {/* Right Column: Premium Content & Details - Takes 6 Cols */}
        <div ref={contentRef} className="lg:col-span-6 flex flex-col space-y-6 md:space-y-8 max-w-xl">
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#c5a880] uppercase font-sans font-light">
            07 / Precision Systems
          </span>

          {/* Heading with Metallic Sweep Animation */}
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase leading-tight metallic-text">
            Precision Shower <br /> Systems
          </h2>

          <p className="text-sm md:text-base text-[#a1a1aa] font-sans font-light leading-relaxed">
            Engineered with advanced functionality and premium finishes, our shower collections elevate the everyday experience through precision and timeless design.
          </p>

          <div className="w-full h-[1px] bg-[#c5a880]/10" />

          {/* Luxury Specifications Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="text-[10px] text-[#c5a880] tracking-luxury uppercase block mb-1">
                Thermostatic
              </span>
              <p className="text-xs text-[#a1a1aa] font-sans font-light">
                Intel-flow technology locks water temperature to 0.1°C precision.
              </p>
            </div>
            <div>
              <span className="text-[10px] text-[#c5a880] tracking-luxury uppercase block mb-1">
                Finishes
              </span>
              <p className="text-xs text-[#a1a1aa] font-sans font-light">
                Brushed Champagne Gold, Matte Bronze, and Polished Chrome options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowerSystems;
