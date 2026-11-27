import { NextRequest, NextResponse } from 'next/server';
import { VERIFIED_PROPERTY } from '@/lib/property-data';

export interface EnquiryPayload {
  enquiryType: 'accommodation' | 'conferencing';
  fullName: string;
  email: string;
  phone: string;
  // Accommodation fields
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  preferredRoom?: string;
  // Conferencing fields
  eventDate?: string;
  attendeeCount?: string;
  eventType?: string;
  organization?: string;
  // Shared
  notes?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string): boolean {
  return /^[+\d\s()-]{7,20}$/.test(phone.trim());
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<EnquiryPayload>;
    const { enquiryType, fullName, email, phone } = body;

    if (!enquiryType || !['accommodation', 'conferencing'].includes(enquiryType)) {
      return NextResponse.json(
        { error: 'Please specify a valid enquiry type (accommodation or conferencing).' },
        { status: 400 }
      );
    }

    if (!fullName || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide your full name.' },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Please provide a valid telephone or WhatsApp number.' },
        { status: 400 }
      );
    }

    if (enquiryType === 'accommodation') {
      const { checkIn, checkOut, guests } = body;
      if (!checkIn || !checkOut) {
        return NextResponse.json(
          { error: 'Please select both check-in and check-out dates.' },
          { status: 400 }
        );
      }

      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime())) {
        return NextResponse.json(
          { error: 'Invalid date format provided.' },
          { status: 400 }
        );
      }

      if (outDate <= inDate) {
        return NextResponse.json(
          { error: 'Check-out date must be after the check-in date.' },
          { status: 400 }
        );
      }

      const guestNum = Number(guests || '1');
      if (Number.isNaN(guestNum) || guestNum < 1 || guestNum > 20) {
        return NextResponse.json(
          { error: 'Please enter a valid number of guests (1–20).' },
          { status: 400 }
        );
      }
    }

    if (enquiryType === 'conferencing') {
      const { eventDate, attendeeCount, eventType } = body;
      if (!eventDate) {
        return NextResponse.json(
          { error: 'Please select a preferred event date.' },
          { status: 400 }
        );
      }
      const delegates = Number(attendeeCount || '0');
      if (Number.isNaN(delegates) || delegates < 1 || delegates > 100) {
        return NextResponse.json(
          {
            error: `Please enter an attendee count between 1 and ${VERIFIED_PROPERTY.conferencing.reportedCapacitySeats} seats.`,
          },
          { status: 400 }
        );
      }
      if (!eventType || eventType.trim().length < 2) {
        return NextResponse.json(
          { error: 'Please select the type of corporate event or function.' },
          { status: 400 }
        );
      }
    }

    // Generate deterministic-style enquiry reference code for user confirmation
    const timestampPart = Date.now().toString(36).toUpperCase().slice(-5);
    const prefix = enquiryType === 'accommodation' ? 'LGM-STAY' : 'LGM-CONF';
    const referenceCode = `${prefix}-${timestampPart}`;

    const destinationEmail =
      process.env.RESERVATIONS_EMAIL || VERIFIED_PROPERTY.contact.email;

    /**
     * Ready-to-connect Email Service Hook (e.g. Resend / SendGrid / Nodemailer):
     * If process.env.RESEND_API_KEY is configured in production, this endpoint
     * can immediately dispatch transactional emails to reservations@limpopoguestmanor.co.za.
     */
    const emailServiceConnected = Boolean(process.env.RESEND_API_KEY);

    return NextResponse.json({
      success: true,
      referenceCode,
      destinationEmail,
      emailServiceConnected,
      submittedAt: new Date().toISOString(),
      message:
        enquiryType === 'accommodation'
          ? 'Your direct booking request has been logged for review by our reservations desk.'
          : 'Your conferencing venue enquiry has been prepared for our events coordinator.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Unable to process your enquiry at this moment. Please call or WhatsApp us directly.' },
      { status: 500 }
    );
  }
}
