import React from 'react';
import SplitText from '../components/Common/SplitText';

export const Experience: React.FC = () => {
  return (
    <div className="scene-container scene-7 absolute inset-0 w-full h-full opacity-0 pointer-events-none z-10 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/35 to-black/60 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#0a0a0a_100%)] z-10 opacity-70 scene-vignette" />
        
        <img
          src="/assets/5.jpg"
          alt="Bathroom Interior Sanctuary"
          className="w-full h-full object-cover origin-center scale-100 filter brightness-50 scene-img will-change-transform"
        />
      </div>

      {/* Warm Ambient Radial Lighting Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,168,128,0.07)_0%,transparent_50%)] z-20 pointer-events-none opacity-0 scene-light" />

      {/* Foreground Content */}
      <div className="max-w-4xl w-full mx-auto relative z-30 text-center flex flex-col items-center space-y-6">
        <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#c5a880] uppercase font-sans font-light scene-tag">
          Scene 07 — Crafted Living
        </span>
        
        <h2 className="text-4xl sm:text-6xl font-serif font-light text-white tracking-wide uppercase leading-tight">
          <SplitText text="A bathroom is more than a room." mode="chars" />
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-[#a1a1aa] font-sans font-light leading-relaxed max-w-2xl scene-desc opacity-0">
          It is a sanctuary where architecture, comfort, and craftsmanship come together. Every collection has been created to enrich everyday life through thoughtful design.
        </p>

        <span className="text-[10px] tracking-luxury text-[#c5a880] uppercase font-sans font-light pt-2 select-none scene-desc opacity-0">
          Complete lifestyle.
        </span>
      </div>
    </div>
  );
};

export default Experience;
