'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import {
  SAMPLE_ACCOMMODATION_ROOMS,
  VERIFIED_PROPERTY,
} from '@/lib/property-data';
import type { QuickBookingPrefill } from '@/components/HeroSection';

interface BookingEnquirySectionProps {
  draft: QuickBookingPrefill;
  onUpdateDraft: (patch: Partial<QuickBookingPrefill>) => void;
  defaultCheckIn: string;
}

interface SubmissionSuccess {
  referenceCode: string;
  submittedAt: string;
  summary: {
    fullName: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    preferredRoom: string;
    notes: string;
  };
}

export default function BookingEnquirySection({
  draft,
  onUpdateDraft,
  defaultCheckIn,
}: BookingEnquirySectionProps) {
  const { checkIn, checkOut, guests, preferredRoom } = draft;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState<SubmissionSuccess | null>(null);

  const calculateNights = (): number => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!checkIn || !checkOut) {
      setErrorMessage('Please select both check-in and check-out dates.');
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setErrorMessage('Check-out date must be after your check-in date.');
      return;
    }

    if (fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!/^[+\d\s()-]{7,20}$/.test(phone.trim())) {
      setErrorMessage('Please enter a valid telephone or WhatsApp contact number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enquiryType: 'accommodation',
          checkIn,
          checkOut,
          guests,
          preferredRoom,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          notes: notes.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(
          data.error || 'Could not validate your booking request. Please check your details.'
        );
        setIsSubmitting(false);
        return;
      }

      setSubmissionSuccess({
        referenceCode: data.referenceCode,
        submittedAt: data.submittedAt,
        summary: {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          checkIn,
          checkOut,
          guests,
          preferredRoom,
          notes: notes.trim(),
        },
      });
    } catch {
      setErrorMessage(
        'Network error while submitting request. Please use the direct WhatsApp or telephone option below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildWhatsAppLink = (summary: SubmissionSuccess['summary'], refCode: string) => {
    const text = [
      `Hello ${VERIFIED_PROPERTY.name} Reservations,`,
      `I would like to request availability for an overnight stay (Ref: ${refCode}):`,
      `• Name: ${summary.fullName}`,
      `• Check-In: ${summary.checkIn}`,
      `• Check-Out: ${summary.checkOut}`,
      `• Guests: ${summary.guests}`,
      `• Room Preference: ${summary.preferredRoom}`,
      `• Email: ${summary.email}`,
      `• Phone: ${summary.phone}`,
      summary.notes ? `• Notes: ${summary.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${VERIFIED_PROPERTY.contact.whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;
  };

  const buildMailtoLink = (summary: SubmissionSuccess['summary'], refCode: string) => {
    const subject = `Accommodation Booking Enquiry (${refCode}) - ${summary.fullName}`;
    const body = [
      `Dear ${VERIFIED_PROPERTY.name} Reservations Team,`,
      '',
      `Please advise on room availability and direct rates for the following stay request:`,
      '',
      `Reference Code: ${refCode}`,
      `Guest Name: ${summary.fullName}`,
      `Check-In Date: ${summary.checkIn}`,
      `Check-Out Date: ${summary.checkOut}`,
      `Number of Guests: ${summary.guests}`,
      `Room Preference: ${summary.preferredRoom}`,
      `Contact Phone: ${summary.phone}`,
      `Contact Email: ${summary.email}`,
      summary.notes ? `Special Requests / Notes: ${summary.notes}` : '',
      '',
      'Kind regards,',
      summary.fullName,
    ]
      .filter(Boolean)
      .join('\n');

    return `mailto:${VERIFIED_PROPERTY.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const nightsCount = calculateNights();

  return (
    <section
      id="booking-enquiry"
      aria-labelledby="booking-enquiry-heading"
      className="py-20 lg:py-24 bg-[#F3EFE6] text-[#1C211E] border-b border-[#E2DDD2]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Explanation Column */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wide text-[#7E6330] mb-3">
              02. Direct Reservations Desk
            </p>
            <h2
              id="booking-enquiry-heading"
              className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-semibold tracking-tight text-[#14261C]"
              style={{ textWrap: 'balance' }}
            >
              Request Your Direct Accommodation Quote.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#4A524D] leading-relaxed">
              Submit your preferred dates and guest details below. Because this is a{' '}
              <strong className="font-semibold text-[#14261C]">
                direct booking enquiry request
              </strong>{' '}
              rather than an automated online payment gateway, our Polokwane reservations team will
              personally verify room availability and reply with an official quotation.
            </p>

            {/* How It Works Steps */}
            <div className="mt-8 space-y-5 border-t border-[#DCD6C8] pt-6">
              <div>
                <h3 className="text-sm font-semibold text-[#14261C]">
                  01. Submit Dates &amp; Guest Count
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#565F59]">
                  Select your check-in and check-out dates along with a sample room category or ask
                  our team to recommend the best available option.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#14261C]">
                  02. Receive Direct Availability &amp; Tariff Confirmation
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#565F59]">
                  Our desk confirms live room availability, current nightly rates, and check-in
                  arrangements via email, phone, or WhatsApp.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#14261C]">
                  03. Instant Direct Follow-Up Option
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#565F59]">
                  Once submitted, you also receive a pre-formatted enquiry reference that can be
                  sent directly to our WhatsApp line or email in one click.
                </p>
              </div>
            </div>

            {/* Direct Contact Assurance Box */}
            <div className="mt-8 rounded-lg border border-[#DCD6C8] bg-[#FAF8F4] p-5">
              <p className="text-xs font-semibold text-[#14261C]">
                Prefer to speak with reception immediately?
              </p>
              <div className="mt-3 flex flex-col gap-2 text-xs sm:text-sm text-[#3A423D]">
                <a
                  href={`tel:${VERIFIED_PROPERTY.contact.mobileDial}`}
                  className="inline-flex items-center gap-2 hover:text-[#7E6330] font-[family-name:var(--font-mono)] tabular-nums"
                >
                  <Phone className="h-4 w-4 text-[#7E6330]" />
                  <span>{VERIFIED_PROPERTY.contact.mobileDisplay} (Mobile / WhatsApp)</span>
                </a>
                <a
                  href={`tel:${VERIFIED_PROPERTY.contact.landlineDial}`}
                  className="inline-flex items-center gap-2 hover:text-[#7E6330] font-[family-name:var(--font-mono)] tabular-nums"
                >
                  <Phone className="h-4 w-4 text-[#7E6330]" />
                  <span>{VERIFIED_PROPERTY.contact.landlineDisplay} (Reception Landline)</span>
                </a>
                <a
                  href={`mailto:${VERIFIED_PROPERTY.contact.email}`}
                  className="inline-flex items-center gap-2 hover:text-[#7E6330] break-all"
                >
                  <Mail className="h-4 w-4 text-[#7E6330] shrink-0" />
                  <span>{VERIFIED_PROPERTY.contact.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form / Confirmation Column */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#DCD6C8] bg-white p-6 sm:p-8">
              {submissionSuccess ? (
                <div role="status" aria-live="polite" className="space-y-6">
                  <div className="flex items-start gap-3.5 border-b border-[#ECE7DD] pb-5">
                    <CheckCircle2 className="h-7 w-7 text-[#1E5E3A] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-[#7E6330]">
                        Booking Request Logged · Reference{' '}
                        <span className="font-[family-name:var(--font-mono)] font-semibold text-[#14261C] tabular-nums">
                          {submissionSuccess.referenceCode}
                        </span>
                      </p>
                      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-semibold text-[#14261C] mt-1">
                        Thank You, {submissionSuccess.summary.fullName}.
                      </h3>
                      <p className="mt-1.5 text-sm text-[#4A524D]">
                        Your accommodation enquiry has been prepared. Please note this is a{' '}
                        <strong className="font-semibold text-[#14261C]">booking request</strong> and
                        is subject to availability confirmation from our Polokwane reservations
                        desk.
                      </p>
                    </div>
                  </div>

                  {/* Summary Table */}
                  <div className="rounded-lg border border-[#E5E0D5] bg-[#FAF8F4] p-4 sm:p-5 text-xs sm:text-sm space-y-2.5">
                    <div className="flex justify-between gap-4 border-b border-[#E5E0D5] pb-2">
                      <span className="text-[#5C6660]">Enquiry Reference</span>
                      <span className="font-[family-name:var(--font-mono)] font-semibold text-[#14261C] tabular-nums">
                        {submissionSuccess.referenceCode}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-[#E5E0D5] pb-2">
                      <span className="text-[#5C6660]">Requested Dates</span>
                      <span className="font-[family-name:var(--font-mono)] text-[#14261C] tabular-nums">
                        {submissionSuccess.summary.checkIn} → {submissionSuccess.summary.checkOut}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-[#E5E0D5] pb-2">
                      <span className="text-[#5C6660]">Guests</span>
                      <span className="font-[family-name:var(--font-mono)] text-[#14261C] tabular-nums">
                        {submissionSuccess.summary.guests}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-[#E5E0D5] pb-2">
                      <span className="text-[#5C6660]">Preferred Category</span>
                      <span className="font-medium text-[#14261C] text-right">
                        {submissionSuccess.summary.preferredRoom}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#5C6660]">Contact Details</span>
                      <span className="text-[#14261C] text-right">
                        {submissionSuccess.summary.email} · {submissionSuccess.summary.phone}
                      </span>
                    </div>
                  </div>

                  {/* Direct Instant Dispatch Options */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-[#14261C]">
                      Expedite your response by sending your reference directly via WhatsApp or
                      Email:
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={buildWhatsAppLink(
                          submissionSuccess.summary,
                          submissionSuccess.referenceCode
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#14261C] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF8F4] hover:bg-[#1E382A] transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageSquare className="h-4 w-4 text-[#C5A059]" />
                        <span>Send via WhatsApp ({VERIFIED_PROPERTY.contact.mobileDisplay})</span>
                      </a>

                      <a
                        href={buildMailtoLink(
                          submissionSuccess.summary,
                          submissionSuccess.referenceCode
                        )}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-[#14261C] bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#14261C] hover:bg-[#F3EFE6] transition-colors whitespace-nowrap shrink-0"
                      >
                        <Mail className="h-4 w-4 text-[#7E6330]" />
                        <span>Open in Email Client</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#ECE7DD]">
                    <button
                      type="button"
                      onClick={() => setSubmissionSuccess(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5C6660] hover:text-[#14261C] cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Submit another accommodation enquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ECE7DD] pb-4">
                    <div>
                      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[#14261C]">
                        Direct Stay Enquiry Form
                      </h3>
                      <p className="text-xs text-[#5C6660]">
                        All fields marked with * are required. No payment is taken online.
                      </p>
                    </div>
                    {nightsCount > 0 && (
                      <span className="text-xs font-medium text-[#7E6330] font-[family-name:var(--font-mono)] tabular-nums">
                        {nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'} Selected
                      </span>
                    )}
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-md border border-[#D98276] bg-[#FDF3F2] p-3.5 text-xs sm:text-sm text-[#8C2D23]"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Dates & Guests Grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="booking-checkin"
                        className="block text-xs font-semibold text-[#14261C] mb-1.5"
                      >
                        Check-In Date *
                      </label>
                      <input
                        id="booking-checkin"
                        type="date"
                        required
                        min={defaultCheckIn}
                        value={checkIn}
                        onChange={(e) => onUpdateDraft({ checkIn: e.target.value })}
                        className="w-full rounded-md border border-[#CFC8B9] bg-[#FAF8F4] px-3 py-2 text-sm text-[#14261C] font-[family-name:var(--font-mono)] tabular-nums focus:border-[#14261C] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-checkout"
                        className="block text-xs font-semibold text-[#14261C] mb-1.5"
                      >
                        Check-Out Date *
                      </label>
                      <input
                        id="booking-checkout"
                        type="date"
                        required
                        min={checkIn || defaultCheckIn}
                        value={checkOut}
                        onChange={(e) => onUpdateDraft({ checkOut: e.target.value })}
                        className="w-full rounded-md border border-[#CFC8B9] bg-[#FAF8F4] px-3 py-2 text-sm text-[#14261C] font-[family-name:var(--font-mono)] tabular-nums focus:border-[#14261C] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-guests"
                        className="block text-xs font-semibold text-[#14261C] mb-1.5"
                      >
                        Number of Guests *
                      </label>
                      <select
                        id="booking-guests"
                        value={guests}
                        onChange={(e) => onUpdateDraft({ guests: e.target.value })}
                        className="w-full rounded-md border border-[#CFC8B9] bg-[#FAF8F4] px-3 py-2 text-sm text-[#14261C] font-[family-name:var(--font-mono)] tabular-nums focus:border-[#14261C] focus:bg-white focus:outline-none"
                      >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6+ Guests (Group Booking)</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Room Category */}
                  <div>
                    <label
                      htmlFor="booking-room"
                      className="block text-xs font-semibold text-[#14261C] mb-1.5"
                    >
                      Preferred Room Category (Sample Selection) *
                    </label>
                    <select
                      id="booking-room"
                      value={preferredRoom}
                      onChange={(e) => onUpdateDraft({ preferredRoom: e.target.value })}
                      className="w-full rounded-md border border-[#CFC8B9] bg-[#FAF8F4] px-3 py-2.5 text-sm text-[#14261C] focus:border-[#14261C] focus:bg-white focus:outline-none"
                    >
                      {SAMPLE_ACCOMMODATION_ROOMS.map((room) => (
                        <option key={room.id} value={room.title}>
                          {room.title} ({room.capacityText})
                        </option>
                      ))}
                      <option value="General Room Enquiry — Advise Available Options">
                        General Room Enquiry — Please advise on available rooms &amp; rates
                      </option>
                    </select>
                  </div>

                  {/* Guest Contact Details */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="booking-name"
                        className="block text-xs font-semibold text-[#14261C] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        placeholder="e.g. Thabo Mokoena"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-md border border-[#CFC8B9] bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#14261C] placeholder:text-[#8E9691] focus:border-[#14261C] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-email"
                        className="block text-xs font-semibold text-[#14261C] mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        required
                        placeholder="name@company.co.za"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-[#CFC8B9] bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#14261C] placeholder:text-[#8E9691] focus:border-[#14261C] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-semibold text-[#14261C] mb-1.5"
                      >
                        Telephone / WhatsApp Number *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        placeholder="+27 82 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-md border border-[#CFC8B9] bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#14261C] font-[family-name:var(--font-mono)] tabular-nums placeholder:text-[#8E9691] focus:border-[#14261C] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Optional Special Requests */}
                  <div>
                    <label
                      htmlFor="booking-notes"
                      className="block text-xs font-semibold text-[#14261C] mb-1.5"
                    >
                      Special Requests or Corporate Billing Notes (Optional)
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={3}
                      placeholder="Let us know your estimated arrival time, multiple room requirements, or company invoice details..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-md border border-[#CFC8B9] bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#14261C] placeholder:text-[#8E9691] focus:border-[#14261C] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-xs text-[#5C6660]">
                      Enquiries are routed to{' '}
                      <span className="font-medium text-[#14261C]">
                        {VERIFIED_PROPERTY.contact.email}
                      </span>
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-[#14261C] px-6 py-3 text-sm font-semibold text-[#FAF8F4] hover:bg-[#1E382A] disabled:opacity-60 transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-[#C5A059]" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 text-[#C5A059]" />
                          <span>Send Booking Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
