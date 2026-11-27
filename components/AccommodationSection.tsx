'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Info } from 'lucide-react';
import {
  SAMPLE_ACCOMMODATION_ROOMS,
  VERIFIED_PROPERTY,
  type SampleRoomCategory,
} from '@/lib/property-data';

interface AccommodationSectionProps {
  onSelectRoomForEnquiry: (roomTitle: string) => void;
}

export default function AccommodationSection({
  onSelectRoomForEnquiry,
}: AccommodationSectionProps) {
  return (
    <section
      id="accommodation"
      aria-labelledby="accommodation-heading"
      className="py-20 lg:py-28 bg-[#FAF8F4] text-[#1C211E] border-b border-[#E5E0D5]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-10 border-b border-[#E5E0D5]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#7E6330] mb-3">
              01. Overnight Accommodation · Polokwane CBD
            </p>
            <h2
              id="accommodation-heading"
              className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#14261C]"
              style={{ textWrap: 'balance' }}
            >
              Restful Guest Rooms Tailored for Business &amp; Leisure Stays.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#4A524D] leading-relaxed">
            Whether you are visiting Polokwane for a single-night corporate engagement or an
            extended regional stay, our reservations desk provides direct guidance on room
            availability and current rates.
          </p>
        </div>

        {/* Transparent Sample Content Disclosure Banner (All-around hairline border, no thick left bar) */}
        <div className="mt-8 rounded-lg border border-[#DCD5C7] bg-[#F2EFE8] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <Info className="h-5 w-5 text-[#7E6330] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#3A423D] leading-relaxed">
              <strong className="font-semibold text-[#14261C]">
                Sample Accommodation Preview:
              </strong>{' '}
              To uphold strict content accuracy, the room cards, amenities, and images below are
              clearly labelled illustrative sample categories. No unverified room tariffs, star
              gradings, or guaranteed inventory claims are published. Confirm actual room
              configurations directly with{' '}
              <a
                href={`mailto:${VERIFIED_PROPERTY.contact.email}`}
                className="font-medium text-[#14261C] underline underline-offset-4 decoration-[#C5A059]"
              >
                {VERIFIED_PROPERTY.contact.email}
              </a>
              .
            </div>
          </div>

          <a
            href="#booking-enquiry"
            className="text-xs font-semibold text-[#14261C] hover:text-[#7E6330] underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            Request Current Room Tariff →
          </a>
        </div>

        {/* 3-Column Photographic Room Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_ACCOMMODATION_ROOMS.map((room: SampleRoomCategory) => (
            <article
              key={room.id}
              className="group flex flex-col justify-between rounded-xl border border-[#E2DDD2] bg-white overflow-hidden transition-colors duration-200 hover:border-[#C5A059]"
            >
              <div>
                {/* Resilient 4:3 Image Container */}
                <div className="relative aspect-4/3 w-full bg-[#1B3024] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    referrerPolicy="no-referrer"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1A13]/85 via-[#0D1A13]/40 to-transparent px-5 pt-8 pb-3">
                    <p className="text-xs text-[#E4E8E5]">
                      <span>Illustrative Sample Photo</span>
                      <span aria-hidden="true"> · </span>
                      <span>Not Actual Property Footage</span>
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#68726B] mb-2">
                    <span className="font-medium text-[#7E6330]">Sample Category</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-[family-name:var(--font-mono)] tabular-nums">
                      {room.capacityText}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[#14261C] tracking-tight">
                    {room.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#4A524D] leading-relaxed">
                    {room.description}
                  </p>

                  {/* Sample Amenities rendered as clean unboxed prose with · separators */}
                  <div className="mt-5 pt-4 border-t border-[#ECE7DD]">
                    <p className="text-xs font-semibold text-[#14261C] mb-1.5">
                      Illustrative Amenities (Subject to Confirmation):
                    </p>
                    <p className="text-xs text-[#5A635D] leading-relaxed">
                      {room.sampleAmenities.map((amenity, idx) => (
                        <React.Fragment key={amenity}>
                          <span>{amenity}</span>
                          {idx < room.sampleAmenities.length - 1 && (
                            <span aria-hidden="true" className="mx-1.5 text-[#C5A059]">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectRoomForEnquiry(room.title)}
                  className="w-full inline-flex items-center justify-between rounded-md border border-[#14261C] bg-[#14261C] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF8F4] hover:bg-[#1E382A] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Enquire About This Room</span>
                  <ArrowRight className="h-4 w-4 text-[#C5A059]" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
