# Image Optimization Scripts

This directory contains scripts for optimizing images before committing them to git.

## Why Optimize Images?

- **Faster git operations**: Large images slow down git push/pull operations
- **Better performance**: Smaller images load faster on the website
- **Reduced storage**: Saves space in the repository
- **Better UX**: Faster page loads improve user experience

## Usage

### Optimize All Images in ProductImages Folder

```bash
npm run optimize:images
```

This will:
- Find all images in `public/ProductImages/`
- Create optimized versions in `public/ProductImages/optimized/`
- Generate both WebP (best compression) and JPG (fallback) versions
- Resize images to max 1920x1920px while maintaining aspect ratio
- Show optimization statistics

### Optimize a Single Image

```bash
npm run optimize:single path/to/image.jpg
```

Example:
```bash
npm run optimize:single public/hero-image.jpg
```

## Image Formats

- **WebP**: Modern format with excellent compression (~85% smaller than original)
- **JPG**: Fallback format for older browsers (~70% smaller than original)
- **AVIF**: Best compression (can be added if needed)

## Best Practices

1. **Always optimize before committing**: Run `npm run optimize:images` before committing new images
2. **Use optimized versions**: Update your code to reference images in the `optimized/` folder
3. **Keep originals locally**: The original high-res images stay on your computer but aren't committed to git
4. **Target file sizes**: Aim for <500KB per image for web use

## Next.js Image Component

Use Next.js Image component for automatic optimization:

```tsx
import Image from 'next/image';

<Image
  src="/ProductImages/optimized/product.webp"
  alt="Product name"
  width={800}
  height={600}
  quality={85}
/>
```

Next.js will automatically:
- Serve WebP/AVIF to supported browsers
- Generate responsive sizes
- Lazy load images
- Optimize on-the-fly

## Troubleshooting

**Script fails with "sharp not found"**
- Run `npm install` to install dependencies

**Images still too large**
- Adjust quality settings in `scripts/optimize-images.js`
- Reduce MAX_WIDTH/MAX_HEIGHT values
- Consider using AVIF format for even better compression

**Want to optimize other folders**
- Modify `INPUT_DIR` in `scripts/optimize-images.js`
