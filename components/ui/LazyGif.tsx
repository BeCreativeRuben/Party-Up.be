"use client";

import { useEffect, useRef, useState } from "react";

interface LazyGifProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
}

export default function LazyGif({ src, alt, className, style, fill }: LazyGifProps) {
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Start playing when 10% is visible
        rootMargin: "50px", // Start loading slightly before it comes into view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const imgStyle: React.CSSProperties = fill
    ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        inset: 0,
        ...style,
      }
    : style ?? {};

  return (
    // eslint-disable-next-line @next/next/no-img-element -- Animated GIFs require <img> for proper playback
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      alt={alt}
      className={className}
      style={imgStyle}
      loading="lazy"
    />
  );
}
