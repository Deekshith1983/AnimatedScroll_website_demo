import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StoryChapter {
  id: number;
  tag: string;
  title: string;
  desc: string;
  img: string;
}

export const Welcome: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const image = imageRef.current;
    if (!text || !image) return;

    const ctx = gsap.context(() => {
      // Intro Reveal
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
          { scale: 1.06, opacity: 0 },
          { scale: 1.0, opacity: 1, duration: 1.0, ease: 'power2.out' },
          '-=0.6'
        );

      // Story Chapters Scroll Parallax Reveals
      if (storyRef.current) {
        const chapters = storyRef.current.querySelectorAll('.story-chapter');
        chapters.forEach((chapter) => {
          const img = chapter.querySelector('.story-img');
          const line = chapter.querySelector('.story-line');
          const info = chapter.querySelectorAll('.story-reveal');

          gsap.fromTo(
            img,
            { scale: 1.06, opacity: 0 },
            {
              scale: 1.0,
              opacity: 1,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: chapter,
                start: 'top 75%',
              },
            }
          );

          if (line) {
            gsap.fromTo(
              line,
              { scaleX: 0, transformOrigin: 'left center' },
              {
                scaleX: 1,
                duration: 1.0,
                ease: 'power2.inOut',
                scrollTrigger: {
                  trigger: chapter,
                  start: 'top 80%',
                },
              }
            );
          }

          gsap.fromTo(
            info,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: chapter,
                start: 'top 80%',
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const storyChapters: StoryChapter[] = [
    {
      id: 1,
      tag: 'Chapter I / The Legacy',
      title: 'A Vision of Serene Solace',
      desc: 'Luxury is not a commodity—it is a space of architectural quiet. At Om Mangalam, we translate dreams of home sanctuary into tactile realities, starting with raw natural stone and hand-cast ceramics.',
      img: '/assets/12.jpg',
    },
    {
      id: 2,
      tag: 'Chapter II / The Curation',
      title: 'The Art of Tactile Detail',
      desc: 'Every joint, every curve, and every brushed finish reflects decades of dedicated craftsmanship. We partner with world-renowned Italian and European designers to bring pure form and functionality together.',
      img: '/assets/14.jpg',
    },
    {
      id: 3,
      tag: 'Chapter III / The Gallery',
      title: 'Showrooms That Inspire',
      desc: 'We believe that you must touch and feel the materials to truly understand them. Our Jaipur gallery is curated to simulate real residential spaces, letting you experience physical form, water flow, and light reflection.',
      img: '/assets/13.jpg',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="bg-[#F8F5EF] text-[#2E241C] relative w-full overflow-hidden"
    >
      {/* Intro section (Top Room) */}
      <div id="about" className="py-32 md:py-48 px-6 md:px-16 w-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Description */}
          <div ref={textRef} className="lg:col-span-6 flex flex-col space-y-6 md:space-y-8">
            <span className="reveal-el text-[10px] md:text-xs tracking-luxury text-[#C8A46A] uppercase font-sans font-light">
              01 / Introduction
            </span>
            
            <h2 className="reveal-el text-4xl sm:text-5xl md:text-[64px] font-serif font-light text-[#2E241C] tracking-tight leading-[1.05] uppercase">
              Welcome to <br /> Om Mangalam
            </h2>
            
            <p className="reveal-el text-base sm:text-lg md:text-[19px] text-[#6F6358] font-sans font-light leading-[1.7] max-w-[620px]">
              Every exceptional bathroom begins with a vision. At Om Mangalam, we curate premium collections and immersive showroom environments that help homeowners, architects, interior designers, and builders transform ideas into beautifully crafted spaces.
            </p>

            <div className="reveal-el w-16 h-[1px] bg-[#C8A46A]/40" />

            <p className="reveal-el text-xs md:text-sm text-[#6F6358]/80 italic font-serif font-light leading-relaxed max-w-[620px]">
              "Design is not just what it looks like. Design is how it functions, how it flows, and how it translates into a space of solace."
            </p>

            <div className="reveal-el pt-4">
              <a
                href="#contact"
                className="inline-block px-9 py-4 border border-[#C8A46A] text-[#C8A46A] text-[11px] tracking-luxury uppercase rounded-full hover:bg-[#C8A46A] hover:text-[#F8F5EF] transition-all duration-500 font-sans font-medium"
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
                src="/assets/8.png"
                alt="Luxury Bathroom Walkthrough Gallery"
                className="w-full h-full object-cover filter brightness-[0.98] hover:scale-103 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alternating Company Story moments */}
      <div ref={storyRef} className="py-24 bg-[#F2ECE3] border-t border-b border-[#C8A46A]/10">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 space-y-24 md:space-y-40">
          {storyChapters.map((chapter, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={chapter.id}
                className={`story-chapter grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image panel */}
                <div
                  className={`lg:col-span-6 flex justify-center ${
                    isEven ? '' : 'lg:order-2'
                  }`}
                >
                  <div className="w-full max-w-[550px] aspect-[16/10] luxury-image-frame overflow-hidden opacity-0 story-img">
                    <img
                      src={chapter.img}
                      alt={chapter.title}
                      className="w-full h-full object-cover filter brightness-[0.98] hover:scale-103 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text panel */}
                <div
                  className={`lg:col-span-6 flex flex-col space-y-4 md:space-y-6 ${
                    isEven ? '' : 'lg:order-1'
                  }`}
                >
                  <span className="story-reveal text-[10px] md:text-xs tracking-luxury text-[#C8A46A] uppercase font-sans font-light opacity-0">
                    {chapter.tag}
                  </span>
                  
                  <h3 className="story-reveal text-3xl sm:text-4xl md:text-[44px] font-serif font-light text-[#2E241C] tracking-tight leading-tight uppercase opacity-0">
                    {chapter.title}
                  </h3>

                  {/* Gold Line divider */}
                  <div className="story-line w-full h-[1px] bg-[#C8A46A]/30 scale-x-0" />

                  <p className="story-reveal text-base md:text-lg text-[#6F6358] font-sans font-light leading-relaxed max-w-[520px] opacity-0">
                    {chapter.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Welcome;
