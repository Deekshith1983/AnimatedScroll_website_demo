import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BreathingImage from '../components/Common/BreathingImage';

gsap.registerPlugin(ScrollTrigger);

export const Welcome: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    if (!container || !heading || !content) return;

    const ctx = gsap.context(() => {
      // Heading slide and fade reveal
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
          },
        }
      );

      // Paragraph slide and fade reveal
      gsap.fromTo(
        content.querySelectorAll('.reveal-text'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-charcoal text-ivory py-24 md:py-36 px-6 md:px-16 overflow-hidden border-t border-[#c5a880]/10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Column: Premium Parallax Image */}
        <div className="w-full aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5] max-h-[650px] relative overflow-hidden border border-[#c5a880]/20 shadow-2xl">
          <BreathingImage
            src="/assets/1.png"
            alt="Om Mangalam Curated Showroom Entry"
            parallaxSpeed={12}
          />
        </div>

        {/* Right Column: Editorial Copy */}
        <div ref={contentRef} className="flex flex-col space-y-6 md:space-y-8 max-w-xl">
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#c5a880] uppercase font-sans font-light reveal-text">
            01 / Introduction
          </span>
          
          <h2
            ref={headingRef}
            className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide leading-tight uppercase"
          >
            Welcome to <br /> Om Mangalam
          </h2>
          
          <p className="text-sm md:text-base text-[#a1a1aa] font-sans font-light leading-relaxed reveal-text">
            Every exceptional bathroom begins with a vision. At Om Mangalam, we curate premium collections and immersive showroom environments that help homeowners, architects, interior designers, and builders transform ideas into beautifully crafted spaces.
          </p>
          
          <div className="w-16 h-[1px] bg-[#c5a880]/40 reveal-text" />
          
          <p className="text-xs md:text-sm text-[#a1a1aa]/80 italic font-serif font-light reveal-text leading-relaxed">
            "Design is not just what it looks like. Design is how it functions, how it flows, and how it translates into a space of timeless solace."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
