import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MaterialItem {
  id: number;
  name: string;
  desc: string;
  img: string;
}

export const MaterialShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const grid = gridRef.current;
    if (!text || !grid) return;

    const ctx = gsap.context(() => {
      // Reveal Heading
      gsap.fromTo(
        text.querySelectorAll('.reveal-mat'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
          },
        }
      );

      // Reveal Material Cards
      const cards = grid.querySelectorAll('.material-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const materials: MaterialItem[] = [
    {
      id: 1,
      name: 'Travertine Stone',
      desc: 'Quarried from ancient limestone beds, our travertine features natural open pores and soft sandy tones that capture light beautifully.',
      img: '/assets/5.jpg',
    },
    {
      id: 2,
      name: 'Walnut Timber',
      desc: 'Finished with organic matte oils. Its rich walnut grain details provide structural warmth and ground the bathroom layout.',
      img: '/assets/11.jpg',
    },
    {
      id: 3,
      name: 'Satin Ceramic',
      desc: 'Fired at high temperatures for structural resilience, our matte satin ceramics are non-porous and feel incredibly silky.',
      img: '/assets/10.png',
    },
    {
      id: 4,
      name: 'Champagne Brass',
      desc: 'Hand-brushed gold tones that reflect ambient showroom lighting and develop a subtle living patina over time.',
      img: '/assets/15.jpg',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="bg-[#FAF8F4] text-[#2E241C] py-32 md:py-48 px-6 md:px-16 w-full"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col space-y-16">
        {/* Header Block */}
        <div ref={textRef} className="max-w-[620px] flex flex-col space-y-4 text-left">
          <span className="reveal-mat text-[10px] md:text-xs tracking-luxury text-[#C8A46A] uppercase font-sans font-light">
            03 / Tactility
          </span>
          <h2 className="reveal-mat text-4xl sm:text-5xl md:text-6xl font-serif font-light text-[#2E241C] tracking-tight uppercase">
            Architectural Materials
          </h2>
          <p className="reveal-mat text-base md:text-lg text-[#6F6358] font-sans font-light leading-relaxed">
            Spaces are defined by the objects we touch. Discover the curated natural materials that give Om Mangalam fixtures their exceptional weight, quality, and timeless textures.
          </p>
        </div>

        {/* Material 2x2 Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
        >
          {materials.map((mat) => (
            <div
              key={mat.id}
              className="material-card group flex flex-col space-y-6 select-none cursor-pointer"
            >
              {/* Photo Frame (zooms slightly on hover) */}
              <div className="w-full aspect-square rounded-[24px] overflow-hidden border border-[#C8A46A]/10 bg-[#F2ECE3] relative">
                <img
                  src={mat.img}
                  alt={mat.name}
                  className="w-full h-full object-cover filter brightness-[0.98] transition-transform duration-[800ms] group-hover:scale-104 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Text info */}
              <div className="flex flex-col space-y-2 text-left">
                <h3 className="text-xl md:text-2xl font-serif font-light text-[#2E241C] group-hover:text-[#C8A46A] transition-colors">
                  {mat.name}
                </h3>
                <p className="text-sm text-[#6F6358] font-sans font-light leading-relaxed">
                  {mat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialShowcase;
