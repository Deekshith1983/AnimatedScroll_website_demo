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
    duration: 2.2,
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
      title: 'Global Brands',
      desc: "Partnered with the world's leading manufacturers of luxury bathroom systems.",
    },
    {
      end: 500,
      suffix: '+',
      title: 'Curated Products',
      desc: 'Selected for structural integrity, minimal lines, and luxury material feel.',
    },
    {
      end: 1000,
      suffix: '+',
      title: 'Luxury Spaces',
      desc: 'Helping architects, designers, and homeowners turn concepts into reality.',
    },
    {
      isInfinity: true,
      suffix: '',
      title: 'Design Options',
      desc: 'Infinite custom metal finishes, organic stone trims, and layouts.',
    },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-sand text-espresso py-28 md:py-36 px-6 md:px-16 overflow-hidden border-t border-luxuryBorder select-none"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col space-y-16 md:space-y-24">
        {/* Title Block */}
        <div className="flex flex-col space-y-4 max-w-xl">
          <span className="text-[10px] md:text-xs tracking-luxury text-bronze uppercase font-sans font-light">
            04 / Metrics
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-espresso uppercase tracking-tight">
            Curating Spaces with Confidence.
          </h2>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="flex flex-col space-y-4 border-l border-luxuryBorder pl-6 md:pl-8 py-2 hover:border-bronze transition-colors duration-500"
            >
              {/* Animated Stat Value */}
              <div className="text-5xl md:text-6xl font-serif font-light text-espresso tracking-tight flex items-baseline">
                {stat.isInfinity ? (
                  <span className="text-bronze">∞</span>
                ) : (
                  <span className="text-bronze font-light">
                    {inView ? (
                      <StatCounter end={stat.end || 0} />
                    ) : (
                      <span>0</span>
                    )}
                  </span>
                )}
                <span className="text-xl md:text-2xl text-bronze font-sans font-light ml-0.5">
                  {stat.suffix}
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm tracking-luxury uppercase font-sans text-espresso font-medium">
                  {stat.title}
                </h3>
                <p className="text-xs md:text-sm text-warmGrey font-sans font-light leading-relaxed">
                  {catDescOverride(stat.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper for type compatibility check
function catDescOverride(desc: string): string {
  return desc;
}

export default LuxuryCounters;
