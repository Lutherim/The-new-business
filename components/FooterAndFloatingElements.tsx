'use client';

import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, MapPin, X, ArrowUp } from 'lucide-react';
import { VERIFIED_PROPERTY } from '@/lib/property-data';

interface FooterAndFloatingElementsProps {
  onNavigateToBooking: () => void;
}

export default function FooterAndFloatingElements({
  onNavigateToBooking,
}: FooterAndFloatingElementsProps) {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const whatsappDirectUrl = `https://wa.me/${
    VERIFIED_PROPERTY.contact.whatsappNumber
  }?text=${encodeURIComponent(
    `Hello ${VERIFIED_PROPERTY.name}, I would like to enquire about accommodation or conferencing availability in Polokwane.`
  )}`;

  return (
    <>
      <footer className="bg-[#0F1E16] text-[#D5DDD8] border-t border-[#22382C]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-[#22382C]">
            {/* Brand & Concept Disclosure Column */}
            <div className="lg:col-span-5 space-y-4">
              <a
                href="#top"
                className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-semibold text-[#FAF8F4] tracking-tight inline-block"
              >
                {VERIFIED_PROPERTY.name}
              </a>

              <p className="max-w-sm text-xs sm:text-sm text-[#B2BFB7] leading-relaxed">
                Restful overnight guest accommodation and reported 100-seat corporate conferencing
                at 82 Plein Street / 48 Devenish Street, CBD, Polokwane, Limpopo, South Africa.
              </p>

              <p className="text-xs text-[#C5A059]">
                <span>{VERIFIED_PROPERTY.conceptStatus}</span>
                <span aria-hidden="true"> · </span>
                <span>Search Indexing Disabled (noindex)</span>
              </p>
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-semibold tracking-wide text-[#FAF8F4]">
                Site Navigation
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#B2BFB7]">
                <li>
                  <a href="#top" className="hover:text-[#FAF8F4] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#accommodation" className="hover:text-[#FAF8F4] transition-colors">
                    Accommodation (Sample Preview)
                  </a>
                </li>
                <li>
                  <a href="#booking-enquiry" className="hover:text-[#FAF8F4] transition-colors">
                    Direct Booking Enquiry
                  </a>
                </li>
                <li>
                  <a href="#conferencing" className="hover:text-[#FAF8F4] transition-colors">
                    100-Seat Conferencing
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[#FAF8F4] transition-colors">
                    Gallery &amp; B-Roll Showcase
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#FAF8F4] transition-colors">
                    About the Manor
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#FAF8F4] transition-colors">
                    Contact &amp; Location
                  </a>
                </li>
              </ul>
            </div>

            {/* Direct Contact & CTA Column */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xs font-semibold tracking-wide text-[#FAF8F4]">
                Reservations &amp; Events Desk
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#B2BFB7]">
                <p className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{VERIFIED_PROPERTY.address.fullDisplay}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#C5A059] shrink-0" />
                  <span className="font-[family-name:var(--font-mono)] tabular-nums">
                    <a
                      href={`tel:${VERIFIED_PROPERTY.contact.mobileDial}`}
                      className="hover:text-[#FAF8F4]"
                    >
                      {VERIFIED_PROPERTY.contact.mobileDisplay}
                    </a>
                    {' / '}
                    <a
                      href={`tel:${VERIFIED_PROPERTY.contact.landlineDial}`}
                      className="hover:text-[#FAF8F4]"
                    >
                      {VERIFIED_PROPERTY.contact.landlineDisplay}
                    </a>
                  </span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#C5A059] shrink-0" />
                  <a
                    href={`mailto:${VERIFIED_PROPERTY.contact.email}`}
                    className="hover:text-[#FAF8F4] break-all"
                  >
                    {VERIFIED_PROPERTY.contact.email}
                  </a>
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateToBooking}
                  className="inline-flex items-center justify-center rounded-md bg-[#C5A059] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#12231A] hover:bg-[#D4B26E] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Request Direct Booking Quote
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Copyright Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#8FA196]">
            <div>
              <span>
                © {new Date().getFullYear()} {VERIFIED_PROPERTY.name}.
              </span>
              <span aria-hidden="true"> · </span>
              <span>{VERIFIED_PROPERTY.conceptStatus}.</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-[#FAF8F4] underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
              >
                Privacy Policy &amp; POPIA Notice (Placeholder)
              </button>

              <a
                href="#top"
                className="inline-flex items-center gap-1 text-[#C5A059] hover:text-[#FAF8F4] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Back to top</span>
                <ArrowUp className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Direct Enquiry Button (Compact to respect <15% mobile sticky cap) */}
      <div className="fixed bottom-5 right-5 z-40">
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with ${VERIFIED_PROPERTY.name} on WhatsApp (${VERIFIED_PROPERTY.contact.mobileDisplay})`}
          className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/60 bg-[#14261C] px-4 py-3 text-xs sm:text-sm font-semibold text-[#FAF8F4] shadow-md hover:bg-[#1E382A] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
        >
          <MessageSquare className="h-4 w-4 text-[#C5A059]" />
          <span>WhatsApp Enquiry</span>
        </a>
      </div>

      {/* Privacy Policy & POPIA Placeholder Modal */}
      {privacyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#09120D]/85 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-xl rounded-xl border border-[#DCD6C8] bg-[#FAF8F4] text-[#1C211E] p-6 sm:p-8 shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E0D5] pb-4">
              <div>
                <p className="text-xs font-semibold text-[#7E6330]">
                  Legal &amp; Data Protection Placeholder
                </p>
                <h3
                  id="privacy-modal-title"
                  className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[#14261C] mt-0.5"
                >
                  Privacy Policy &amp; POPIA Compliance Notice
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                aria-label="Close privacy policy dialog"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#CFC8B9] text-[#14261C] hover:bg-[#EDE8DD] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs sm:text-sm text-[#424A45] leading-relaxed">
              <p>
                This is a placeholder privacy policy for the{' '}
                <strong className="font-semibold text-[#14261C]">
                  {VERIFIED_PROPERTY.name} ({VERIFIED_PROPERTY.conceptStatus})
                </strong>
                . Prior to public production deployment, management’s final Protection of Personal
                Information Act (POPIA) policy and PAIA manual details should be inserted here.
              </p>
              <p>
                <strong className="font-semibold text-[#14261C]">Enquiry Data Usage:</strong> Contact
                information submitted via the Direct Booking Enquiry or Conferencing Proposal forms
                (full name, email address, telephone number, and requested dates) is collected
                solely to respond to your hospitality or corporate event request via{' '}
                <span className="font-medium text-[#14261C]">
                  {VERIFIED_PROPERTY.contact.email}
                </span>
                .
              </p>
              <p>
                <strong className="font-semibold text-[#14261C]">No Automated Billing:</strong> This
                website does not collect credit card numbers or process automated financial
                transactions online.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E0D5] flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="rounded-md bg-[#14261C] px-4 py-2 text-xs sm:text-sm font-semibold text-[#FAF8F4] hover:bg-[#1E382A] transition-colors cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
