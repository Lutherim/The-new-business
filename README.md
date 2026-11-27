# Limpopo Guest Manor — Official Website Concept Preview

A bespoke, conversion-focused hospitality website built for **Limpopo Guest Manor** in Polokwane CBD, Limpopo, South Africa.

> **Concept Preview & Content Integrity Notice:**
> This project is an **unofficial concept preview** (`noindex, nofollow`). It uses only verified contact and capacity details supplied in the property brief and clearly labels illustrative sample room categories and concept photography so visitors are never misled.

---

## Verified Property Details Used

- **Establishment:** Limpopo Guest Manor
- **Address:** 82 Plein Street / 48 Devenish Street, CBD, Polokwane, Limpopo, South Africa
- **Telephone:** +27 65 556 5858 / 015 297 1656
- **Email:** reservations@limpopoguestmanor.co.za
- **Conferencing Capacity:** Up to 100 delegates (reported capacity)

*(Note: Unverified reference items from the prospect brief—such as a 4-star grading, 4.1 Google rating from 273 reviews, or indicative R1,627 nightly rate—are treated strictly as unverified internal reference context and are not published as guaranteed factual claims.)*

---

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Typography:** Cormorant Garamond (Display Serif), Plus Jakarta Sans (Body & UI), JetBrains Mono (Tabular Numerals)
- **Icons:** Lucide React
- **Animations:** Motion (`motion/react`) with `prefers-reduced-motion` support

---

## Local Installation & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Copy `.env.example` to `.env.local` and adjust any optional variables:
   ```bash
   cp .env.example .env.local
   ```

3. **Run the development server (port 3000):**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description |
| :--- | :--- |
| `RESERVATIONS_EMAIL` | Destination email for booking & conference enquiries (defaults to `reservations@limpopoguestmanor.co.za`). |
| `RESEND_API_KEY` | Optional API key to enable live email dispatch inside `app/api/enquiry/route.ts`. |
| `NEXT_PUBLIC_PROPERTY_VIDEO_URL` | Optional path or URL to an actual property MP4 B-roll video file. |
| `NEXT_PUBLIC_CONFIRMED_MAP_EMBED_URL` | Optional confirmed Google Maps embed URL once the exact entrance pin (82 Plein Street or 48 Devenish Street) is verified. |

---

## Connecting Live Email Delivery

All booking and conferencing enquiries submit to `POST /api/enquiry` (`app/api/enquiry/route.ts`).
To connect live email notifications (e.g., via Resend, Postmark, or Nodemailer):
1. Add your `RESEND_API_KEY` to Vercel Environment Variables.
2. Uncomment or enable the email dispatch block in `app/api/enquiry/route.ts`.

---

## Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add any optional environment variables from `.env.example`.
4. Click **Deploy**. Next.js App Router and image optimization work out of the box on Vercel.
5. **Before going live as the official production domain:**
   - Replace the sample room categories and illustrative photography in `lib/property-data.ts` with verified property photography and actual room types.
   - Remove the `robots: { index: false, follow: false }` rule in `app/layout.tsx` once approved by management.
