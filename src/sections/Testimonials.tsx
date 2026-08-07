import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface QuoteItem {
  id: number;
  text: string;
  author: string;
  role: string;
  img: string; // Portrait close-up
}

export const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const testimonials: QuoteItem[] = [
    {
      id: 1,
      text: "Superb place to buy tiles n bath fittings ..... Excellent services ....loved to visit again",
      author: "Ajay Malpani",
      role: "Local Guide · 6 reviews",
      img: '/assets/11.jpg',
    },
    {
      id: 2,
      text: "Tiles CP FITTINGS",
      author: "Ravi Kumar",
      role: "Customer Review · 2 reviews",
      img: '/assets/12.jpg',
    },
    {
      id: 3,
      text: "Exclusive store",
      author: "Dev Gurjar",
      role: "Customer Review · 6 reviews",
      img: '/assets/13.jpg',
    },
    {
      id: 4,
      text: "Tiles & Sentry & lehnga shorums",
      author: "Girdhari Jat",
      role: "Local Guide · 11 reviews in Jaipur",
      img: '/assets/14.jpg',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Reveal container block
      gsap.fromTo(
        container.querySelectorAll('.reveal-test'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    gsap.to('.test-content', {
      opacity: 0,
      y: -12,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        gsap.fromTo(
          '.test-content',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        );
      },
    });
  };

  const handlePrev = () => {
    gsap.to('.test-content', {
      opacity: 0,
      y: -12,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        gsap.fromTo(
          '.test-content',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        );
      },
    });
  };

  const current = testimonials[activeIndex];

  return (
    <section
      ref={containerRef}
      className="bg-[#FAF8F4] text-[#2E241C] py-32 md:py-48 px-6 md:px-16 w-full"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center text-center space-y-16">
        {/* Header Block */}
        <div className="flex flex-col items-center space-y-4">
          <span className="reveal-test text-[10px] md:text-xs tracking-luxury text-[#C8A46A] uppercase font-sans font-light">
            06 / Guest Experiences
          </span>
          <h2 className="reveal-test text-4xl sm:text-5xl md:text-6xl font-serif font-light text-[#2E241C] tracking-tight uppercase">
            Showroom Reviews
          </h2>
        </div>

        {/* Large Citation Quote Panel */}
        <div
          ref={quoteRef}
          className="reveal-test w-full max-w-4xl flex flex-col items-center space-y-8 min-h-[380px] justify-center bg-[#F2ECE3]/40 border border-[#C8A46A]/10 p-8 md:p-16 rounded-[32px] shadow-sm relative overflow-hidden"
        >
          {/* Animated content slot */}
          <div className="test-content flex flex-col items-center space-y-6 w-full">
            {/* Small Portrait circle */}
            <div className="w-16 h-16 rounded-full overflow-hidden border border-[#C8A46A]/20 bg-[#F2ECE3]">
              <img
                src={current.img}
                alt={current.author}
                className="w-full h-full object-cover filter brightness-[0.98]"
              />
            </div>

            {/* 5 Golden Stars Rating */}
            <div className="flex items-center gap-1 text-[#C8A46A] text-lg select-none">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>

            {/* Cormorant Garamond Quote Text */}
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-[#2E241C] tracking-wide leading-relaxed italic max-w-3xl">
              "{current.text}"
            </blockquote>

            {/* Author citation details */}
            <div className="flex flex-col items-center">
              <cite className="not-italic text-[11px] tracking-luxury text-[#C8A46A] uppercase font-sans font-semibold">
                {current.author}
              </cite>
              <span className="text-[10px] tracking-luxury text-[#6F6358] uppercase font-sans font-light mt-1">
                {current.role}
              </span>
            </div>
          </div>

          {/* Minimal Slide Indicators */}
          <div className="flex items-center gap-6 pt-4 z-20">
            <button
              onClick={handlePrev}
              className="text-xs hover:text-[#C8A46A] transition-colors tracking-widest font-sans font-light uppercase px-3 py-1 cursor-pointer"
            >
              &larr; Prev
            </button>
            <span className="text-[10px] tracking-luxury text-[#6F6358]/60 font-sans font-light">
              0{activeIndex + 1} / 0{testimonials.length}
            </span>
            <button
              onClick={handleNext}
              className="text-xs hover:text-[#C8A46A] transition-colors tracking-widest font-sans font-light uppercase px-3 py-1 cursor-pointer"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
