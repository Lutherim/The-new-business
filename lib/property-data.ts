import type { StaticImageData } from 'next/image';
import heroExteriorImg from '@/src/assets/images/hero_manor_exterior_1795795972159.jpg';
import roomSuiteImg from '@/src/assets/images/room_sample_suite_1795795972364.jpg';
import roomExecutiveImg from '@/src/assets/images/room_sample_executive_1795795973757.jpg';
import roomTwinImg from '@/src/assets/images/room_sample_twin_1795795974825.jpg';
import conferenceHallImg from '@/src/assets/images/conference_hall_100_1795795975515.jpg';
import diningLoungeImg from '@/src/assets/images/dining_lounge_broll_1795795975480.jpg';

export const VERIFIED_PROPERTY = {
  name: 'Limpopo Guest Manor',
  conceptStatus: 'Unofficial concept preview',
  address: {
    streetPrimary: '82 Plein Street',
    streetSecondary: '48 Devenish Street',
    district: 'CBD',
    city: 'Polokwane',
    province: 'Limpopo',
    country: 'South Africa',
    fullDisplay: '82 Plein Street / 48 Devenish Street, CBD, Polokwane, Limpopo, South Africa',
  },
  contact: {
    mobileDisplay: '+27 65 556 5858',
    mobileDial: '+27655565858',
    whatsappNumber: '27655565858',
    landlineDisplay: '015 297 1656',
    landlineDial: '+27152971656',
    email: 'reservations@limpopoguestmanor.co.za',
  },
  conferencing: {
    reportedCapacitySeats: 100,
    capacityLabel: 'Up to 100 Delegates (Reported Capacity)',
  },
} as const;

export interface SampleRoomCategory {
  id: string;
  title: string;
  sampleNotice: string;
  capacityText: string;
  maxGuests: number;
  description: string;
  sampleAmenities: string[];
  image: StaticImageData;
  imagePublicPath: string;
  imageAlt: string;
}

export const SAMPLE_ACCOMMODATION_ROOMS: SampleRoomCategory[] = [
  {
    id: 'sample-manor-suite',
    title: 'Sample Category A — Manor King Suite',
    sampleNotice: 'Sample Room Concept · Pending Property Inventory Confirmation',
    capacityText: 'Up to 2 Guests · King Bed Configuration (Sample)',
    maxGuests: 2,
    description:
      'An illustrative suite category designed to showcase how Limpopo Guest Manor’s premier double or king accommodation can be presented once final room specifications and current seasonal tariffs are confirmed by management.',
    sampleAmenities: [
      'En-suite bathroom (Sample)',
      'Dedicated workspace (Sample)',
      'Climate control (Sample)',
      'Complimentary Wi-Fi (Sample)',
    ],
    image: roomSuiteImg,
    imagePublicPath: '/images/room_sample_suite_1795795972364.jpg',
    imageAlt: 'Illustrative concept rendering of a boutique king suite with forest green and warm ivory finishes',
  },
  {
    id: 'sample-executive-room',
    title: 'Sample Category B — Corporate Executive Room',
    sampleNotice: 'Sample Room Concept · Pending Property Inventory Confirmation',
    capacityText: '1–2 Guests · Queen Bed Configuration (Sample)',
    maxGuests: 2,
    description:
      'A business-oriented sample room layout tailored for corporate travellers and government delegates visiting Polokwane CBD. All actual room furnishings, inclusions, and check-in terms are confirmed directly upon enquiry.',
    sampleAmenities: [
      'Ergonomic work desk (Sample)',
      'En-suite shower (Sample)',
      'Refreshment station (Sample)',
      'Quiet courtyard orientation (Sample)',
    ],
    image: roomExecutiveImg,
    imagePublicPath: '/images/room_sample_executive_1795795973757.jpg',
    imageAlt: 'Illustrative concept rendering of an executive guest room with a timber writing desk',
  },
  {
    id: 'sample-twin-room',
    title: 'Sample Category C — Twin Delegate Room',
    sampleNotice: 'Sample Room Concept · Pending Property Inventory Confirmation',
    capacityText: 'Up to 2 Guests · Twin Single Beds (Sample)',
    maxGuests: 2,
    description:
      'An illustrative twin-bed layout suitable for conference delegates or travelling colleagues attending events in Polokwane. Actual bedding configurations and availability are provided directly by the reservations desk.',
    sampleAmenities: [
      'Two single beds (Sample)',
      'Private bathroom (Sample)',
      'Wardrobe storage (Sample)',
      'Direct reception assistance (Sample)',
    ],
    image: roomTwinImg,
    imagePublicPath: '/images/room_sample_twin_1795795974825.jpg',
    imageAlt: 'Illustrative concept rendering of a twin guest bedroom with warm wood and olive accents',
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'accommodation' | 'conferencing' | 'spaces';
  categoryLabel: string;
  caption: string;
  disclosure: string;
  image: StaticImageData;
  imagePublicPath: string;
  aspectRatio: '16:9' | '4:3';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-exterior',
    title: 'Arrival Courtyard & Dusk Architecture',
    category: 'spaces',
    categoryLabel: 'Exterior & Arrival',
    caption:
      'Architectural concept study showing how evening exterior photography of the Plein Street / Devenish Street entrance and gardens can be showcased.',
    disclosure: 'Illustrative Concept Imagery · Not Actual Property Photography',
    image: heroExteriorImg,
    imagePublicPath: '/images/hero_manor_exterior_1795795972159.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'gal-conference',
    title: '100-Seat Corporate Conferencing Venue',
    category: 'conferencing',
    categoryLabel: 'Conferencing & Events',
    caption:
      'Visual representation of a 100-seat corporate seminar and conference layout. Actual seating arrangements and venue facilities are tailored per event enquiry.',
    disclosure: 'Illustrative Concept Imagery · Not Actual Property Photography',
    image: conferenceHallImg,
    imagePublicPath: '/images/conference_hall_100_1795795975515.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'gal-dining',
    title: 'Reception Lounge & Morning Dining Space',
    category: 'spaces',
    categoryLabel: 'Reception & Dining',
    caption:
      'Editorial hospitality concept illustrating a calm reception and dining area for overnight guests and conference attendees.',
    disclosure: 'Illustrative Concept Imagery · Not Actual Property Photography',
    image: diningLoungeImg,
    imagePublicPath: '/images/dining_lounge_broll_1795795975480.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'gal-suite',
    title: 'Sample Manor King Suite Interior',
    category: 'accommodation',
    categoryLabel: 'Accommodation Concept',
    caption:
      'Sample room presentation featuring deep forest green and warm ivory finishes. Replace with verified bedroom photography prior to public launch.',
    disclosure: 'Illustrative Concept Imagery · Not Actual Property Photography',
    image: roomSuiteImg,
    imagePublicPath: '/images/room_sample_suite_1795795972364.jpg',
    aspectRatio: '4:3',
  },
  {
    id: 'gal-executive',
    title: 'Sample Corporate Executive Room',
    category: 'accommodation',
    categoryLabel: 'Accommodation Concept',
    caption:
      'Sample guest room layout emphasizing a dedicated writing desk and restful warm lighting for business travellers in Polokwane CBD.',
    disclosure: 'Illustrative Concept Imagery · Not Actual Property Photography',
    image: roomExecutiveImg,
    imagePublicPath: '/images/room_sample_executive_1795795973757.jpg',
    aspectRatio: '4:3',
  },
  {
    id: 'gal-twin',
    title: 'Sample Twin Delegate Room',
    category: 'accommodation',
    categoryLabel: 'Accommodation Concept',
    caption:
      'Sample twin accommodation card designed for conference groups and shared corporate bookings.',
    disclosure: 'Illustrative Concept Imagery · Not Actual Property Photography',
    image: roomTwinImg,
    imagePublicPath: '/images/room_sample_twin_1795795974825.jpg',
    aspectRatio: '4:3',
  },
];

export interface BRollScene {
  id: string;
  indexNumber: string;
  title: string;
  areaLabel: string;
  durationLabel: string;
  description: string;
  posterImage: StaticImageData;
  posterPublicPath: string;
  shotChecklist: string[];
}

export const BROLL_SCENES: BRollScene[] = [
  {
    id: 'broll-entrance',
    indexNumber: '01',
    title: 'Entrance & Plein / Devenish Street Arrival',
    areaLabel: 'Exterior & Gardens',
    durationLabel: '0:00 – 0:15',
    description:
      'Designed for actual stabilized gimbal footage welcoming guests from 82 Plein Street and 48 Devenish Street into the manor courtyard.',
    posterImage: heroExteriorImg,
    posterPublicPath: '/images/hero_manor_exterior_1795795972159.jpg',
    shotChecklist: [
      'Wide establishing shot of exterior arrival & signage',
      'Secure entrance pathway & garden walkways at golden hour',
    ],
  },
  {
    id: 'broll-reception-dining',
    indexNumber: '02',
    title: 'Reception Welcome & Dining Spaces',
    areaLabel: 'Guest Hospitality',
    durationLabel: '0:15 – 0:30',
    description:
      'Reserved for warm ambient B-roll of the front desk check-in experience, guest lounge seating, and dining room table settings.',
    posterImage: diningLoungeImg,
    posterPublicPath: '/images/dining_lounge_broll_1795795975480.jpg',
    shotChecklist: [
      'Reception desk welcome & lobby details',
      'Natural daylight across dining tables & lounge seating',
    ],
  },
  {
    id: 'broll-bedrooms',
    indexNumber: '03',
    title: 'Guest Bedrooms & Restful Interiors',
    areaLabel: 'Accommodation',
    durationLabel: '0:30 – 0:45',
    description:
      'Structured for slow pan shots across actual guest bedrooms, crisp bedding textures, workspaces, and en-suite bathrooms.',
    posterImage: roomSuiteImg,
    posterPublicPath: '/images/room_sample_suite_1795795972364.jpg',
    shotChecklist: [
      'Slow camera glide across primary guest bedroom categories',
      'Detail shots of lighting, desk area & room finishes',
    ],
  },
  {
    id: 'broll-conferencing',
    indexNumber: '04',
    title: '100-Seat Conference Venue & Event Setup',
    areaLabel: 'Corporate Events',
    durationLabel: '0:45 – 1:00',
    description:
      'Dedicated slot for wide-angle video of the 100-seat conference facility prepared for seminars, workshops, and executive gatherings in Polokwane.',
    posterImage: conferenceHallImg,
    posterPublicPath: '/images/conference_hall_100_1795795975515.jpg',
    shotChecklist: [
      'Full-room perspective showing 100-seat delegate capacity',
      'Speaker staging area & delegate seating configuration',
    ],
  },
];

export const HERO_IMAGE = heroExteriorImg;
export const CONFERENCE_IMAGE = conferenceHallImg;
export const DINING_IMAGE = diningLoungeImg;
