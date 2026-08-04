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

  // Monitor scroll for matte backdrop activation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize GSAP Timeline for fullscreen menu
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
        { scaleY: 1, duration: 0.8, ease: 'power4.inOut' }
      )
      .fromTo(
        links.querySelectorAll('.menu-item'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        links.querySelectorAll('.menu-meta'),
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
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
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 py-5 px-6 md:px-12',
          isScrolled
            ? 'bg-charcoal/85 luxury-blur border-b border-[#c5a880]/15 py-3 shadow-lg'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo & Brand Name */}
          <a
            href="#hero"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
          >
            <div className="w-10 h-10 overflow-hidden border border-[#c5a880]/30 transition-transform duration-500 group-hover:scale-105">
              <img
                src="/logo/logo.jpg"
                alt="Om Mangalam Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg md:text-xl font-serif font-light tracking-[0.18em] text-ivory uppercase group-hover:text-accent transition-colors">
              Om Mangalam
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-12">
            <ul className="flex space-x-8 text-xs tracking-luxury text-[#a1a1aa] font-sans font-light uppercase">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.id}
                    className="relative py-2 text-[11px] hover:text-white transition-colors group"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                  >
                    {link.name}
                    {/* Editorial gold slide-in underline */}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-400" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Visit Showroom Button */}
            <button
              onClick={() => handleNavClick('#contact')}
              className="px-6 py-2.5 border border-[#c5a880]/40 text-[11px] tracking-luxury uppercase text-ivory hover:bg-[#c5a880] hover:text-charcoal hover:border-[#c5a880] transition-all duration-500 font-sans font-medium"
            >
              Visit Showroom
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 z-[60] focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span
              className={cn(
                'w-6 h-[1px] bg-ivory transition-transform duration-500 mb-1.5',
                isOpen && 'transform rotate-45 translate-y-[3.5px] bg-ivory'
              )}
            />
            <span
              className={cn(
                'w-6 h-[1px] bg-ivory transition-transform duration-500',
                isOpen && 'transform -rotate-45 -translate-y-[3.5px] bg-ivory'
              )}
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Overlay Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 w-full h-screen z-45 lg:hidden overflow-hidden"
      >
        {/* Animated Background */}
        <div
          ref={menuBgRef}
          className="absolute inset-0 bg-[#0f0f0f]/98 backdrop-blur-xl w-full h-full border-b border-[#c5a880]/15"
        />

        {/* Links Content */}
        <div
          ref={linksRef}
          className="absolute inset-0 flex flex-col justify-center px-12 md:px-20 h-full"
        >
          <div className="flex flex-col space-y-6 md:space-y-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={link.id}
                className="menu-item text-4xl md:text-5xl font-serif font-light text-ivory tracking-wider uppercase hover:text-accent transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
              >
                <span className="font-sans text-xs text-[#c5a880] mr-4 select-none">
                  0{idx + 1}
                </span>
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile showroom action */}
          <div className="menu-item mt-10">
            <button
              onClick={() => handleNavClick('#contact')}
              className="px-8 py-3.5 border border-[#c5a880]/50 text-xs tracking-luxury uppercase text-ivory hover:bg-[#c5a880] hover:text-charcoal hover:border-[#c5a880] transition-all duration-500"
            >
              Visit Showroom
            </button>
          </div>

          {/* Socials / Location info at bottom of menu */}
          <div className="menu-meta mt-auto border-t border-zinc-900 pt-8 flex flex-col md:flex-row md:justify-between text-[11px] tracking-luxury uppercase text-[#a1a1aa] gap-4">
            <div>
              <p className="text-accent mb-1 font-semibold">Address</p>
              <p className="font-sans font-light">Bengaluru Showroom, India</p>
            </div>
            <div>
              <p className="text-accent mb-1 font-semibold">Connect</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
