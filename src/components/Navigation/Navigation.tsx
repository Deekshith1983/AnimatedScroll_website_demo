import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '../../utils/cn';

interface NavigationProps {
  onLinkClick: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onLinkClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBgRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Monitor scroll height
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize GSAP Timeline for fullscreen menu dropdown
  useEffect(() => {
    const menu = menuRef.current;
    const bg = menuBgRef.current;
    const links = linksRef.current;

    if (!menu || !bg || !links) return;

    gsap.set(menu, { visibility: 'hidden' });

    tlRef.current = gsap.timeline({ paused: true })
      .to(menu, {
        visibility: 'visible',
        duration: 0.01
      })
      .fromTo(bg, 
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.7, ease: 'power3.inOut' }
      )
      .fromTo(
        links.querySelectorAll('.menu-item'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        links.querySelectorAll('.menu-meta'),
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.15'
      );
  }, []);

  const toggleMenu = () => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.reverse();
      setIsOpen(false);
    } else {
      tlRef.current.play();
      setIsOpen(true);
    }
  };

  const handleNavClick = (id: string) => {
    if (isOpen) {
      toggleMenu();
    }
    onLinkClick(id);
  };

  const navLinks = [
    { name: 'About', id: '#about' },
    { name: 'Collections', id: '#collections' },
    { name: 'Experience', id: '#experience' },
    { name: 'Contact', id: '#contact' },
  ];

  return (
    <>
      {/* Floating Glass Rounded Navbar */}
      <div className="fixed top-4 left-0 w-full z-50 flex justify-center px-4 md:px-8 pointer-events-none select-none">
        <nav
          className={cn(
            'w-full max-w-[1280px] h-[72px] flex items-center justify-between px-6 md:px-10 rounded-full transition-all duration-500 pointer-events-auto shadow-sm border border-luxuryBorder bg-white/55 backdrop-blur-[20px]',
            isScrolled && 'shadow-[0_12px_40px_rgba(132,100,70,0.06)] bg-white/80 border-luxuryBorder'
          )}
        >
          {/* Logo & Brand Left */}
          <a
            href="#hero"
            className="flex items-center gap-3 group pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
          >
            <div className="w-9 h-9 overflow-hidden border border-luxuryBorder rounded-full transition-transform duration-500 group-hover:scale-105">
              <img
                src="/logo/logo.jpg"
                alt="Om Mangalam Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-base font-serif font-light tracking-[0.18em] text-espresso uppercase group-hover:text-bronze transition-colors">
              Om Mangalam
            </span>
          </a>

          {/* Centered Desktop Menu Links */}
          <div className="hidden lg:flex items-center space-x-12">
            <ul className="flex space-x-8 text-xs tracking-luxury text-warmGrey font-sans font-light uppercase">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.id}
                    className="relative py-2 text-[11px] hover:text-espresso transition-colors group"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                  >
                    {link.name}
                    {/* Slide-in champagne bronze underline on hover */}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-bronze origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Right Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick('#contact')}
              className="px-6 py-2.5 border border-bronze text-[11px] tracking-luxury uppercase text-bronze hover:bg-bronze hover:text-white transition-all duration-500 font-sans font-medium rounded-full"
            >
              Visit Showroom
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 z-[60] focus:outline-none pointer-events-auto"
            aria-label="Toggle Menu"
          >
            <span
              className={cn(
                'w-6 h-[1.5px] bg-espresso transition-transform duration-500 mb-1.5',
                isOpen && 'transform rotate-45 translate-y-[3.5px]'
              )}
            />
            <span
              className={cn(
                'w-6 h-[1.5px] bg-espresso transition-transform duration-500',
                isOpen && 'transform -rotate-45 -translate-y-[3.5px]'
              )}
            />
          </button>
        </nav>
      </div>

      {/* Fullscreen Mobile Dropdown Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 w-full h-screen z-45 lg:hidden overflow-hidden"
      >
        {/* Animated Background */}
        <div
          ref={menuBgRef}
          className="absolute inset-0 bg-ivory/98 backdrop-blur-xl w-full h-full border-b border-luxuryBorder"
        />

        {/* Content Container */}
        <div
          ref={linksRef}
          className="absolute inset-0 flex flex-col justify-center px-12 md:px-20 h-full select-none"
        >
          <div className="flex flex-col space-y-6 md:space-y-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={link.id}
                className="menu-item text-3xl md:text-4xl font-serif font-light text-espresso tracking-wider uppercase hover:text-bronze transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
              >
                <span className="font-sans text-xs text-bronze mr-4 select-none">
                  0{idx + 1}
                </span>
                {link.name}
              </a>
            ))}
          </div>

          <div className="menu-item mt-10">
            <button
              onClick={() => handleNavClick('#contact')}
              className="px-8 py-3.5 border border-bronze text-xs tracking-luxury uppercase text-bronze hover:bg-bronze hover:text-white transition-all duration-500 rounded-full font-medium"
            >
              Visit Showroom
            </button>
          </div>

          {/* Socials / Location info at bottom of mobile overlay */}
          <div className="menu-meta mt-auto border-t border-luxuryBorder pt-8 flex flex-col md:flex-row md:justify-between text-[10px] tracking-luxury uppercase text-warmGrey gap-4">
            <div>
              <p className="text-bronze mb-1 font-semibold">Gallery Address</p>
              <p className="font-sans font-light text-espresso">Bengaluru Showroom, Indiranagar</p>
            </div>
            <div>
              <p className="text-bronze mb-1 font-semibold">Socials</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-espresso transition-colors">Instagram</a>
                <a href="#" className="hover:text-espresso transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
