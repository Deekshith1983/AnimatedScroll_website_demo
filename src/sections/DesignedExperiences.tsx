import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DesignedExperiences: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cardsEl = cardsRef.current;
    if (!container || !cardsEl) return;

    const ctx = gsap.context(() => {
      const cards = cardsEl.children;

      // Staggered reveal of 4 luxury value cards
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsEl,
            start: 'top 85%',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      title: 'Curated Premium Collections',
      desc: 'Internationally inspired bathroom solutions selected for timeless elegance.',
    },
    {
      title: 'Thoughtful Design',
      desc: 'Beautiful spaces created through careful attention to detail and functionality.',
    },
    {
      title: 'Expert Guidance',
      desc: 'Supporting homeowners, architects, interior designers, and builders throughout every stage of their project.',
    },
    {
      title: 'Premium Showroom Experience',
      desc: 'Walk through complete bathroom environments before making confident design decisions.',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative bg-charcoal text-ivory py-28 md:py-40 px-6 md:px-16 overflow-hidden border-t border-[#c5a880]/10"
    >
      {/* Background glow accents */}
      <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#c5a880]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-bronze/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col space-y-16 relative z-10">
        {/* Central Section Title */}
        <div className="max-w-3xl flex flex-col space-y-6">
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#c5a880] uppercase font-sans font-light">
            08 / Value Pillars
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide uppercase leading-tight">
            Designed Around <br /> Exceptional Experiences.
          </h2>
          <div className="w-16 h-[1px] bg-[#c5a880]/30" />
        </div>

        {/* 4 Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {experiences.map((exp, idx) => (
            <div
              key={exp.title}
              className="group flex flex-col justify-between p-8 bg-[#0a0a0a] border border-[#c5a880]/5 hover:border-[#c5a880]/30 transition-all duration-500 rounded-none shadow-lg hover:-translate-y-2 relative"
            >
              {/* Card numbering with golden tint */}
              <div className="flex justify-between items-center mb-10">
                <span className="font-serif text-[#c5a880] text-lg font-light tracking-wide">
                  / 0{idx + 1}
                </span>
                <div className="w-1.5 h-1.5 bg-[#c5a880]/20 group-hover:bg-[#c5a880] transition-colors duration-500 rounded-full" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-serif font-light text-white uppercase tracking-wider mb-4 group-hover:text-[#c5a880] transition-colors leading-snug">
                  {exp.title}
                </h3>
                <p className="text-xs md:text-sm text-[#a1a1aa] font-sans font-light leading-relaxed">
                  {exp.desc}
                </p>
              </div>

              {/* Bottom detail slide line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c5a880] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignedExperiences;
