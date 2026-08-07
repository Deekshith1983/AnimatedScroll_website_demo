import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CTAWrapperProps {
  onContactClick: () => void;
}

export const CTAWrapper: React.FC<CTAWrapperProps> = ({
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
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="showroom-invite"
      className="relative w-full h-[650px] flex items-center justify-center overflow-hidden bg-black select-none border-t border-[#C8A46A]/10"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        {/* Soft dark vignettes and warm lighting gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/85 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,164,106,0.06)_0%,transparent_60%)] z-15 pointer-events-none" />
        
        <img
          src="/assets/2.png"
          alt="Luxury Bathroom Showroom Invitation"
          className="w-full h-full object-cover filter brightness-[0.70] hover:scale-102 transition-transform duration-[2000ms] ease-out"
          loading="lazy"
        />
      </div>

      {/* Foreground Content Card */}
      <div
        ref={elementsRef}
        className="relative z-30 max-w-[700px] w-full px-6 flex flex-col items-center text-center space-y-6"
      >
        <span className="cta-reveal text-[10px] md:text-xs tracking-luxury text-[#C8A46A] uppercase font-sans font-light opacity-0">
          07 / Gallery Invitation
        </span>

        <h2 className="cta-reveal text-4xl sm:text-5xl md:text-[56px] font-serif font-light text-[#F8F5EF] tracking-tight leading-[1.08] uppercase opacity-0">
          Step Inside Our Showroom
        </h2>

        <p className="cta-reveal text-base sm:text-lg text-[#F8F5EF]/82 font-sans font-light leading-relaxed max-w-[620px] opacity-0">
          We invite you to experience our physical gallery in Jaipur, Rajasthan. Touch the raw travertine stone slabs, feel the flow of precision hydrotherapy shower heads, and consult on custom layout packaging.
        </p>

        <div className="cta-reveal pt-4 opacity-0">
          <button
            onClick={onContactClick}
            className="hero-cta-btn pointer-events-auto cursor-pointer"
          >
            Visit Jaipur Showroom
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTAWrapper;
