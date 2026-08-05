import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CTAWrapperProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const CTAWrapper: React.FC<CTAWrapperProps> = ({
  onExploreClick,
  onContactClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementsRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll('.cta-reveal'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="py-32 md:py-48 px-6 md:px-16 w-full bg-sand text-espresso select-none"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Image with Luxury Frame */}
        <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
          <div className="w-full max-w-[550px] aspect-[4/3] luxury-image-frame overflow-hidden">
            <img
              src="/assets/2.png"
              alt="Luxury Bathroom Atmosphere"
              className="w-full h-full object-cover filter brightness-[0.98] hover:scale-103 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: CTA Copy & Buttons */}
        <div
          ref={elementsRef}
          className="lg:col-span-6 flex flex-col space-y-6 md:space-y-8 order-1 lg:order-2"
        >
          <span className="cta-reveal text-[10px] md:text-xs tracking-luxury text-bronze uppercase font-sans font-light">
            05 / Visit Showroom
          </span>

          <h2 className="cta-reveal text-4xl sm:text-5xl md:text-6xl font-serif font-light text-espresso tracking-tight leading-[95%] uppercase">
            Crafted for Spaces<br />That Inspire.
          </h2>

          <p className="cta-reveal text-base sm:text-lg text-warmGrey font-sans font-light leading-relaxed max-w-[550px]">
            Step inside our digital space, then join us at our Indiranagar showroom to explore customized materials, touch the physical fittings, and finalize your layout concept.
          </p>

          <div className="cta-reveal flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={onExploreClick}
              className="px-9 py-4 bg-bronze text-white border border-bronze text-[11px] tracking-luxury uppercase hover:bg-transparent hover:text-bronze transition-all duration-500 font-sans font-medium rounded-full"
            >
              Discover Collections
            </button>
            <button
              onClick={onContactClick}
              className="px-9 py-4 border border-bronze text-bronze text-[11px] tracking-luxury uppercase hover:bg-bronze hover:text-white transition-all duration-500 font-sans font-medium rounded-full"
            >
              Contact Consultant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAWrapper;
