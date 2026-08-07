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
      id="contact"
      className="bg-[#F8F5EF] text-[#2E241C] pt-32 pb-16 px-6 md:px-16 border-t border-[#C8A46A]/10 relative z-10 select-none"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col space-y-20">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Logo & Brand Identity (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 overflow-hidden border border-[#C8A46A]/20 shadow-sm rounded-full">
                <img
                  src="/logo/logo.jpg"
                  alt="Om Mangalam Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-serif font-light tracking-[0.2em] text-[#2E241C] uppercase">
                Om Mangalam
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#6F6358] font-sans font-light leading-relaxed max-w-sm">
              Sourcing premium architectural collections that transform layouts into bespoke expressions of modern luxury.
            </p>
          </div>

          {/* Quick Links (Cols 6-8) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-[10px] text-[#C8A46A] tracking-luxury uppercase font-sans font-medium">
              Explore
            </h4>
            <ul className="flex flex-col space-y-2 text-xs md:text-sm font-sans font-light text-[#6F6358]">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.id}
                    className="hover:text-[#C8A46A] transition-colors duration-300"
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

          {/* Location & Details (Cols 9-12) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h4 className="text-[10px] text-[#C8A46A] tracking-luxury uppercase font-sans font-medium">
              Shop Location
            </h4>
            <p className="text-xs md:text-sm text-[#6F6358] font-sans font-light leading-relaxed">
              No 15 A, Golimar Garden, Shop, 22, Sahakar Marg,<br />
              near House of People, Bais Godam,<br />
              Jaipur, Rajasthan - 302006
            </p>
            <div className="text-xs text-[#6F6358]/80 pt-2 font-sans font-light">
              <span className="text-[#2E241C] block font-medium">Enquiries:</span>
              <a href="tel:+919876543210" className="hover:text-[#C8A46A] transition-colors block mb-1">
                +91 98765 43210
              </a>
              <a href="mailto:info@ommangalam.com" className="hover:text-[#C8A46A] transition-colors block">
                info@ommangalam.com
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#C8A46A]/10" />

        {/* Bottom Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 text-[11px] text-[#6F6358] font-sans tracking-luxury uppercase font-light">

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#C8A46A] transition-colors duration-300">Instagram</a>
            <a href="#" className="hover:text-[#C8A46A] transition-colors duration-300">LinkedIn</a>
            <a href="#" className="hover:text-[#C8A46A] transition-colors duration-300">Pinterest</a>
          </div>

          {/* Copyright & Scroll To Top */}
          <div className="flex items-center space-x-8 w-full md:w-auto justify-between md:justify-end">
            <span>© {new Date().getFullYear()} OM MANGALAM. ALL RIGHTS RESERVED.</span>
            <button
              onClick={onBackToTop}
              className="flex items-center gap-1.5 text-[10px] text-[#C8A46A] hover:text-[#2E241C] uppercase transition-colors duration-500 font-semibold tracking-[0.2em] cursor-pointer"
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
