import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

interface BreathingImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  parallaxSpeed?: number; // Speed multiplier for parallax (-20 to 20)
  priority?: boolean;
}

export const BreathingImage: React.FC<BreathingImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  parallaxSpeed = 10,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Only apply GSAP scroll triggers on non-touch screens or general viewports
    // to preserve smoothness, as requested in optimization guidelines
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          yPercent: -parallaxSpeed,
          scale: 1.1, // starts slightly scaled up for parallax padding
        },
        {
          yPercent: parallaxSpeed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [parallaxSpeed]);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden w-full h-full bg-charcoal', containerClassName)}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={cn(
          'w-full h-[120%] object-cover absolute top-[-10%] left-0 animate-breathing will-change-transform',
          className
        )}
      />
    </div>
  );
};

export default BreathingImage;
