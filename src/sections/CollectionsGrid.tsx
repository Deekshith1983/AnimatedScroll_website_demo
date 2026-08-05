import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CategoryItem {
  num: string;
  title: string;
  desc: string;
  img: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    num: '01',
    title: 'Minimal Basins',
    desc: 'Pure geometry and fine ceramic rims designed as visual anchor points.',
    img: '/assets/3.png',
  },
  {
    num: '02',
    title: 'Modern Vanities',
    desc: 'Understated timber surfaces coupled with premium integrated stone basins.',
    img: '/assets/4.jpg',
  },
  {
    num: '03',
    title: 'Precision Showers',
    desc: 'Thermostatic control systems engineered for high performance water flow.',
    img: '/assets/7.jpg',
  },
  {
    num: '04',
    title: 'Designer Ceramics',
    desc: 'Handcrafted vessels finished in soft bronze, gold, and textured clay colors.',
    img: '/assets/6.jpg',
  },
];

export const CollectionsGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Fade up cards sequentially
    gsap.fromTo(
      grid.querySelectorAll('.category-card'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="collections"
      className="py-32 md:py-48 px-6 md:px-16 w-full bg-travertine text-espresso select-none"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header spread */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 md:mb-24 gap-6">
          <div className="flex flex-col space-y-4 max-w-xl">
            <span className="text-[10px] md:text-xs tracking-luxury text-bronze uppercase font-sans font-light">
              02 / Collections
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-espresso tracking-tight uppercase">
              Curated Materials.
            </h2>
          </div>
          <p className="text-sm md:text-base text-warmGrey font-sans font-light leading-relaxed max-w-[420px]">
            Explore individual product collections crafted to enrich structural geometry and create calm, balanced spaces.
          </p>
        </div>

        {/* 4-Card Luxury Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="category-card group bg-limestone rounded-[28px] overflow-hidden border border-luxuryBorder warm-shadow hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full cursor-pointer opacity-0"
            >
              {/* Image box */}
              <div className="w-full aspect-[16/10] overflow-hidden relative">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover filter brightness-[0.96] group-hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Text content */}
              <div className="p-8 md:p-10 flex flex-col flex-grow justify-between gap-6">
                <div className="flex flex-col space-y-3">
                  <span className="text-xs font-sans font-light text-bronze">
                    {cat.num} /
                  </span>
                  <h3 className="text-2xl font-serif font-light text-espresso tracking-wide uppercase">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-warmGrey font-sans font-light leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 pt-2 text-[10px] tracking-luxury uppercase text-bronze group-hover:text-espresso transition-colors duration-300">
                  <span>View Details</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">
                    &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;
