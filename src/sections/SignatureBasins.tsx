import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BreathingImage from '../components/Common/BreathingImage';

gsap.registerPlugin(ScrollTrigger);

export const SignatureBasins: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsEl = cardsRef.current;
    if (!section || !cardsEl) return;

    const ctx = gsap.context(() => {
      const cards = cardsEl.children;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsEl,
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const basinFeatures = [
    {
      num: '01',
      title: 'Designer Basins',
      desc: 'Sculpted profiles and sculptural lines crafted by master designers to create focal centerpieces.',
    },
    {
      num: '02',
      title: 'Premium Ceramics',
      desc: 'Engineered with high-density fine clays and fired at extreme temperatures for unparalleled density.',
    },
    {
      num: '03',
      title: 'Contemporary Finishes',
      desc: 'From matte volcanic black to smooth natural sand, select from an array of curated matte and gloss finishes.',
    },
  ];

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative bg-[#0d0d0d] text-ivory py-24 md:py-36 px-6 md:px-16 overflow-hidden border-t border-[#c5a880]/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-24">
        {/* Top Feature Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 flex flex-col space-y-6 max-w-xl">
            <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#c5a880] uppercase font-sans font-light">
              03 / Signature Collections
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide uppercase leading-tight">
              Signature <br /> Basins
            </h2>
            <p className="text-sm md:text-base text-[#a1a1aa] font-sans font-light leading-relaxed">
              Elegant forms, premium finishes, and timeless craftsmanship combine to create statement pieces that become the centerpiece of modern interiors.
            </p>
          </div>

          {/* Luxury Large Image */}
          <div className="lg:col-span-7 w-full aspect-[4/3] relative overflow-hidden border border-[#c5a880]/20 shadow-2xl">
            <BreathingImage
              src="/assets/3.png"
              alt="Luxury Basins Design"
              parallaxSpeed={8}
            />
          </div>
        </div>

        {/* Staggered Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#c5a880]/10"
        >
          {basinFeatures.map((feat) => (
            <div
              key={feat.title}
              className="group flex flex-col justify-between p-8 bg-charcoal border border-[#c5a880]/5 hover:border-[#c5a880]/30 transition-all duration-500 rounded-none shadow-md hover:-translate-y-1.5"
            >
              <div>
                <span className="text-xs text-[#c5a880] font-sans font-light select-none tracking-luxury block mb-6">
                  {feat.num}
                </span>
                <h3 className="text-xl font-serif font-light text-white uppercase tracking-wider mb-4 group-hover:text-[#c5a880] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs md:text-sm text-[#a1a1aa] font-sans font-light leading-relaxed">
                  {feat.desc}
                </p>
              </div>
              <div className="w-8 h-[1px] bg-[#c5a880]/20 group-hover:w-full group-hover:bg-[#c5a880] transition-all duration-700 mt-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureBasins;
