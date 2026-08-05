import React from 'react';
import SplitText from '../components/Common/SplitText';

export const VanitySolutions: React.FC = () => {
  return (
    <div className="scene-container scene-5 absolute inset-0 w-full h-full opacity-0 pointer-events-none z-10 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-black/60 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#0a0a0a_100%)] z-10 opacity-70 scene-vignette" />
        
        <img
          src="/assets/4.jpg"
          alt="Luxury Vanity Setup"
          className="w-full h-full object-cover origin-center scale-100 filter brightness-50 scene-img will-change-transform"
        />
      </div>

      {/* Mirror reflection brightening overlay layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.08)_0%,transparent_40%)] z-20 pointer-events-none opacity-0 scene-light" />

      {/* Foreground Content */}
      <div className="max-w-4xl w-full mx-auto relative z-30 text-center flex flex-col items-center space-y-6">
        <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#c5a880] uppercase font-sans font-light scene-tag">
          Scene 05 — Everyday Elegance
        </span>
        
        <h2 className="text-4xl sm:text-6xl font-serif font-light text-white tracking-wide uppercase leading-tight">
          <SplitText text="Designed for moments that matter." mode="chars" />
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-[#a1a1aa] font-sans font-light leading-relaxed max-w-2xl scene-desc opacity-0">
          The perfect morning begins in a space that feels calm, balanced, and beautifully organized. Clean geometry, natural textures, and thoughtful proportions create a timeless environment for everyday living.
        </p>

        <span className="text-[10px] tracking-luxury text-[#c5a880] uppercase font-sans font-light pt-2 select-none scene-desc opacity-0">
          I want this in my home.
        </span>
      </div>
    </div>
  );
};

export default VanitySolutions;
