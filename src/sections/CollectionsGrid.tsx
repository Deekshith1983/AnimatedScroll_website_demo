import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CollectionItem {
  id: number;
  tag: string;
  title: string;
  desc: string;
  img: string;
}

export const CollectionsGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    const ctx = gsap.context(() => {
      // Calculate scroll translation distance: track width minus window width
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      // Pinned Horizontal Translation Timeline
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: pin,
          scrub: 1.2, // smooth scroll scrubbing
          invalidateOnRefresh: true, // handles window resize
        },
      });

      // Staggered reveal for header titles on scroll
      gsap.fromTo(
        pin.querySelectorAll('.reveal-col-head'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const collections: CollectionItem[] = [
    {
      id: 1,
      tag: 'Collection 01 / Sculpted',
      title: 'Designer Basins',
      desc: 'Handcrafted countertop, pedestal, and semi-recessed washbasins designed to serve as functional sculptures.',
      img: '/assets/3.jpg',
    },
    {
      id: 2,
      tag: 'Collection 02 / Suite',
      title: 'Luxury Bathtubs',
      desc: 'Free-standing tubs carved from natural stone and solid acrylic composites, forming architectural highlights.',
      img: '/assets/2.jpg',
    },
    {
      id: 3,
      tag: 'Collection 03 / Sanitaryware',
      title: 'Premium Commodes',
      desc: 'Sleek wall-hung commodes featuring rimless technology, hidden installations, and satin ceramic textures.',
      img: '/assets/6.jpg',
    },
    {
      id: 4,
      tag: 'Collection 04 / Hydrotherapy',
      title: 'Shower Systems',
      desc: 'Thermally balanced rain shower panels, body jets, and ceiling-integrated multi-flow systems.',
      img: '/assets/7.jpg',
    },
    {
      id: 5,
      tag: 'Collection 05 / Furniture',
      title: 'Custom Vanities',
      desc: 'Minimalist vanities constructed from natural oak, walnut timber finishes, and marble countertops.',
      img: '/assets/12.jpg',
    },
    {
      id: 6,
      tag: 'Collection 06 / Faucets',
      title: 'Designer Brassware',
      desc: 'Satin gold, chrome, and matte black single-lever mixers with custom anti-corrosive finishes.',
      img: '/assets/15.jpg',
    },
    {
      id: 7,
      tag: 'Collection 07 / Fittings',
      title: 'Luxury Accessories',
      desc: 'Brushed metal towel rails, toilet paper holders, and matching soap dispensers to unify your bathroom design.',
      img: '/assets/16.jpg',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="relative w-full h-[300vh] bg-[#ECE4D7]"
    >
      {/* Pinned viewport frame */}
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-center bg-[#ECE4D7] relative"
      >
        {/* Header Block */}
        <div className="absolute top-16 md:top-24 left-6 md:left-[8vw] z-20 flex flex-col">
          <span className="reveal-col-head text-[10px] md:text-xs tracking-luxury text-[#C8A46A] uppercase font-sans font-light mb-2">
            02 / Portfolio Showcase
          </span>
          <h2 className="reveal-col-head text-4xl sm:text-5xl md:text-6xl font-serif font-light text-[#2E241C] tracking-tight uppercase">
            Curated Collections
          </h2>
        </div>

        {/* Horizontal Slider Track */}
        <div className="w-full relative z-10 flex items-center h-full pt-[200px] pb-10">
          <div
            ref={trackRef}
            className="flex gap-8 px-6 md:px-[8vw] w-max items-center"
          >
            {collections.map((item) => (
              <div
                key={item.id}
                className="w-[300px] sm:w-[350px] md:w-[400px] h-[480px] md:h-[520px] rounded-[28px] overflow-hidden relative shadow-lg bg-[#FAF8F4] flex-shrink-0 group flex flex-col justify-end p-8 border border-[#C8A46A]/10 select-none cursor-pointer"
              >
                {/* Image layer (slow scale zoom on hover) */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-104 z-0 filter brightness-[0.94] group-hover:brightness-[0.92]"
                  loading="lazy"
                />

                {/* Overlapping soft dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent z-10 pointer-events-none" />

                {/* Border soft illumination glow */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#C8A46A] rounded-[28px] transition-all duration-500 z-20 pointer-events-none" />

                {/* Card Content Overlay */}
                <div className="relative z-30 flex flex-col items-start text-left">
                  <span className="text-[10px] tracking-luxury text-[#C8A46A] uppercase font-sans font-light mb-2">
                    {item.tag}
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-light text-[#F8F5EF] mb-2 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-[#F8F5EF]/80 font-sans font-light leading-relaxed mb-6 line-clamp-2">
                    {item.desc}
                  </p>

                  {/* Elegant sliding CTA */}
                  <span className="text-[10px] tracking-luxury text-[#C8A46A] uppercase font-sans font-semibold flex items-center gap-1 translate-x-0 group-hover:translate-x-2 transition-transform duration-300 select-none">
                    Explore Series <span className="font-serif">&rarr;</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;
