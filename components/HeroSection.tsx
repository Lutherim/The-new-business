'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Users, ArrowRight, Film } from 'lucide-react';
import {
  HERO_IMAGE,
  VERIFIED_PROPERTY,
  SAMPLE_ACCOMMODATION_ROOMS,
} from '@/lib/property-data';

export interface QuickBookingPrefill {
  checkIn: string;
  checkOut: string;
  guests: string;
  preferredRoom: string;
}

interface HeroSectionProps {
  defaultCheckIn: string;
  defaultCheckOut: string;
  onQuickBookingSubmit: (prefill: QuickBookingPrefill) => void;
}

export default function HeroSection({
  defaultCheckIn,
  defaultCheckOut,
  onQuickBookingSubmit,
}: HeroSectionProps) {
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState('2');
  const [preferredRoom, setPreferredRoom] = useState(SAMPLE_ACCOMMODATION_ROOMS[0].title);
  const [ambientMotion, setAmbientMotion] = useState(false);
  const [quickError, setQuickError] = useState('');

  const configuredVideoUrl = process.env.NEXT_PUBLIC_PROPERTY_VIDEO_URL || '';

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickError('');

    if (!checkIn || !checkOut) {
      setQuickError('Please select check-in and check-out dates.');
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setQuickError('Check-out date must be after check-in date.');
      return;
    }

    onQuickBookingSubmit({
      checkIn,
      checkOut,
      guests,
      preferredRoom,
    });
  };

  return (
    <section
      id="top"
      aria-label="Hero and Quick Booking Enquiry"
      className="relative bg-[#12231A] text-[#FAF8F4] overflow-hidden"
    >
      {/* Cinematic Background Visual Carrier */}
      <div className="relative min-h-[600px] lg:min-h-[680px] flex flex-col justify-between">
        <div className="absolute inset-0 z-0 bg-[#12231A]">
          {configuredVideoUrl && ambientMotion ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/hero_manor_exterior_1795795972159.jpg"
              className="h-full w-full object-cover opacity-55"
            >
              <source src={configuredVideoUrl} type="video/mp4" />
            </video>
          ) : (
            <div
              className={`relative h-full w-full transition-transform duration-1000 ease-out ${
                ambientMotion ? 'motion-safe:scale-105' : 'scale-100'
              }`}
            >
              <Image
                src={HERO_IMAGE}
                alt="Illustrative architectural evening concept for Limpopo Guest Manor courtyard"
                fill
                priority
                referrerPolicy="no-referrer"
                className="object-cover object-center opacity-50"
              />
            </div>
          )}

          {/* Measured contrast scrim for guaranteed WCAG AA legibility */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0E1C14] via-[#12231A]/75 to-[#0E1C14]/60"
            aria-hidden="true"
          />
        </div>

        {/* Subtle Unofficial Concept Preview & Regional Kicker Bar */}
        <div className="relative z-10 border-b border-[#FAF8F4]/10 bg-[#0E1C14]/60 backdrop-blur-xs">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-6 lg:px-8 text-xs text-[#D5DDD8]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-[#C5A059]">
                {VERIFIED_PROPERTY.conceptStatus}
              </span>
              <span aria-hidden="true">·</span>
              <span>{VERIFIED_PROPERTY.address.fullDisplay}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[#A7B4AD]">
                Illustrative concept imagery shown
              </span>
              <button
                type="button"
                onClick={() => setAmbientMotion((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs text-[#C5A059] hover:text-[#FAF8F4] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Film className="h-3.5 w-3.5" />
                <span>{ambientMotion ? 'Pause Ambient Motion' : 'Preview Ambient Motion'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Primary Hero Copy & Dual CTA Block */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-14 pb-12 sm:px-6 lg:px-8 lg:pt-20 lg:pb-16">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#C5A059] mb-4">
              Polokwane CBD, Limpopo · Boutique Hospitality &amp; Corporate Conferencing
            </p>

            <h1
              className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FAF8F4] leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              Your Comfortable Stay in the Heart of Polokwane.
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-[#D7DDD9] leading-relaxed font-normal">
              Conveniently situated at 82 Plein Street / 48 Devenish Street in Polokwane CBD,{' '}
              {VERIFIED_PROPERTY.name} welcomes business travellers, leisure guests, and corporate
              delegates with restful overnight accommodation and a reported 100-seat conferencing
              facility.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#accommodation"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C5A059] px-6 py-3 text-sm font-semibold text-[#12231A] hover:bg-[#D4B26E] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF8F4]"
              >
                <span>Explore Accommodation</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#conferencing"
                className="inline-flex items-center justify-center rounded-md border border-[#FAF8F4]/30 bg-[#12231A]/60 px-6 py-3 text-sm font-medium text-[#FAF8F4] hover:bg-[#FAF8F4]/10 hover:border-[#FAF8F4]/60 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
              >
                Discover Conferencing
              </a>
            </div>

            {/* Clean unboxed key property highlights */}
            <div className="mt-10 pt-6 border-t border-[#FAF8F4]/15 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#C2CCC6]">
              <span>Central Polokwane CBD Access</span>
              <span aria-hidden="true" className="text-[#C5A059]">
                ·
              </span>
              <span className="font-[family-name:var(--font-mono)] tabular-nums">
                Up to 100-Seat Reported Conference Capacity
              </span>
              <span aria-hidden="true" className="text-[#C5A059]">
                ·
              </span>
              <span>Direct Reservations Desk Assistance</span>
            </div>
          </div>
        </div>

        {/* Compact Booking Enquiry Panel (Full-width horizontal strip below Hero content) */}
        <div className="relative z-10 border-t border-[#FAF8F4]/15 bg-[#0D1A13]/90 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <form
              onSubmit={handleQuickSubmit}
              aria-label="Compact Booking Request Bar"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end"
            >
              <div className="lg:col-span-3">
                <label
                  htmlFor="hero-checkin"
                  className="block text-xs font-medium text-[#C2CCC6] mb-1.5"
                >
                  Check-In Date
                </label>
                <div className="relative">
                  <input
                    id="hero-checkin"
                    type="date"
                    value={checkIn}
                    min={defaultCheckIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className="w-full rounded-md border border-[#2C4738] bg-[#15281E] px-3.5 py-2.5 text-sm text-[#FAF8F4] font-[family-name:var(--font-mono)] tabular-nums focus:border-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="lg:col-span-3">
                <label
                  htmlFor="hero-checkout"
                  className="block text-xs font-medium text-[#C2CCC6] mb-1.5"
                >
                  Check-Out Date
                </label>
                <div className="relative">
                  <input
                    id="hero-checkout"
                    type="date"
                    value={checkOut}
                    min={checkIn || defaultCheckIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="w-full rounded-md border border-[#2C4738] bg-[#15281E] px-3.5 py-2.5 text-sm text-[#FAF8F4] font-[family-name:var(--font-mono)] tabular-nums focus:border-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="lg:col-span-2">
                <label
                  htmlFor="hero-guests"
                  className="block text-xs font-medium text-[#C2CCC6] mb-1.5"
                >
                  Guests
                </label>
                <div className="relative flex items-center">
                  <Users className="pointer-events-none absolute left-3 h-4 w-4 text-[#8FA196]" />
                  <select
                    id="hero-guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full rounded-md border border-[#2C4738] bg-[#15281E] pl-9 pr-3 py-2.5 text-sm text-[#FAF8F4] font-[family-name:var(--font-mono)] tabular-nums focus:border-[#C5A059] focus:outline-none"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests (Group)</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-2">
                <label
                  htmlFor="hero-room"
                  className="block text-xs font-medium text-[#C2CCC6] mb-1.5"
                >
                  Room Preference (Sample)
                </label>
                <select
                  id="hero-room"
                  value={preferredRoom}
                  onChange={(e) => setPreferredRoom(e.target.value)}
                  className="w-full rounded-md border border-[#2C4738] bg-[#15281E] px-3 py-2.5 text-sm text-[#FAF8F4] focus:border-[#C5A059] focus:outline-none truncate"
                >
                  {SAMPLE_ACCOMMODATION_ROOMS.map((room) => (
                    <option key={room.id} value={room.title}>
                      {room.title}
                    </option>
                  ))}
                  <option value="General Room Enquiry — Advise Available Options">
                    Advise Available Options
                  </option>
                </select>
              </div>

              <div className="lg:col-span-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#C5A059] px-4 py-2.5 text-sm font-semibold text-[#12231A] hover:bg-[#D4B26E] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Begin Enquiry</span>
                </button>
              </div>
            </form>

            {quickError && (
              <p role="alert" className="mt-2 text-xs text-[#E8A598]">
                {quickError}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
