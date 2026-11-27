'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { VERIFIED_PROPERTY } from '@/lib/property-data';

interface NavbarProps {
  onNavigateToBooking: () => void;
}

export default function Navbar({ onNavigateToBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accommodation', href: '#accommodation' },
    { label: 'Conferencing', href: '#conferencing' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#12231A]/95 backdrop-blur-md border-b border-[#263E30] text-[#FAF8F4]'
          : 'bg-[#12231A] border-b border-[#22382B] text-[#FAF8F4]'
      }`}
    >
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-semibold tracking-tight text-[#FAF8F4] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A059]"
        >
          {VERIFIED_PROPERTY.name}
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#D7DDD8]"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className=" py-1 hover:text-[#FAF8F4] underline-offset-8 hover:underline decoration-[#C5A059] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A059]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (+ mobile menu toggle on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onNavigateToBooking}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#12231A] bg-[#C5A059] hover:bg-[#D2B06C] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF8F4]"
          >
            Book Now
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-md border border-[#2C4738] text-[#FAF8F4] hover:bg-[#1B3326] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#C5A059]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-t border-[#263E30] bg-[#12231A] px-4 pt-3 pb-6"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            <a
              href="#top"
              onClick={handleMobileNavClick}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-[#D7DDD8] hover:bg-[#1B3326] hover:text-[#FAF8F4] transition-colors"
            >
              Home
            </a>
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleMobileNavClick}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-[#D7DDD8] hover:bg-[#1B3326] hover:text-[#FAF8F4] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-[#263E30] flex flex-col gap-2 text-xs text-[#A9B5AE]">
            <span>{VERIFIED_PROPERTY.address.fullDisplay}</span>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={`tel:${VERIFIED_PROPERTY.contact.mobileDial}`}
                className="text-[#C5A059] hover:underline font-[family-name:var(--font-mono)] tabular-nums"
              >
                {VERIFIED_PROPERTY.contact.mobileDisplay}
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={`tel:${VERIFIED_PROPERTY.contact.landlineDial}`}
                className="text-[#C5A059] hover:underline font-[family-name:var(--font-mono)] tabular-nums"
              >
                {VERIFIED_PROPERTY.contact.landlineDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
