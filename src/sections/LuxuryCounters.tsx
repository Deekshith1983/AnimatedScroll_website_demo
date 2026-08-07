import React, { useRef } from 'react';
import { useCountUp } from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface StatCounterProps {
  end: number;
}

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
      end: 22,
      suffix: '+',
      title: 'Years of Curation',
      desc: 'Over two decades of sourcing raw, high-end European design collections.',
    },
    {
      end: 480,
      suffix: '',
      title: 'Curated Products',
      desc: 'Individually selected for structural lines and tactile material finishes.',
    },
    {
      end: 850,
      suffix: '+',
      title: 'Architectural Houses',
      desc: 'Custom private villa bathrooms curated for design-forward clients.',
    },
    {
      end: 18,
      suffix: '',
      title: 'Italian Partner Brands',
      desc: 'Exclusive agreements with elite global bathroom manufacturers.',
    },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-[#ECE4D7] text-[#2E241C] py-32 md:py-48 px-6 md:px-16 overflow-hidden border-t border-[#C8A46A]/10 select-none"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col space-y-16 md:space-y-24">
        {/* Title Block */}
        <div className="flex flex-col space-y-4 max-w-xl text-left">
          <span className="text-[10px] md:text-xs tracking-luxury text-[#C8A46A] uppercase font-sans font-light">
            06 / Metrics
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#2E241C] uppercase tracking-tight">
            Curating Spaces with Confidence
          </h2>
        </div>

        {/* Counter Grid - Architectural Presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="flex flex-col text-left py-2"
            >
              {/* Title of Metric */}
              <h3 className="text-[10px] tracking-luxury uppercase font-sans text-[#6F6358] font-light mb-2">
                {stat.title}
              </h3>

              {/* Animated Number */}
              <div className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#C8A46A] tracking-tight flex items-baseline mb-4">
                <span className="font-light">
                  {inView ? (
                    <StatCounter end={stat.end} />
                  ) : (
                    <span>0</span>
                  )}
                </span>
                <span className="text-xl md:text-2xl text-[#C8A46A]/80 font-sans font-light ml-0.5">
                  {stat.suffix}
                </span>
              </div>

              {/* Elegant Divider Line */}
              <div className="w-full h-[1px] bg-[#C8A46A]/20 mb-4" />

              {/* Supporting Text */}
              <p className="text-xs md:text-sm text-[#6F6358] font-sans font-light leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryCounters;
