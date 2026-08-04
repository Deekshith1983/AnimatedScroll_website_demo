import React, { useRef } from 'react';
import { useCountUp } from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface StatCounterProps {
  end: number;
}

// Reusable stat counter component that mounts and runs when in view
const StatCounter: React.FC<StatCounterProps> = ({ end }) => {
  const countRef = useRef<HTMLSpanElement>(null);
  
  useCountUp({
    ref: countRef as any,
    start: 0,
    end: end,
    duration: 2.5,
    useEasing: true,
  });

  return <span ref={countRef}>0</span>;
};

export const LuxuryCounters: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const stats = [
    {
      end: 25,
      suffix: '+',
      title: 'Premium Brands',
      desc: "Partnered with the world's leading designers of luxury bath fittings.",
    },
    {
      end: 500,
      suffix: '+',
      title: 'Curated Products',
      desc: 'Selected for superior design integrity, engineering, and luxury feel.',
    },
    {
      end: 1000,
      suffix: '+',
      title: 'Satisfied Clients',
      desc: 'Helping builders, architects, and homeowners bring visions to life.',
    },
    {
      isInfinity: true,
      suffix: '',
      title: 'Design Possibilities',
      desc: 'Infinite custom textures, combinations, and architectural finishes.',
    },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-[#0d0d0d] text-ivory py-28 md:py-36 px-6 md:px-16 overflow-hidden border-t border-[#c5a880]/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-24">
        {/* Intro Meta */}
        <div className="flex flex-col space-y-4 max-w-xl">
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#c5a880] uppercase font-sans font-light">
            09 / By the numbers
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white uppercase tracking-wide">
            Defining Luxury Standards
          </h2>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="flex flex-col space-y-4 border-l border-[#c5a880]/15 pl-6 md:pl-8 py-2 hover:border-[#c5a880] transition-colors duration-500"
            >
              {/* Animated Stat Value */}
              <div className="text-5xl md:text-6xl font-serif font-light text-white tracking-tight flex items-baseline">
                {stat.isInfinity ? (
                  <span className="text-[#c5a880]">∞</span>
                ) : (
                  <span className="text-[#c5a880] font-light">
                    {inView ? (
                      <StatCounter end={stat.end || 0} />
                    ) : (
                      <span>0</span>
                    )}
                  </span>
                )}
                <span className="text-xl md:text-2xl text-accent font-sans font-light ml-0.5">
                  {stat.suffix}
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm tracking-luxury uppercase font-sans text-white font-medium">
                  {stat.title}
                </h3>
                <p className="text-xs md:text-sm text-[#a1a1aa] font-sans font-light leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryCounters;
