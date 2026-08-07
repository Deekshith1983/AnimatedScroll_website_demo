import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Compass, ShieldCheck, Hammer } from 'lucide-react';

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
      icon: <Hammer className="w-8 h-8 text-[#C8A46A]" strokeWidth={1.2} />,
      title: 'Craftsmanship',
      desc: 'Form and material worked by hand. We prioritize items made with meticulous attention to joint, weld, and curvature.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#C8A46A]" strokeWidth={1.2} />,
      title: 'Quality',
      desc: 'Selected for structural durability. Our sanitaryware and fixtures feature non-corrosive finishes built to last.',
    },
    {
      icon: <Compass className="w-8 h-8 text-[#C8A46A]" strokeWidth={1.2} />,
      title: 'Innovation',
      desc: 'Smart, rimless, and ceiling-integrated water systems that elevate daily comfort through technology.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#C8A46A]" strokeWidth={1.2} />,
      title: 'Timeless Design',
      desc: 'Restrained geometry and organic textures that integrate seamlessly into modern luxury architecture.',
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
      className="py-32 md:py-48 px-6 md:px-16 w-full bg-[#F2ECE3] text-[#2E241C] select-none"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header grid */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 md:mb-24 gap-6">
          <div className="flex flex-col space-y-4 max-w-xl">
            <span className="text-[10px] md:text-xs tracking-luxury text-[#C8A46A] uppercase font-sans font-light">
              05 / Why Om Mangalam
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#2E241C] tracking-tight uppercase">
              Pillars of Excellence
            </h2>
          </div>
          <p className="text-base text-[#6F6358] font-sans font-light leading-relaxed max-w-[420px]">
            We support architects, designers, and homeowners through bespoke procurement, rigorous quality checks, and timeless material curations.
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
              className="value-card bg-[#FAF8F4] border border-[#C8A46A]/10 rounded-[28px] p-8 md:p-10 shadow-sm hover:-translate-y-1.5 transition-all duration-500 flex flex-col space-y-6 opacity-0"
            >
              {/* Icon wrap */}
              <div className="w-14 h-14 rounded-full bg-[#F8F5EF] flex items-center justify-center border border-[#C8A46A]/10">
                {item.icon}
              </div>

              {/* Title & Description */}
              <div className="flex flex-col space-y-3">
                <h3 className="text-xl font-serif font-light text-[#2E241C] uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6F6358] font-sans font-light leading-relaxed">
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
