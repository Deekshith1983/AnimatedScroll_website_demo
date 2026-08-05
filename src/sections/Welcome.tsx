import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Welcome: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const image = imageRef.current;
    if (!text || !image) return;

    // Simple, lightweight fade-up reveal on scroll without pinning or scrubbing
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    revealTl
      .fromTo(
        text.querySelectorAll('.reveal-el'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power2.out' }
      )
      .fromTo(
        image,
        { scale: 1.05, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 1.0, ease: 'power2.out' },
        '-=0.6'
      );
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-32 md:py-48 px-6 md:px-16 w-full max-w-[1440px] mx-auto bg-ivory text-espresso select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Description */}
        <div ref={textRef} className="lg:col-span-6 flex flex-col space-y-6 md:space-y-8">
          <span className="reveal-el text-[10px] md:text-xs tracking-luxury text-bronze uppercase font-sans font-light">
            01 / Introduction
          </span>
          
          <h2 className="reveal-el text-4xl sm:text-5xl md:text-6xl font-serif font-light text-espresso tracking-tight leading-[1.08] uppercase">
            Welcome to <br /> Om Mangalam
          </h2>
          
          <p className="reveal-el text-base sm:text-lg md:text-[19px] text-warmGrey font-sans font-light leading-relaxed max-w-[620px]">
            Every exceptional bathroom begins with a vision. At Om Mangalam, we curate premium collections and immersive showroom environments that help homeowners, architects, interior designers, and builders transform ideas into beautifully crafted spaces.
          </p>

          <div className="reveal-el w-16 h-[1px] bg-bronze/40" />

          <p className="reveal-el text-xs md:text-sm text-warmGrey/80 italic font-serif font-light leading-relaxed max-w-[620px]">
            "Design is not just what it looks like. Design is how it functions, how it flows, and how it translates into a space of timeless solace."
          </p>

          <div className="reveal-el pt-4">
            <a
              href="#contact"
              className="inline-block px-9 py-4 border border-bronze text-bronze text-[11px] tracking-luxury uppercase rounded-full hover:bg-bronze hover:text-white transition-all duration-500 font-sans font-medium"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Column: Architectural Offset Image */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            ref={imageRef}
            className="w-full max-w-[550px] aspect-[4/5] luxury-image-frame overflow-hidden opacity-0 will-change-transform"
          >
            <img
              src="/assets/8.jpg"
              alt="Luxury Bathroom Walkthrough Gallery"
              className="w-full h-full object-cover filter brightness-[0.98] hover:scale-103 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
