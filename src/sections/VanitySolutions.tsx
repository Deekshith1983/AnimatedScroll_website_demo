import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BreathingImage from '../components/Common/BreathingImage';

gsap.registerPlugin(ScrollTrigger);

export const VanitySolutions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textCol = textColRef.current;
    if (!container || !textCol) return;

    const ctx = gsap.context(() => {
      // Slow fade-up text reveal with scale
      gsap.fromTo(
        textCol.children,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textCol,
            start: 'top 85%',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-charcoal text-ivory py-24 md:py-36 px-6 md:px-16 overflow-hidden border-t border-[#c5a880]/10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Column: Refined Vanity Copy */}
        <div ref={textColRef} className="flex flex-col space-y-6 md:space-y-8 max-w-xl order-2 lg:order-1">
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#c5a880] uppercase font-sans font-light">
            04 / Vanity Solutions
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide leading-tight uppercase">
            Refined Vanity <br /> Solutions
          </h2>
          <p className="text-sm md:text-base text-[#a1a1aa] font-sans font-light leading-relaxed">
            Beautifully integrated vanity systems designed with premium materials, functional layouts, and elegant detailing for sophisticated living spaces.
          </p>
          <div className="flex flex-col space-y-4 pt-4">
            <div className="flex items-start gap-4">
              <span className="text-xs text-[#c5a880] font-sans font-light tracking-luxury pt-1">01 /</span>
              <p className="text-xs md:text-sm text-[#a1a1aa] font-sans font-light">
                Tailored layouts that blend seamlessly into premium bathroom architectures.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-xs text-[#c5a880] font-sans font-light tracking-luxury pt-1">02 /</span>
              <p className="text-xs md:text-sm text-[#a1a1aa] font-sans font-light">
                Curated natural marbles, treated premium walnuts, and custom metal fixtures.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Image Parallax */}
        <div className="w-full aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5] max-h-[650px] relative overflow-hidden border border-[#c5a880]/20 shadow-2xl order-1 lg:order-2">
          <BreathingImage
            src="/assets/4.jpg"
            alt="Refined Vanity Layout Design"
            parallaxSpeed={14}
          />
        </div>
      </div>
    </section>
  );
};

export default VanitySolutions;
