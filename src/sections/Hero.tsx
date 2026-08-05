import React from 'react';
import SplitText from '../components/Common/SplitText';

export const Hero: React.FC = () => {
  return (
    <div className="scene-container scene-1 absolute inset-0 w-full h-full opacity-0 pointer-events-none z-10 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Soft vignettes and light maps */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/60 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0a0a0a_100%)] z-10 opacity-70 scene-vignette" />
        
        <img
          src="/assets/1.png"
          alt="Om Mangalam Luxury Entrance"
          className="w-full h-full object-cover origin-center scale-100 filter brightness-50 scene-img will-change-transform"
        />
      </div>

      {/* Warm Ambient Radial Lighting Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(197,168,128,0.08)_0%,transparent_60%)] z-20 pointer-events-none opacity-0 scene-light" />

      {/* Scene Typography Foreground */}
      <div className="max-w-4xl w-full mx-auto relative z-30 text-center flex flex-col items-center space-y-6">
        <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#c5a880] uppercase font-sans font-light scene-tag">
          Scene 01 — Arrival
        </span>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-ivory tracking-wide leading-tight gold-glow uppercase">
          <SplitText text="Every great space begins with a feeling." mode="chars" />
        </h1>
        
        <p className="text-xs sm:text-sm md:text-base text-[#a1a1aa] font-sans font-light leading-relaxed max-w-2xl scene-desc opacity-0">
          Welcome to a place where craftsmanship meets timeless design. Every surface, every curve, and every material has been carefully selected to transform everyday rituals into extraordinary experiences.
        </p>

        <span className="text-[9px] tracking-luxury text-[#c5a880] uppercase font-sans font-light pt-2 select-none scene-desc opacity-0">
          This isn't a showroom. It's an invitation to discover luxury.
        </span>
      </div>
    </div>
  );
};

export default Hero;
