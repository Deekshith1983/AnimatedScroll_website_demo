import React from 'react';
import SplitText from '../components/Common/SplitText';

export const ShowerSystems: React.FC = () => {
  return (
    <div className="scene-container scene-6 absolute inset-0 w-full h-full opacity-0 pointer-events-none z-10 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/60 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#0a0a0a_100%)] z-10 opacity-80 scene-vignette" />
        
        <img
          src="/assets/7.jpg"
          alt="Precision Shower Fixtures"
          className="w-full h-full object-cover origin-center scale-100 filter brightness-[0.4] scene-img will-change-transform"
        />
      </div>

      {/* Metal fixtures reflection highlight layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_55%,rgba(255,255,255,0.07)_0%,transparent_35%)] z-20 pointer-events-none opacity-0 scene-light" />

      {/* Foreground Content */}
      <div className="max-w-4xl w-full mx-auto relative z-30 text-center flex flex-col items-center space-y-6">
        <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#c5a880] uppercase font-sans font-light scene-tag">
          Scene 06 — Precision Water Experience
        </span>
        
        <h2 className="text-4xl sm:text-6xl font-serif font-light tracking-wide uppercase leading-tight metallic-text">
          <SplitText text="Water deserves precision." mode="chars" />
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-[#a1a1aa] font-sans font-light leading-relaxed max-w-2xl scene-desc opacity-0">
          Every shower system has been engineered for effortless performance, seamless control, and lasting reliability—combining technology with timeless aesthetics.
        </p>

        <span className="text-[10px] tracking-luxury text-[#c5a880] uppercase font-sans font-light pt-2 select-none scene-desc opacity-0">
          Precision engineering.
        </span>
      </div>
    </div>
  );
};

export default ShowerSystems;
