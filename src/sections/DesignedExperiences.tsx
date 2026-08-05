import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Compass, Heart, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const DesignedExperiences: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const values: ValueItem[] = [
    {
      icon: <Award className="w-8 h-8 text-bronze" strokeWidth={1.5} />,
      title: 'Curated Selections',
      desc: 'We partner with leading global brands to bring you an exclusive catalog of designer basins, showers, and ceramics.',
    },
    {
      icon: <Compass className="w-8 h-8 text-bronze" strokeWidth={1.5} />,
      title: 'Architectural Design',
      desc: 'Our collections prioritize minimal profiles, refined geometry, and organic textures that frame luxury spaces.',
    },
    {
      icon: <Heart className="w-8 h-8 text-bronze" strokeWidth={1.5} />,
      title: 'Expert Guidance',
      desc: 'Our consultants work side-by-side with architects, interior designers, and homeowners to customize material packages.',
    },
    {
      icon: <MapPin className="w-8 h-8 text-bronze" strokeWidth={1.5} />,
      title: 'Physical Showroom',
      desc: 'Step into our Indiranagar gallery to touch, see, and interact with live, functional water and ceramic systems.',
    },
  ];

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    gsap.fromTo(
      container.querySelectorAll('.value-card'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="py-32 md:py-48 px-6 md:px-16 w-full bg-ivory text-espresso select-none"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header grid */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 md:mb-24 gap-6">
          <div className="flex flex-col space-y-4 max-w-xl">
            <span className="text-[10px] md:text-xs tracking-luxury text-bronze uppercase font-sans font-light">
              03 / Design Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-espresso tracking-tight uppercase">
              The Showroom Experience.
            </h2>
          </div>
          <p className="text-sm md:text-base text-warmGrey font-sans font-light leading-relaxed max-w-[420px]">
            We support architects and designers through bespoke procurement, strict quality assurance, and physical design demonstrations.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {values.map((item, idx) => (
            <div
              key={idx}
              className="value-card bg-limestone border border-luxuryBorder rounded-[28px] p-8 md:p-10 warm-shadow hover:-translate-y-1.5 transition-all duration-500 flex flex-col space-y-6 opacity-0"
            >
              {/* Icon wrap */}
              <div className="w-14 h-14 rounded-full bg-ivory flex items-center justify-center border border-luxuryBorder">
                {item.icon}
              </div>

              {/* Title & Description */}
              <div className="flex flex-col space-y-3">
                <h3 className="text-xl font-serif font-light text-espresso uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-warmGrey font-sans font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignedExperiences;
