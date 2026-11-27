'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Map,
} from 'lucide-react';
import { DINING_IMAGE, VERIFIED_PROPERTY } from '@/lib/property-data';

interface AboutAndContactSectionProps {
  onNavigateToBooking: () => void;
}

export default function AboutAndContactSection({
  onNavigateToBooking,
}: AboutAndContactSectionProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [mapPreviewConfirmed, setMapPreviewConfirmed] = useState(
    Boolean(process.env.NEXT_PUBLIC_CONFIRMED_MAP_EMBED_URL)
  );
  const [selectedEntrancePin, setSelectedEntrancePin] = useState<'plein' | 'devenish'>('plein');

  const handleCopy = (label: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2200);
    }
  };

  const mapQueryAddress =
    selectedEntrancePin === 'plein'
      ? '82 Plein Street, Polokwane, Limpopo, South Africa'
      : '48 Devenish Street, Polokwane, Limpopo, South Africa';

  const embedUrl =
    process.env.NEXT_PUBLIC_CONFIRMED_MAP_EMBED_URL ||
    `https://maps.google.com/maps?q=${encodeURIComponent(
      mapQueryAddress
    )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      {/* ABOUT SECTION */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="py-20 lg:py-28 bg-[#F3EFE6] text-[#1C211E] border-b border-[#E2DDD2]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch">
            {/* Left Editorial Hospitality Copy */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#7E6330] mb-3">
                  06. About {VERIFIED_PROPERTY.name}
                </p>
                <h2
                  id="about-heading"
                  className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#14261C]"
                  style={{ textWrap: 'balance' }}
                >
                  Warm Hospitality &amp; Dependable Service in Polokwane CBD.
                </h2>

                <div className="mt-6 space-y-4 text-sm sm:text-base text-[#424A45] leading-relaxed">
                  <p>
                    Situated in the commercial heart of Limpopo’s capital at{' '}
                    <strong className="font-semibold text-[#14261C]">
                      {VERIFIED_PROPERTY.address.fullDisplay}
                    </strong>
                    , {VERIFIED_PROPERTY.name} provides a calm, welcoming base for overnight guests
                    and corporate gatherings.
                  </p>
                  <p>
                    We understand what matters most to regional business travellers, visiting
                    delegations, and leisure guests: attentive personal communication, a central
                    address with straightforward access to Polokwane’s civic and business hubs, and
                    well-coordinated spaces for both restful sleep and productive daytime sessions.
                  </p>
                  <p>
                    With a reported conferencing capacity of up to{' '}
                    <span className="font-[family-name:var(--font-mono)] font-semibold text-[#14261C] tabular-nums">
                      100 seats
                    </span>
                    , our team works closely with event organisers and individual guests to tailor
                    every stay or seminar enquiry directly.
                  </p>
                </div>
              </div>

              {/* Transparent Information Integrity Table */}
              <div className="mt-10 rounded-xl border border-[#DCD6C8] bg-[#FAF8F4] p-5 sm:p-6">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#E5E0D5]">
                  <ShieldCheck className="h-5 w-5 text-[#14261C] shrink-0" />
                  <h3 className="text-sm font-semibold text-[#14261C]">
                    Verified Property Information &amp; Concept Preview Notice
                  </h3>
                </div>

                <dl className="mt-4 space-y-3 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-[#ECE7DD] pb-2.5">
                    <dt className="text-[#5C6660]">Verified Address</dt>
                    <dd className="font-medium text-[#14261C] sm:text-right">
                      {VERIFIED_PROPERTY.address.fullDisplay}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-[#ECE7DD] pb-2.5">
                    <dt className="text-[#5C6660]">Verified Telephone Lines</dt>
                    <dd className="font-[family-name:var(--font-mono)] font-medium text-[#14261C] tabular-nums sm:text-right">
                      {VERIFIED_PROPERTY.contact.mobileDisplay} /{' '}
                      {VERIFIED_PROPERTY.contact.landlineDisplay}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-[#ECE7DD] pb-2.5">
                    <dt className="text-[#5C6660]">Verified Reservations Email</dt>
                    <dd className="font-medium text-[#14261C] sm:text-right">
                      {VERIFIED_PROPERTY.contact.email}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <dt className="text-[#5C6660]">Reported Conferencing Capacity</dt>
                    <dd className="font-[family-name:var(--font-mono)] font-medium text-[#14261C] tabular-nums sm:text-right">
                      Up to 100 Seats
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 pt-3 border-t border-[#E5E0D5] text-xs text-[#5C6660] leading-relaxed">
                  <strong className="font-semibold text-[#14261C]">Editorial Note:</strong> Unverified
                  reference figures from the prospect brief (such as a 4-star grading, a 4.1-star
                  Google rating from 273 reviews, or an indicative nightly rate of R1,627) are not
                  published as guaranteed current facts. Contact reservations directly for official
                  current rates and room specifications.
                </p>
              </div>
            </div>

            {/* Right Visual Showcase Column */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="h-full rounded-xl border border-[#DCD6C8] bg-white overflow-hidden flex flex-col justify-between">
                <div className="relative aspect-16/9 lg:aspect-auto lg:h-full min-h-[320px] w-full bg-[#162B20]">
                  <Image
                    src={DINING_IMAGE}
                    alt="Illustrative hospitality concept of a boutique guest manor dining and reception lounge"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1A13]/90 via-[#0D1A13]/45 to-transparent p-6 text-[#FAF8F4]">
                    <p className="text-xs text-[#C5A059] font-medium">
                      Hospitality Concept Study · Reception &amp; Dining Lounge
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-[#D5DDD8]">
                      Illustrative interior concept demonstrating warm ivory, natural stone, and
                      deep forest green finishes.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white border-t border-[#ECE7DD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[#14261C]">
                      Plan Your Polokwane Stay or Event
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A635D]">
                      Speak directly with our reservations team for personalised assistance.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onNavigateToBooking}
                    className="rounded-md bg-[#14261C] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF8F4] hover:bg-[#1E382A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Make an Enquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & LOCATION SECTION */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="py-20 lg:py-28 bg-[#FAF8F4] text-[#1C211E]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-12 border-b border-[#E5E0D5]">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#7E6330] mb-3">
                07. Direct Contact &amp; Polokwane CBD Location
              </p>
              <h2
                id="contact-heading"
                className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#14261C]"
                style={{ textWrap: 'balance' }}
              >
                Connect With {VERIFIED_PROPERTY.name}.
              </h2>
            </div>

            <p className="max-w-md text-sm sm:text-base text-[#4A524D] leading-relaxed">
              Reach our reception and reservations desk directly by phone, WhatsApp, or email for
              overnight room enquiries and 100-seat conferencing quotations.
            </p>
          </div>

          {/* 4-Card Direct Contact Action Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Mobile & WhatsApp Card */}
            <div className="flex flex-col justify-between rounded-xl border border-[#E2DDD2] bg-white p-6">
              <div>
                <div className="flex items-center justify-between text-xs text-[#7E6330] font-semibold">
                  <span>Mobile &amp; WhatsApp</span>
                  <Phone className="h-4 w-4 text-[#14261C]" />
                </div>
                <p className="mt-3 font-[family-name:var(--font-mono)] text-xl font-semibold text-[#14261C] tabular-nums">
                  {VERIFIED_PROPERTY.contact.mobileDisplay}
                </p>
                <p className="mt-1 text-xs text-[#5A635D]">
                  Direct mobile line for calls and WhatsApp booking enquiries.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ECE7DD] flex items-center justify-between gap-2">
                <a
                  href={`tel:${VERIFIED_PROPERTY.contact.mobileDial}`}
                  className="text-xs font-semibold text-[#14261C] hover:text-[#7E6330] underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  Call Mobile
                </a>
                <a
                  href={`https://wa.me/${VERIFIED_PROPERTY.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E5E3A] hover:underline whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy('mobile', VERIFIED_PROPERTY.contact.mobileDisplay)
                  }
                  aria-label="Copy mobile number"
                  className="inline-flex items-center gap-1 text-xs text-[#68726B] hover:text-[#14261C] cursor-pointer"
                >
                  {copiedItem === 'mobile' ? (
                    <Check className="h-3.5 w-3.5 text-[#1E5E3A]" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Reception Landline Card */}
            <div className="flex flex-col justify-between rounded-xl border border-[#E2DDD2] bg-white p-6">
              <div>
                <div className="flex items-center justify-between text-xs text-[#7E6330] font-semibold">
                  <span>Reception Landline</span>
                  <Phone className="h-4 w-4 text-[#14261C]" />
                </div>
                <p className="mt-3 font-[family-name:var(--font-mono)] text-xl font-semibold text-[#14261C] tabular-nums">
                  {VERIFIED_PROPERTY.contact.landlineDisplay}
                </p>
                <p className="mt-1 text-xs text-[#5A635D]">
                  Polokwane reception desk telephone for reservations and event enquiries.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ECE7DD] flex items-center justify-between gap-2">
                <a
                  href={`tel:${VERIFIED_PROPERTY.contact.landlineDial}`}
                  className="text-xs font-semibold text-[#14261C] hover:text-[#7E6330] underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  Call Landline
                </a>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy('landline', VERIFIED_PROPERTY.contact.landlineDisplay)
                  }
                  aria-label="Copy landline number"
                  className="inline-flex items-center gap-1 text-xs text-[#68726B] hover:text-[#14261C] cursor-pointer"
                >
                  {copiedItem === 'landline' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#1E5E3A]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Reservations Email Card */}
            <div className="flex flex-col justify-between rounded-xl border border-[#E2DDD2] bg-white p-6">
              <div>
                <div className="flex items-center justify-between text-xs text-[#7E6330] font-semibold">
                  <span>Reservations Email</span>
                  <Mail className="h-4 w-4 text-[#14261C]" />
                </div>
                <p className="mt-3 text-sm sm:text-base font-semibold text-[#14261C] break-all">
                  {VERIFIED_PROPERTY.contact.email}
                </p>
                <p className="mt-1.5 text-xs text-[#5A635D]">
                  Direct email for written quotes, corporate RFPs, and group room lists.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ECE7DD] flex items-center justify-between gap-2">
                <a
                  href={`mailto:${VERIFIED_PROPERTY.contact.email}`}
                  className="text-xs font-semibold text-[#14261C] hover:text-[#7E6330] underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  Send Email
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('email', VERIFIED_PROPERTY.contact.email)}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1 text-xs text-[#68726B] hover:text-[#14261C] cursor-pointer"
                >
                  {copiedItem === 'email' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#1E5E3A]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Physical Address Card */}
            <div className="flex flex-col justify-between rounded-xl border border-[#E2DDD2] bg-white p-6">
              <div>
                <div className="flex items-center justify-between text-xs text-[#7E6330] font-semibold">
                  <span>Physical Address</span>
                  <MapPin className="h-4 w-4 text-[#14261C]" />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#14261C] leading-snug">
                  82 Plein Street / 48 Devenish Street
                </p>
                <p className="mt-1 text-xs text-[#5A635D]">
                  CBD, Polokwane, Limpopo, South Africa
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ECE7DD] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleCopy('address', VERIFIED_PROPERTY.address.fullDisplay)
                  }
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#14261C] hover:text-[#7E6330] cursor-pointer"
                >
                  {copiedItem === 'address' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#1E5E3A]" />
                      <span>Address Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Full Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Dual-Street Location & Pin Verification Map Panel */}
          <div className="mt-10 rounded-xl border border-[#DCD6C8] bg-[#F3EFE6] overflow-hidden">
            <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#DCD6C8]">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7E6330]">
                  <Map className="h-4 w-4 text-[#14261C]" />
                  <span>Polokwane CBD Dual-Street Access · Pin Verification Protocol</span>
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-semibold text-[#14261C] mt-1">
                  82 Plein Street / 48 Devenish Street, Polokwane CBD
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4A524D] leading-relaxed">
                  Because {VERIFIED_PROPERTY.name} references both{' '}
                  <strong className="font-semibold text-[#14261C]">82 Plein Street</strong> and{' '}
                  <strong className="font-semibold text-[#14261C]">48 Devenish Street</strong> in
                  Polokwane CBD, the embedded map below lets you toggle between both street
                  coordinates or confirm your preferred arrival entrance with reception prior to
                  travel.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="inline-flex rounded-md border border-[#CFC8B9] bg-white p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEntrancePin('plein');
                      setMapPreviewConfirmed(true);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      selectedEntrancePin === 'plein' && mapPreviewConfirmed
                        ? 'bg-[#14261C] text-[#FAF8F4]'
                        : 'text-[#3A423D] hover:text-[#14261C]'
                    }`}
                  >
                    82 Plein St Pin
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEntrancePin('devenish');
                      setMapPreviewConfirmed(true);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      selectedEntrancePin === 'devenish' && mapPreviewConfirmed
                        ? 'bg-[#14261C] text-[#FAF8F4]'
                        : 'text-[#3A423D] hover:text-[#14261C]'
                    }`}
                  >
                    48 Devenish St Pin
                  </button>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    mapQueryAddress
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#14261C] bg-white px-3.5 py-2 text-xs font-semibold text-[#14261C] hover:bg-[#FAF8F4] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {mapPreviewConfirmed ? (
              <div className="relative h-[360px] w-full bg-[#E5E0D5]">
                <iframe
                  title={`Google Maps Location Preview for ${mapQueryAddress}`}
                  src={embedUrl}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="p-8 sm:p-12 bg-[#14261C] text-[#FAF8F4] flex flex-col items-center justify-center text-center">
                <MapPin className="h-8 w-8 text-[#C5A059] mb-3" />
                <h4 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold">
                  Interactive Street Pin Preview Ready
                </h4>
                <p className="mt-2 max-w-xl text-xs sm:text-sm text-[#C2CCC6] leading-relaxed">
                  To ensure guests are never directed to an unverified gate between 82 Plein Street
                  and 48 Devenish Street, click below to preview the street-level map for either
                  entrance or confirm exact arrival driveway instructions with reception at{' '}
                  <span className="font-[family-name:var(--font-mono)] text-[#C5A059] tabular-nums">
                    {VERIFIED_PROPERTY.contact.mobileDisplay}
                  </span>
                  .
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEntrancePin('plein');
                      setMapPreviewConfirmed(true);
                    }}
                    className="rounded-md bg-[#C5A059] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#12231A] hover:bg-[#D4B26E] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Load 82 Plein Street Map Pin
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEntrancePin('devenish');
                      setMapPreviewConfirmed(true);
                    }}
                    className="rounded-md border border-[#FAF8F4]/30 bg-transparent px-4 py-2.5 text-xs sm:text-sm font-medium text-[#FAF8F4] hover:bg-[#FAF8F4]/10 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Load 48 Devenish Street Map Pin
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
