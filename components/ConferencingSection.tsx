'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  CheckCircle2,
  Send,
  AlertCircle,
  Loader2,
  MessageSquare,
  Mail,
  RotateCcw,
} from 'lucide-react';
import { CONFERENCE_IMAGE, VERIFIED_PROPERTY } from '@/lib/property-data';

interface ConferencingSectionProps {
  defaultEventDate: string;
}

interface ConferenceSuccess {
  referenceCode: string;
  summary: {
    fullName: string;
    organization: string;
    email: string;
    phone: string;
    eventDate: string;
    attendeeCount: string;
    eventType: string;
    notes: string;
  };
}

export default function ConferencingSection({ defaultEventDate }: ConferencingSectionProps) {
  const [eventDate, setEventDate] = useState(defaultEventDate);
  const [attendeeCount, setAttendeeCount] = useState('45');
  const [eventType, setEventType] = useState('Corporate Seminar / Conference');
  const [organization, setOrganization] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState<ConferenceSuccess | null>(null);

  const handleConferenceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!eventDate) {
      setErrorMessage('Please select a preferred event date.');
      return;
    }

    const attendees = Number(attendeeCount);
    if (
      Number.isNaN(attendees) ||
      attendees < 1 ||
      attendees > VERIFIED_PROPERTY.conferencing.reportedCapacitySeats
    ) {
      setErrorMessage(
        `Please enter an attendee count between 1 and ${VERIFIED_PROPERTY.conferencing.reportedCapacitySeats} seats.`
      );
      return;
    }

    if (fullName.trim().length < 2) {
      setErrorMessage('Please enter the primary contact person’s full name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid work or personal email address.');
      return;
    }

    if (!/^[+\d\s()-]{7,20}$/.test(phone.trim())) {
      setErrorMessage('Please enter a valid contact telephone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enquiryType: 'conferencing',
          eventDate,
          attendeeCount,
          eventType,
          organization: organization.trim(),
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          notes: notes.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(
          data.error || 'Unable to submit your conference enquiry. Please verify your inputs.'
        );
        setIsSubmitting(false);
        return;
      }

      setSubmissionSuccess({
        referenceCode: data.referenceCode,
        summary: {
          fullName: fullName.trim(),
          organization: organization.trim(),
          email: email.trim(),
          phone: phone.trim(),
          eventDate,
          attendeeCount,
          eventType,
          notes: notes.trim(),
        },
      });
    } catch {
      setErrorMessage(
        'Network error while submitting request. Please call or WhatsApp our events team directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildConferenceWhatsApp = (
    summary: ConferenceSuccess['summary'],
    refCode: string
  ) => {
    const text = [
      `Hello ${VERIFIED_PROPERTY.name} Events Desk,`,
      `I would like to enquire about conferencing venue availability (Ref: ${refCode}):`,
      `• Contact: ${summary.fullName}${summary.organization ? ` (${summary.organization})` : ''}`,
      `• Event Date: ${summary.eventDate}`,
      `• Estimated Delegates: ${summary.attendeeCount} seats`,
      `• Event Type: ${summary.eventType}`,
      `• Email: ${summary.email}`,
      `• Phone: ${summary.phone}`,
      summary.notes ? `• Requirements: ${summary.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${VERIFIED_PROPERTY.contact.whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;
  };

  const buildConferenceMailto = (
    summary: ConferenceSuccess['summary'],
    refCode: string
  ) => {
    const subject = `Conferencing Enquiry (${refCode}) - ${summary.eventDate} (${summary.attendeeCount} Delegates)`;
    const body = [
      `Dear ${VERIFIED_PROPERTY.name} Conferencing Coordinator,`,
      '',
      'Please provide venue availability and a tailored quotation for the following corporate event:',
      '',
      `Reference Code: ${refCode}`,
      `Contact Person: ${summary.fullName}`,
      summary.organization ? `Organization / Department: ${summary.organization}` : '',
      `Preferred Event Date: ${summary.eventDate}`,
      `Estimated Attendee Count: ${summary.attendeeCount} delegates`,
      `Event Format: ${summary.eventType}`,
      `Telephone: ${summary.phone}`,
      `Email: ${summary.email}`,
      summary.notes ? `Specific Layout / Catering / Technical Notes: ${summary.notes}` : '',
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

  return (
    <section
      id="conferencing"
      aria-labelledby="conferencing-heading"
      className="py-20 lg:py-28 bg-[#12231A] text-[#FAF8F4] border-b border-[#243B2E]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-12 border-b border-[#253D30]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#C5A059] mb-3">
              03. Corporate Events &amp; Seminars · Polokwane CBD
            </p>
            <h2
              id="conferencing-heading"
              className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#FAF8F4]"
              style={{ textWrap: 'balance' }}
            >
              Conferencing for Up to 100 Delegates in Central Polokwane.
            </h2>
          </div>

          <div className="max-w-md text-sm sm:text-base text-[#C6D0C9] leading-relaxed">
            Positioned at 82 Plein Street / 48 Devenish Street, {VERIFIED_PROPERTY.name} offers a
            reported{' '}
            <span className="font-[family-name:var(--font-mono)] font-semibold text-[#FAF8F4] tabular-nums">
              100-seat
            </span>{' '}
            conferencing capacity for regional workshops, government briefings, and corporate
            meetings.
          </div>
        </div>

        {/* 2-Column Split: Venue Visual & Highlights (Left) + Conferencing Enquiry Form (Right) */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Visual Showcase & Venue Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="rounded-xl border border-[#284234] bg-[#162B20] overflow-hidden">
              <div className="relative aspect-16/9 w-full bg-[#0D1A13]">
                <Image
                  src={CONFERENCE_IMAGE}
                  alt="Illustrative concept rendering of a 100-seat corporate conference venue"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1A13]/90 via-[#0D1A13]/45 to-transparent px-5 pt-10 pb-3.5">
                  <p className="text-xs text-[#D5DDD8]">
                    <span>Illustrative Conference Venue Concept</span>
                    <span aria-hidden="true"> · </span>
                    <span className="font-[family-name:var(--font-mono)] tabular-nums">
                      Reported Capacity: 100 Seats
                    </span>
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-6">
                <div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[#FAF8F4]">
                    Venue Highlights &amp; Bespoke Event Planning
                  </h3>
                  <p className="mt-2 text-sm text-[#C2CCC6] leading-relaxed">
                    Every corporate gathering has distinct seating, timing, and hospitality
                    requirements. Rather than publishing generic package assumptions, our events
                    desk prepares tailored proposals based on your exact brief.
                  </p>
                </div>

                {/* Clean Editorial Numbered Capabilities */}
                <div className="space-y-4 border-t border-[#263E30] pt-5">
                  <div>
                    <h4 className="text-sm font-semibold text-[#C5A059]">
                      01. Up to 100-Seat Reported Delegate Capacity
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#C2CCC6] leading-relaxed">
                      Accommodates up to 100 attendees depending on your preferred seating layout
                      (cinema, classroom, boardroom, or banquet configuration confirmed on request).
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#C5A059]">
                      02. Accessible Polokwane CBD Location
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#C2CCC6] leading-relaxed">
                      Conveniently reachable from provincial government departments, commercial
                      offices, and main arterial routes via 82 Plein Street and 48 Devenish Street.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#C5A059]">
                      03. Custom Technical, Refreshment &amp; Accommodation Quotes
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#C2CCC6] leading-relaxed">
                      Audiovisual setup, catering arrangements, and multi-day delegate overnight
                      accommodation packages are quoted transparently per event enquiry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated Conferencing Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="h-full rounded-xl border border-[#2B4637] bg-[#162B20] p-6 sm:p-8 flex flex-col justify-between">
              {submissionSuccess ? (
                <div role="status" aria-live="polite" className="space-y-6 my-auto">
                  <div className="flex items-start gap-3.5 border-b border-[#284234] pb-5">
                    <CheckCircle2 className="h-7 w-7 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-[#C5A059]">
                        Conferencing Enquiry Logged · Reference{' '}
                        <span className="font-[family-name:var(--font-mono)] font-semibold text-[#FAF8F4] tabular-nums">
                          {submissionSuccess.referenceCode}
                        </span>
                      </p>
                      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-semibold text-[#FAF8F4] mt-1">
                        Event Proposal Request Received
                      </h3>
                      <p className="mt-1.5 text-sm text-[#C2CCC6]">
                        Thank you, {submissionSuccess.summary.fullName}. Our events coordinator will
                        review venue availability for your requested date and prepare a formal
                        quotation.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#284234] bg-[#12231A] p-4 sm:p-5 text-xs sm:text-sm space-y-2.5">
                    <div className="flex justify-between gap-4 border-b border-[#22382C] pb-2">
                      <span className="text-[#9BA8A0]">Reference Code</span>
                      <span className="font-[family-name:var(--font-mono)] font-semibold text-[#C5A059] tabular-nums">
                        {submissionSuccess.referenceCode}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-[#22382C] pb-2">
                      <span className="text-[#9BA8A0]">Preferred Event Date</span>
                      <span className="font-[family-name:var(--font-mono)] text-[#FAF8F4] tabular-nums">
                        {submissionSuccess.summary.eventDate}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-[#22382C] pb-2">
                      <span className="text-[#9BA8A0]">Estimated Delegates</span>
                      <span className="font-[family-name:var(--font-mono)] text-[#FAF8F4] tabular-nums">
                        {submissionSuccess.summary.attendeeCount} Seats
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-[#22382C] pb-2">
                      <span className="text-[#9BA8A0]">Event Type</span>
                      <span className="text-[#FAF8F4] text-right">
                        {submissionSuccess.summary.eventType}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#9BA8A0]">Contact</span>
                      <span className="text-[#FAF8F4] text-right">
                        {submissionSuccess.summary.email} · {submissionSuccess.summary.phone}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-medium text-[#D5DDD8]">
                      Send your event brief directly to our conferencing coordinator:
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={buildConferenceWhatsApp(
                          submissionSuccess.summary,
                          submissionSuccess.referenceCode
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C5A059] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#12231A] hover:bg-[#D4B26E] transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Send Event Brief via WhatsApp</span>
                      </a>

                      <a
                        href={buildConferenceMailto(
                          submissionSuccess.summary,
                          submissionSuccess.referenceCode
                        )}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-[#FAF8F4]/30 bg-transparent px-4 py-2.5 text-xs sm:text-sm font-medium text-[#FAF8F4] hover:bg-[#FAF8F4]/10 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Mail className="h-4 w-4 text-[#C5A059]" />
                        <span>Open in Email Client</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#284234]">
                    <button
                      type="button"
                      onClick={() => setSubmissionSuccess(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A9B5AE] hover:text-[#FAF8F4] cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Submit another conferencing enquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleConferenceSubmit} noValidate className="space-y-4">
                  <div className="border-b border-[#284234] pb-4">
                    <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-semibold text-[#FAF8F4]">
                      Request a Conferencing Proposal
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#B8C4BC]">
                      Enquire about venue availability, seating layouts, and group rates for up to
                      100 delegates.
                    </p>
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-md border border-[#E07A6B] bg-[#3A1B18] p-3.5 text-xs sm:text-sm text-[#FADCD8]"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-[#E07A6B]" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="conf-date"
                        className="block text-xs font-medium text-[#D5DDD8] mb-1.5"
                      >
                        Preferred Event Date *
                      </label>
                      <input
                        id="conf-date"
                        type="date"
                        required
                        min={defaultEventDate}
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full rounded-md border border-[#31503F] bg-[#12231A] px-3.5 py-2.5 text-sm text-[#FAF8F4] font-[family-name:var(--font-mono)] tabular-nums focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="conf-attendees"
                        className="block text-xs font-medium text-[#D5DDD8] mb-1.5"
                      >
                        Estimated Attendee Count (Max 100) *
                      </label>
                      <input
                        id="conf-attendees"
                        type="number"
                        required
                        min={1}
                        max={100}
                        value={attendeeCount}
                        onChange={(e) => setAttendeeCount(e.target.value)}
                        className="w-full rounded-md border border-[#31503F] bg-[#12231A] px-3.5 py-2.5 text-sm text-[#FAF8F4] font-[family-name:var(--font-mono)] tabular-nums focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="conf-type"
                        className="block text-xs font-medium text-[#D5DDD8] mb-1.5"
                      >
                        Event Type *
                      </label>
                      <select
                        id="conf-type"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full rounded-md border border-[#31503F] bg-[#12231A] px-3 py-2.5 text-sm text-[#FAF8F4] focus:border-[#C5A059] focus:outline-none"
                      >
                        <option value="Corporate Seminar / Conference">
                          Corporate Seminar / Conference
                        </option>
                        <option value="Strategy & Training Workshop">
                          Strategy &amp; Training Workshop
                        </option>
                        <option value="Government / Departmental Briefing">
                          Government / Departmental Briefing
                        </option>
                        <option value="Executive Board Meeting">Executive Board Meeting</option>
                        <option value="Private Function / Banquet">
                          Private Function / Banquet
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="conf-org"
                        className="block text-xs font-medium text-[#D5DDD8] mb-1.5"
                      >
                        Company / Organization
                      </label>
                      <input
                        id="conf-org"
                        type="text"
                        placeholder="Organization or Department"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="w-full rounded-md border border-[#31503F] bg-[#12231A] px-3.5 py-2.5 text-sm text-[#FAF8F4] placeholder:text-[#6E8276] focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="conf-name"
                        className="block text-xs font-medium text-[#D5DDD8] mb-1.5"
                      >
                        Contact Person Full Name *
                      </label>
                      <input
                        id="conf-name"
                        type="text"
                        required
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-md border border-[#31503F] bg-[#12231A] px-3.5 py-2.5 text-sm text-[#FAF8F4] placeholder:text-[#6E8276] focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="conf-email"
                        className="block text-xs font-medium text-[#D5DDD8] mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="conf-email"
                        type="email"
                        required
                        placeholder="events@company.co.za"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-[#31503F] bg-[#12231A] px-3.5 py-2.5 text-sm text-[#FAF8F4] placeholder:text-[#6E8276] focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="conf-phone"
                        className="block text-xs font-medium text-[#D5DDD8] mb-1.5"
                      >
                        Telephone / Mobile *
                      </label>
                      <input
                        id="conf-phone"
                        type="tel"
                        required
                        placeholder="+27 65 556 5858"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-md border border-[#31503F] bg-[#12231A] px-3.5 py-2.5 text-sm text-[#FAF8F4] font-[family-name:var(--font-mono)] tabular-nums placeholder:text-[#6E8276] focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="conf-notes"
                      className="block text-xs font-medium text-[#D5DDD8] mb-1.5"
                    >
                      Seating Layout, Catering, or Overnight Room Requirements
                    </label>
                    <textarea
                      id="conf-notes"
                      rows={3}
                      placeholder="Specify preferred seating configuration, refreshment requirements, or overnight accommodation needed for delegates..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-md border border-[#31503F] bg-[#12231A] px-3.5 py-2.5 text-sm text-[#FAF8F4] placeholder:text-[#6E8276] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#C5A059] px-6 py-3 text-sm font-semibold text-[#12231A] hover:bg-[#D4B26E] disabled:opacity-60 transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Submitting Conference Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Request Conferencing Quote</span>
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
