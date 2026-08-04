import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BreathingImage from '../components/Common/BreathingImage';

gsap.registerPlugin(ScrollTrigger);

export const Collections: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const gridEl = gridRef.current;
    if (!container || !gridEl) return;

    const ctx = gsap.context(() => {
      const items = gridEl.children;

      // Independently stagger and animate cards as they scroll in
      gsap.fromTo(
        items,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridEl,
            start: 'top 85%',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const collectionItems = [
    {
      title: 'Minimalist Series',
      desc: 'Slim profiles, clean geometry, and integrated drain systems for architectural modernism.',
    },
    {
      title: 'Organic Stone',
      desc: 'Textured volcanic rock and natural limestone basins that bring mineral warmth to living spaces.',
    },
    {
      title: 'Monochromatic Matte',
      desc: 'Bold matte greys, whites, and blacks that harmonize with metal fixtures and stone veneers.',
    },
  ];

  return (
    <section
      id="collections"
      ref={containerRef}
      className="relative bg-charcoal text-ivory py-24 md:py-36 px-6 md:px-16 overflow-hidden border-t border-[#c5a880]/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        {/* Editorial Heading */}
        <div className="flex flex-col space-y-4 max-w-2xl">
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#c5a880] uppercase font-sans font-light">
            06 / Product curation
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide uppercase leading-tight">
            Contemporary <br /> Collections
          </h2>
          <p className="text-sm md:text-base text-[#a1a1aa] font-sans font-light leading-relaxed">
            Discover beautifully crafted basin designs available in refined colors, modern silhouettes, and premium materials curated for every design language.
          </p>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Visual Image - Takes 6 Columns */}
          <div className="lg:col-span-6 w-full aspect-[4/5] relative overflow-hidden border border-[#c5a880]/20 shadow-2xl">
            <BreathingImage
              src="/assets/6.jpg"
              alt="Contemporary Basins Collection"
              parallaxSpeed={12}
            />
          </div>

          {/* Staggered text cards - Takes 6 Columns */}
          <div ref={gridRef} className="lg:col-span-6 flex flex-col space-y-8">
            {collectionItems.map((item, index) => (
              <div
                key={item.title}
                className="p-8 bg-[#0d0d0d] border border-[#c5a880]/5 hover:border-[#c5a880]/20 transition-all duration-500 rounded-none group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-[#c5a880] tracking-luxury font-sans font-light">
                    COLLECTION / 0{index + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-[#c5a880] transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-serif font-light text-white uppercase tracking-wider mb-2 group-hover:text-[#c5a880] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#a1a1aa] font-sans font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
