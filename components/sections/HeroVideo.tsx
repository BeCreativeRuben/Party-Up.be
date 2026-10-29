"use client";

import { useEffect, useState } from "react";

/**
 * The poster is the first paint. The hero film (same footage, compressed)
 * starts after the page is idle so it does not compete with LCP.
 * Reduced motion keeps the still.
 */
export default function HeroVideo() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const start = () => setPlay(true);
    const requestIdle = window.requestIdleCallback?.bind(window);
    if (requestIdle) {
      const id = requestIdle(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(start, 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- explicit srcset poster, not a CMS image */}
      <img
        src="/hero-poster-640.webp"
        srcSet="/hero-poster-640.webp 640w, /hero-poster-960.webp 960w, /hero-poster-1280.webp 1280w"
        sizes="100vw"
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {play && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/hero-poster-960.webp"
          className="absolute inset-0 w-full h-full object-cover hero-video-quality"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}
