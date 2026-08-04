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
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // Detect mobile/tablet screen sizes to skip heavy scroll-bound parallax
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    if (isMobile) {
      gsap.set(image, { scale: 1.05, yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        {
          yPercent: -parallaxSpeed,
          scale: 1.1, // starts slightly scaled up for parallax padding
        },
        {
          yPercent: parallaxSpeed,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, container);

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
