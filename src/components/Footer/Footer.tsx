import React from 'react';
import { FiArrowUp } from 'react-icons/fi';

interface FooterProps {
  onBackToTop: () => void;
  onLinkClick: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop, onLinkClick }) => {
  const quickLinks = [
    { name: 'About', id: '#about' },
    { name: 'Collections', id: '#collections' },
    { name: 'Experience', id: '#experience' },
    { name: 'Contact', id: '#contact' },
  ];

  return (
    <footer
      className="bg-ivory text-espresso pt-24 pb-12 px-6 md:px-16 border-t border-luxuryBorder relative z-10 select-none"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col space-y-16">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Logo & Brand Identity (Cols 1-4) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 overflow-hidden border border-luxuryBorder shadow-sm rounded-lg">
                <img
                  src="/logo/logo.jpg"
                  alt="Om Mangalam Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-serif font-light tracking-[0.2em] text-espresso uppercase">
                Om Mangalam
              </span>
            </div>
            <p className="text-xs md:text-sm text-warmGrey font-sans font-light leading-relaxed max-w-sm">
              Crafting premium architectural sanitaryware and complete bathroom concepts that elevate standard designs into bespoke expressions of modern luxury.
            </p>
          </div>

          {/* Quick Links (Cols 5-7) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-[10px] text-bronze tracking-luxury uppercase font-sans font-semibold">
              Explore
            </h4>
            <ul className="flex flex-col space-y-2 text-xs md:text-sm font-sans font-light text-warmGrey">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.id}
                    className="hover:text-bronze transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      onLinkClick(link.id);
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Details (Cols 8-10) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-[10px] text-bronze tracking-luxury uppercase font-sans font-semibold">
              Bengaluru Showroom
            </h4>
            <p className="text-xs md:text-sm text-warmGrey font-sans font-light leading-relaxed">
              No. 42, Ground Floor, Design Boulevard,<br />
              100 Feet Road, Indiranagar,<br />
              Bengaluru, Karnataka - 560038
            </p>
            <div className="text-xs text-warmGrey/80 pt-2 font-sans font-light">
              <span className="text-espresso block font-medium">Enquiries:</span>
              <a href="tel:+919876543210" className="hover:text-bronze transition-colors block mb-1">
                +91 98765 43210
              </a>
              <a href="mailto:info@ommangalam.com" className="hover:text-bronze transition-colors block">
                info@ommangalam.com
              </a>
            </div>
          </div>

          {/* Working Hours (Cols 11-12) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-[10px] text-bronze tracking-luxury uppercase font-sans font-semibold">
              Gallery Hours
            </h4>
            <div className="text-xs md:text-sm text-warmGrey font-sans font-light leading-relaxed">
              <p className="flex justify-between">
                <span>Mon – Sat</span>
                <span className="text-espresso font-medium">10:00 – 20:00</span>
              </p>
              <p className="flex justify-between border-t border-luxuryBorder pt-2 mt-2">
                <span>Sunday</span>
                <span className="text-bronze italic">By Appointment</span>
              </p>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-luxuryBorder" />

        {/* Bottom Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 text-[11px] text-warmGrey font-sans tracking-luxury uppercase font-light">
          
          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-bronze transition-colors duration-300">Instagram</a>
            <a href="#" className="hover:text-bronze transition-colors duration-300">LinkedIn</a>
            <a href="#" className="hover:text-bronze transition-colors duration-300">Pinterest</a>
          </div>

          {/* Copyright & Scroll To Top */}
          <div className="flex items-center space-x-8 w-full md:w-auto justify-between md:justify-end">
            <span>© {new Date().getFullYear()} OM MANGALAM. ALL RIGHTS RESERVED.</span>
            <button
              onClick={onBackToTop}
              className="flex items-center gap-1.5 text-[10px] text-bronze hover:text-espresso uppercase transition-colors duration-500 font-semibold tracking-[0.2em]"
            >
              Back To Top <FiArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
