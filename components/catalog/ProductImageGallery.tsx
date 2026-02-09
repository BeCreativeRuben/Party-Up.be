"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { IMAGE_PLACEHOLDER_BLUR } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentImage = images[selectedIndex];

  const scrollToIndex = (i: number) => {
    setSelectedIndex(i);
    slideRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const slideWidth = container.offsetWidth;
    const newIndex = Math.round(scrollLeft / slideWidth);
    if (newIndex >= 0 && newIndex < images.length && newIndex !== selectedIndex) {
      setSelectedIndex(newIndex);
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setSelectedIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      if (e.key === "ArrowRight") setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    },
    [lightboxOpen, images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (lightboxOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <>
      <div className="space-y-4">
        {/* Main image - scrollable area, click to enlarge */}
        <div
          className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory h-full flex scroll-smooth scrollbar-hide"
          >
            {images.map((src, i) => (
              <div
                key={src}
                ref={(el) => { slideRefs.current[i] = el; }}
                className="relative flex-shrink-0 w-full h-full snap-center"
              >
                <Image
                  src={src}
                  alt={`${productName} - ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  placeholder="blur"
                  blurDataURL={IMAGE_PLACEHOLDER_BLUR}
                  quality={i === 0 ? 80 : 75}
                />
              </div>
            ))}
          </div>
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToIndex(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === selectedIndex ? "bg-white shadow" : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => scrollToIndex(i)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === selectedIndex ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Image
                  src={src}
                  alt={`${productName} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  loading="lazy"
                  quality={50}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox - click to enlarge */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage}
              alt={`${productName} - enlarged`}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[90vh] object-contain"
              quality={90}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((i) => (i === 0 ? images.length - 1 : i - 1));
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 text-white/80 hover:text-white p-2 bg-black/50 rounded-full"
                  aria-label="Previous image"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1));
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 text-white/80 hover:text-white p-2 bg-black/50 rounded-full"
                  aria-label="Next image"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                  {selectedIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
