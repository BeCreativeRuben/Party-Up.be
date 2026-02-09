import Image from "next/image";
import { ComponentProps } from "react";

interface OptimizedImageProps extends Omit<ComponentProps<typeof Image>, "src"> {
  src: string;
  alt: string;
  fallback?: string;
}

/**
 * OptimizedImage: WebP first with optional JPG fallback.
 * Product images in this project use WebP only (see lib/data/products.ts).
 *
 * Usage with WebP only:
 *   <OptimizedImage src="/ProductImages/optimized/dsc_9635.webp" alt="..." />
 * Usage with fallback:
 *   <OptimizedImage src="/path/base" alt="..." fallback="/path/fallback.jpg" />
 */
export default function OptimizedImage({ src, alt, fallback, ...props }: OptimizedImageProps) {
  // Remove extension if present
  const baseSrc = src.replace(/\.(webp|jpg|jpeg|png)$/i, "");
  
  // Use fallback if provided, otherwise construct from baseSrc
  const jpgFallback = fallback || `${baseSrc}.jpg`;
  const webpSrc = `${baseSrc}.webp`;

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <Image
        src={jpgFallback}
        alt={alt}
        {...props}
      />
    </picture>
  );
}
