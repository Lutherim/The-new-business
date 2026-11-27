'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection, { type QuickBookingPrefill } from '@/components/HeroSection';
import AccommodationSection from '@/components/AccommodationSection';
import BookingEnquirySection from '@/components/BookingEnquirySection';
import ConferencingSection from '@/components/ConferencingSection';
import GalleryAndVideoSection from '@/components/GalleryAndVideoSection';
import AboutAndContactSection from '@/components/AboutAndContactSection';
import FooterAndFloatingElements from '@/components/FooterAndFloatingElements';
import { SAMPLE_ACCOMMODATION_ROOMS } from '@/lib/property-data';

interface GuestManorClientPageProps {
  defaultCheckIn: string;
  defaultCheckOut: string;
  defaultEventDate: string;
}

export default function GuestManorClientPage({
  defaultCheckIn,
  defaultCheckOut,
  defaultEventDate,
}: GuestManorClientPageProps) {
  const [bookingPrefill, setBookingPrefill] = useState<QuickBookingPrefill>({
    checkIn: defaultCheckIn,
    checkOut: defaultCheckOut,
    guests: '2',
    preferredRoom: SAMPLE_ACCOMMODATION_ROOMS[0].title,
  });

  const scrollToSection = (sectionId: string) => {
    if (typeof document !== 'undefined') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleNavigateToBooking = () => {
    scrollToSection('booking-enquiry');
  };

  const handleQuickBookingSubmit = (prefill: QuickBookingPrefill) => {
    setBookingPrefill(prefill);
    scrollToSection('booking-enquiry');
  };

  const handleSelectRoomForEnquiry = (roomTitle: string) => {
    setBookingPrefill((prev) => ({
      ...prev,
      preferredRoom: roomTitle,
    }));
    scrollToSection('booking-enquiry');
  };

  const handleUpdateBookingDraft = (patch: Partial<QuickBookingPrefill>) => {
    setBookingPrefill((prev) => ({ ...prev, ...patch }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#1C211E]">
      <Navbar onNavigateToBooking={handleNavigateToBooking} />

      <main className="flex-1">
        <HeroSection
          defaultCheckIn={defaultCheckIn}
          defaultCheckOut={defaultCheckOut}
          onQuickBookingSubmit={handleQuickBookingSubmit}
        />

        <AccommodationSection
          onSelectRoomForEnquiry={handleSelectRoomForEnquiry}
        />

        <BookingEnquirySection
          draft={bookingPrefill}
          onUpdateDraft={handleUpdateBookingDraft}
          defaultCheckIn={defaultCheckIn}
        />

        <ConferencingSection defaultEventDate={defaultEventDate} />

        <GalleryAndVideoSection
          onNavigateToBooking={handleNavigateToBooking}
        />

        <AboutAndContactSection
          onNavigateToBooking={handleNavigateToBooking}
        />
      </main>

      <FooterAndFloatingElements
        onNavigateToBooking={handleNavigateToBooking}
      />
    </div>
  );
}
