import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  progress: number;
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ progress, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll instantly during loading
    document.body.classList.add('lenis-stopped');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && containerRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            // Unlock scroll on completion
            document.body.classList.remove('lenis-stopped');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            setIsDone(true);
            onComplete();
          }
        });

        tl.to(elementsRef.current, {
          y: -24,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut'
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 1.0,
          ease: 'power4.inOut'
        }, '-=0.4');
      }, containerRef);

      return () => ctx.revert();
    }
  }, [progress, onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-ivory z-[9999] flex flex-col justify-between p-8 md:p-16 select-none"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center text-[10px] tracking-luxury text-warmGrey font-sans">
        <div>OM MANGALAM</div>
        <div className="uppercase">Digital Luxury Showroom v1.1</div>
      </div>

      {/* Main Center Area */}
      <div 
        ref={elementsRef} 
        className="w-full max-w-xl mx-auto flex flex-col items-center justify-center space-y-8 text-center"
      >
        {/* Brand Logo in Preloader */}
        <div className="w-24 h-24 md:w-32 md:h-32 mb-4 overflow-hidden border border-luxuryBorder rounded-full shadow-sm scale-95 animate-pulse">
          <img
            src="/logo/logo.jpg"
            alt="Om Mangalam Official Logo"
            className="w-full h-full object-cover grayscale opacity-80"
          />
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl md:text-5xl font-serif font-light tracking-[0.25em] text-espresso uppercase">
          OM MANGALAM
        </h1>
        
        <p className="text-[10px] md:text-xs tracking-luxury text-warmGrey max-w-sm uppercase font-sans font-light">
          Entering a world of craftsmanship, elegance, and timeless architectural spaces.
        </p>

        {/* Large Percentage */}
        <div className="relative flex items-baseline font-serif font-light text-espresso">
          <span className="text-6xl md:text-8xl tracking-tight leading-none text-bronze">
            {String(progress).padStart(3, '0')}
          </span>
          <span className="text-[10px] md:text-xs font-sans font-light text-warmGrey ml-3 uppercase tracking-luxury">
            % Curated
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 md:w-80 h-[1.5px] bg-[#ECE4D7] overflow-hidden relative">
          <div
            ref={progressBarRef}
            className="h-full bg-bronze transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-end text-[9px] md:text-[10px] text-warmGrey font-sans uppercase tracking-luxury">
        <div className="text-left font-light max-w-[200px] md:max-w-none">
          PRE-LOADING ARTISTIC FINISHES
        </div>
        <div className="text-right font-light">
          © {new Date().getFullYear()} OM MANGALAM
        </div>
      </div>
    </div>
  );
};

export default Loader;
