'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Video,
  Upload,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  BROLL_SCENES,
  GALLERY_ITEMS,
  VERIFIED_PROPERTY,
  type GalleryItem,
} from '@/lib/property-data';

interface GalleryAndVideoSectionProps {
  onNavigateToBooking: () => void;
}

export default function GalleryAndVideoSection({
  onNavigateToBooking,
}: GalleryAndVideoSectionProps) {
  // B-Roll Showcase State
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlayingBroll, setIsPlayingBroll] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [customVideoUrl, setCustomVideoUrl] = useState<string>(
    process.env.NEXT_PUBLIC_PROPERTY_VIDEO_URL || ''
  );
  const [customVideoName, setCustomVideoName] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Gallery Filter & Lightbox State
  const [activeFilter, setActiveFilter] = useState<'all' | 'accommodation' | 'conferencing' | 'spaces'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeScene = BROLL_SCENES[activeSceneIndex];

  const filteredGallery = GALLERY_ITEMS.filter((item) =>
    activeFilter === 'all' ? true : item.category === activeFilter
  );

  // Auto-advance B-roll storyboard chapter when playing (if no custom MP4 is loaded)
  useEffect(() => {
    if (!isPlayingBroll || customVideoUrl) return;
    const timer = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % BROLL_SCENES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPlayingBroll, customVideoUrl]);

  // Handle custom local MP4 file preview for testing B-roll slot
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setCustomVideoUrl(objectUrl);
    setCustomVideoName(file.name);
    setIsPlayingBroll(true);
  };

  const toggleVideoPlayback = () => {
    if (customVideoUrl && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlayingBroll(true);
      } else {
        videoRef.current.pause();
        setIsPlayingBroll(false);
      }
    } else {
      setIsPlayingBroll((prev) => !prev);
    }
  };

  // Lightbox Keyboard Navigation
  const handlePrevLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredGallery.length) % filteredGallery.length;
    });
  }, [filteredGallery.length]);

  const handleNextLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredGallery.length;
    });
  }, [filteredGallery.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrevLightbox();
      if (e.key === 'ArrowRight') handleNextLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handlePrevLightbox, handleNextLightbox]);

  const currentLightboxItem: GalleryItem | null =
    lightboxIndex !== null ? filteredGallery[lightboxIndex] || null : null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="py-20 lg:py-28 bg-[#FAF8F4] text-[#1C211E] border-b border-[#E5E0D5]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Part 1: Cinematic Property Video & B-Roll Showcase */}
        <div className="pb-20 border-b border-[#E5E0D5]">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#7E6330] mb-3">
                04. Cinematic B-Roll &amp; Property Video Architecture
              </p>
              <h2
                id="gallery-heading"
                className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#14261C]"
                style={{ textWrap: 'balance' }}
              >
                Visual Walkthrough &amp; B-Roll Reel Support.
              </h2>
            </div>

            <div className="max-w-md text-sm text-[#4A524D] leading-relaxed">
              Engineered to host actual MP4 footage of {VERIFIED_PROPERTY.name}’s entrance,
              bedrooms, reception, dining spaces, and 100-seat conference venue—complete with
              poster frames and reduced-motion fallbacks.
            </div>
          </div>

          {/* Video Player & 4-Scene Chapter Selector */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
            {/* Main 16:9 Cinema Stage */}
            <div className="lg:col-span-8 flex flex-col justify-between rounded-xl border border-[#DCD6C8] bg-[#12231A] text-[#FAF8F4] overflow-hidden">
              <div className="relative aspect-16/9 w-full bg-[#0D1A13] overflow-hidden">
                {customVideoUrl ? (
                  <video
                    ref={videoRef}
                    src={customVideoUrl}
                    poster={activeScene.posterPublicPath}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onPlay={() => setIsPlayingBroll(true)}
                    onPause={() => setIsPlayingBroll(false)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className={`relative h-full w-full transition-transform duration-1000 ease-out ${
                      isPlayingBroll ? 'motion-safe:scale-105' : 'scale-100'
                    }`}
                  >
                    <Image
                      src={activeScene.posterImage}
                      alt={activeScene.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A13]/90 via-[#0D1A13]/30 to-transparent" />
                  </div>
                )}

                {/* Top Overlay Bar: Disclosure & Local MP4 Preview Trigger */}
                <div className="absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-b from-[#0D1A13]/85 to-transparent p-4 text-xs text-[#D5DDD8]">
                  <div>
                    <span className="font-medium text-[#C5A059]">
                      {customVideoUrl
                        ? `Playing Loaded MP4: ${customVideoName || 'Property Reel'}`
                        : `B-Roll Scene ${activeScene.indexNumber} Poster Preview`}
                    </span>
                    {!customVideoUrl && (
                      <>
                        <span aria-hidden="true"> · </span>
                        <span>Illustrative Concept Poster</span>
                      </>
                    )}
                  </div>

                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/mp4,video/webm"
                      onChange={handleVideoFileUpload}
                      className="hidden"
                      aria-label="Test local property MP4 video file"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded bg-[#14261C]/90 border border-[#FAF8F4]/25 px-2.5 py-1 text-xs font-medium text-[#FAF8F4] hover:border-[#C5A059] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Upload className="h-3.5 w-3.5 text-[#C5A059]" />
                      <span>Test With Local MP4 Video</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay Bar: Scene Title & Playback Controls */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="max-w-xl">
                    <p className="text-xs font-medium text-[#C5A059] font-[family-name:var(--font-mono)] tabular-nums">
                      Scene {activeScene.indexNumber} · {activeScene.areaLabel} ·{' '}
                      {activeScene.durationLabel}
                    </p>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-semibold text-[#FAF8F4] mt-1">
                      {activeScene.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#D0D8D3] line-clamp-2">
                      {activeScene.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {customVideoUrl && (
                      <button
                        type="button"
                        onClick={() => setIsMuted((prev) => !prev)}
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#FAF8F4]/30 bg-[#12231A]/80 text-[#FAF8F4] hover:bg-[#1B3326] transition-colors cursor-pointer"
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4 text-[#C5A059]" />
                        ) : (
                          <Volume2 className="h-4 w-4 text-[#C5A059]" />
                        )}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={toggleVideoPlayback}
                      className="inline-flex items-center gap-2 rounded-md bg-[#C5A059] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#12231A] hover:bg-[#D4B26E] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {isPlayingBroll ? (
                        <>
                          <Pause className="h-4 w-4" />
                          <span>Pause Reel</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          <span>Play Reel Preview</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Technical Shot Specification Footer */}
              <div className="px-6 py-4 bg-[#162B20] border-t border-[#263E30] flex flex-wrap items-center justify-between gap-3 text-xs text-[#B8C4BC]">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-[#C5A059] shrink-0" />
                  <span>
                    Recommended Production B-Roll:{' '}
                    {activeScene.shotChecklist.join(' · ')}
                  </span>
                </div>
                {customVideoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomVideoUrl('');
                      setCustomVideoName('');
                      setIsPlayingBroll(false);
                    }}
                    className="text-[#C5A059] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Reset to Concept Poster
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: 4 Interactive B-Roll Scene Chapters */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
              {BROLL_SCENES.map((scene, idx) => {
                const isSelected = idx === activeSceneIndex;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => {
                      setActiveSceneIndex(idx);
                    }}
                    className={`w-full text-left rounded-xl border p-4 transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? 'border-[#14261C] bg-[#14261C] text-[#FAF8F4]'
                        : 'border-[#E2DDD2] bg-white text-[#1C211E] hover:border-[#C5A059]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span
                        className={`font-[family-name:var(--font-mono)] font-semibold tabular-nums ${
                          isSelected ? 'text-[#C5A059]' : 'text-[#7E6330]'
                        }`}
                      >
                        {scene.indexNumber}. {scene.areaLabel}
                      </span>
                      <span
                        className={`font-[family-name:var(--font-mono)] tabular-nums ${
                          isSelected ? 'text-[#B8C4BC]' : 'text-[#68726B]'
                        }`}
                      >
                        {scene.durationLabel}
                      </span>
                    </div>
                    <h4 className="font-[family-name:var(--font-cormorant)] text-lg font-semibold mt-1">
                      {scene.title}
                    </h4>
                    <p
                      className={`mt-1 text-xs line-clamp-2 ${
                        isSelected ? 'text-[#C6D0C9]' : 'text-[#5A635D]'
                      }`}
                    >
                      {scene.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Part 2: Responsive Photography Gallery with Lightbox */}
        <div className="pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#7E6330] mb-2">
                05. Concept Photography Gallery
              </p>
              <h3 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-semibold text-[#14261C]">
                Explore Illustrative Spaces &amp; Venue Concepts
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#5A635D]">
                All gallery items below are clearly marked concept illustrations awaiting official
                property photography. Click any image to open the high-resolution lightbox.
              </p>
            </div>

            {/* Functional Filter Segmented Controls */}
            <div
              role="tablist"
              aria-label="Filter gallery images by category"
              className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[#EDE8DD] p-1.5 self-start"
            >
              {[
                { id: 'all', label: 'All Spaces' },
                { id: 'accommodation', label: 'Accommodation' },
                { id: 'conferencing', label: 'Conferencing' },
                { id: 'spaces', label: 'Exterior & Dining' },
              ].map((tab) => {
                const active = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() =>
                      setActiveFilter(
                        tab.id as 'all' | 'accommodation' | 'conferencing' | 'spaces'
                      )
                    }
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#14261C] text-[#FAF8F4]'
                        : 'text-[#3A423D] hover:text-[#14261C]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Responsive Gallery Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-xl border border-[#E2DDD2] bg-white overflow-hidden hover:border-[#C5A059] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Open ${item.title} in fullscreen lightbox`}
                  className="relative aspect-4/3 w-full bg-[#162B20] overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5A059]"
                >
                  <Image
                    src={item.image}
                    alt={`${item.title} — ${item.disclosure}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    referrerPolicy="no-referrer"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A13]/85 via-transparent to-transparent opacity-90" />

                  <div className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#12231A]/80 text-[#FAF8F4] border border-[#FAF8F4]/20 group-hover:bg-[#C5A059] group-hover:text-[#12231A] transition-colors">
                    <Maximize2 className="h-4 w-4" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 text-[#FAF8F4]">
                    <p className="text-[11px] text-[#C5A059] font-medium">
                      {item.categoryLabel} · Concept Illustration
                    </p>
                    <h4 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                </button>

                <div className="p-4 flex flex-col justify-between flex-1 bg-white">
                  <p className="text-xs text-[#4A524D] leading-relaxed">{item.caption}</p>
                  <p className="mt-3 pt-2.5 border-t border-[#ECE7DD] text-[11px] text-[#7E6330] font-medium">
                    {item.disclosure}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Fullscreen Lightbox Modal */}
      {currentLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentLightboxItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#09120D]/95 p-4 sm:p-6 lg:p-10 backdrop-blur-xs"
        >
          <div className="relative flex w-full max-w-5xl flex-col rounded-xl border border-[#284234] bg-[#12231A] text-[#FAF8F4] overflow-hidden">
            {/* Lightbox Header */}
            <div className="flex items-center justify-between gap-4 border-b border-[#253D30] px-5 py-3.5">
              <div className="flex items-center gap-2 text-xs text-[#C2CCC6]">
                <span className="font-[family-name:var(--font-mono)] text-[#C5A059] tabular-nums">
                  {lightboxIndex + 1} / {filteredGallery.length}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentLightboxItem.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="hidden sm:inline text-[#A7B4AD]">
                  {currentLightboxItem.disclosure}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox (Escape)"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#31503F] text-[#FAF8F4] hover:bg-[#1B3326] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Lightbox Image Viewport */}
            <div className="relative aspect-16/9 w-full bg-[#0A140F]">
              <Image
                src={currentLightboxItem.image}
                alt={currentLightboxItem.title}
                fill
                sizes="90vw"
                referrerPolicy="no-referrer"
                className="object-contain"
              />

              {filteredGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevLightbox}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#12231A]/85 border border-[#FAF8F4]/20 text-[#FAF8F4] hover:bg-[#C5A059] hover:text-[#12231A] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextLightbox}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#12231A]/85 border border-[#FAF8F4]/20 text-[#FAF8F4] hover:bg-[#C5A059] hover:text-[#12231A] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Caption & Direct Enquiry Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#253D30] px-6 py-4 bg-[#162B20]">
              <div>
                <h4 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[#FAF8F4]">
                  {currentLightboxItem.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-[#C2CCC6]">
                  {currentLightboxItem.caption}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setLightboxIndex(null);
                  onNavigateToBooking();
                }}
                className="rounded-md bg-[#C5A059] px-4 py-2 text-xs sm:text-sm font-semibold text-[#12231A] hover:bg-[#D4B26E] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
