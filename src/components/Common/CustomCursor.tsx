import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on mobile/touch screens
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Set initial positions
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    // GSAP quickTo functions for smooth interpolation/lag effect
    const xCursorTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3.out' });
    const yCursorTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3.out' });

    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      xCursorTo(e.clientX);
      yCursorTo(e.clientY);

      xDotTo(e.clientX);
      yDotTo(e.clientY);
    };

    // Expand outer outline and fill softly on hovering active links
    const onMouseEnterLink = () => {
      gsap.to(cursor, {
        scale: 1.6,
        borderColor: '#B68A52',
        backgroundColor: 'rgba(182, 138, 82, 0.12)', // soft fill on hover
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        scale: 0.4,
        backgroundColor: '#B68A52',
        duration: 0.3,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: '#B68A52',
        backgroundColor: 'transparent',
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: '#B68A52',
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Dynamic hover listeners for links, buttons, and custom magnetic targets
    const attachListeners = () => {
      const links = document.querySelectorAll('a, button, [data-cursor="magnetic"]');
      links.forEach((link) => {
        link.addEventListener('mouseenter', onMouseEnterLink);
        link.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    attachListeners();

    // Re-attach listeners periodically as the DOM changes
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      const links = document.querySelectorAll('a, button, [data-cursor="magnetic"]');
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Outer Bronze Outline Ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[#B68A52] pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
      />
      {/* Inner Solid Bronze Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#B68A52] pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;
