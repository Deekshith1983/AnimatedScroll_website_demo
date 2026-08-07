import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GalleryShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const parallax = parallaxRef.current;
    if (!text || !parallax) return;

    const ctx = gsap.context(() => {
      // Reveal header text
      gsap.fromTo(
        text.querySelectorAll('.reveal-gal'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
          },
        }
      );

      // Scroll Parallax Scale (slowly scales the image 1.0 -> 1.05 as it scrolls through viewport)
      const images = parallax.querySelectorAll('.parallax-img');
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.0 },
          {
            scale: 1.06,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#F2ECE3] text-[#2E241C] py-32 md:py-48 px-6 md:px-16 w-full"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col space-y-20">
        {/* Header Block */}
        <div ref={textRef} className="max-w-[620px] flex flex-col space-y-4 text-left">
          <span className="reveal-gal text-[10px] md:text-xs tracking-luxury text-[#C8A46A] uppercase font-sans font-light">
            04 / Spatial Gallery
          </span>
          <h2 className="reveal-gal text-4xl sm:text-5xl md:text-6xl font-serif font-light text-[#2E241C] tracking-tight uppercase">
            Showroom Vignettes
          </h2>
          <p className="reveal-gal text-base md:text-lg text-[#6F6358] font-sans font-light leading-relaxed">
            Walk inside our physical showroom through a series of captured architectural frames. Each vignette presents a unified composition of lighting, material, and reflection.
          </p>
        </div>

        {/* Parallax Image Block List */}
        <div ref={parallaxRef} className="space-y-16 w-full">
          {/* 1. Occasional Full-width Cinematic Photography */}
          <div className="w-full aspect-[16/7] md:aspect-[21/9] luxury-image-frame overflow-hidden relative">
            <img
              src="/assets/9.png"
              alt="Cinematic Panoramic Showroom"
              className="parallax-img w-full h-full object-cover filter brightness-[0.98] will-change-transform origin-center"
            />
          </div>

          {/* 2. Alternating offset columns grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-8">
            {/* Left Card: Vertical layout */}
            <div className="md:col-span-6 flex justify-start items-start">
              <div className="w-full max-w-[480px] aspect-[3/4] luxury-image-frame overflow-hidden relative">
                <img
                  src="/assets/13.jpg"
                  alt="Sculpted Basin Close-up Vignette"
                  className="parallax-img w-full h-full object-cover filter brightness-[0.98] will-change-transform origin-center"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Card: Offset vertically downwards */}
            <div className="md:col-span-6 flex justify-end items-start md:pt-24 lg:pt-36">
              <div className="w-full max-w-[480px] aspect-[3/4] luxury-image-frame overflow-hidden relative">
                <img
                  src="/assets/16.jpg"
                  alt="Luxury Shower Fixture Vignette"
                  className="parallax-img w-full h-full object-cover filter brightness-[0.98] will-change-transform origin-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryShowcase;
