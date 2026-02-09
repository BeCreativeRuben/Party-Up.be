# Image Optimization Guide

## Quick Start

### 1. Optimize All Images

```bash
npm run optimize:images
```

This will:
- Process all images in `public/ProductImages/`
- Create optimized versions in `public/ProductImages/optimized/`
- Generate WebP (best) and JPG (fallback) formats
- Show size reduction statistics

### 2. Optimize a Single Image

```bash
npm run optimize:single path/to/image.jpg
```

Example:
```bash
npm run optimize:single public/hero-image.jpg
```

## Workflow

### When Adding New Images:

1. **Place original images** in `public/ProductImages/` (or appropriate folder)
   - Keep original high-res files locally
   - Git will ignore uppercase `.JPG` files automatically

2. **Run optimization**:
   ```bash
   npm run optimize:images
   ```

3. **Review optimized images** in `public/ProductImages/optimized/`

4. **Use optimized images** in your code:
   ```tsx
   import OptimizedImage from '@/components/ui/OptimizedImage';
   
   <OptimizedImage
     src="/ProductImages/optimized/product-name"
     alt="Product description"
     width={800}
     height={600}
   />
   ```

5. **Commit only optimized images**:
   ```bash
   git add public/ProductImages/optimized/
   git commit -m "Add optimized product images"
   ```

## File Size Targets

- **WebP**: <500KB per image (target: 200-400KB)
- **JPG fallback**: <800KB per image (target: 400-600KB)
- **Max dimensions**: 1920x1920px (automatically handled)

## Image Formats Explained

- **WebP**: Modern format, ~85% smaller than original
  - Supported by all modern browsers
  - Best compression ratio
  - Use as primary format

- **JPG**: Fallback format, ~70% smaller than original
  - Universal browser support
  - Used when WebP isn't supported
  - Automatically served by OptimizedImage component

## Using Optimized Images in Code

### Option 1: OptimizedImage Component (Recommended)

```tsx
import OptimizedImage from '@/components/ui/OptimizedImage';

<OptimizedImage
  src="/ProductImages/optimized/tent-3x3"
  alt="3x3m Party Tent"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

### Option 2: Next.js Image Component

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

## Troubleshooting

### Script fails to run
- Make sure dependencies are installed: `npm install`
- Check Node.js version (requires Node 14+)

### Images still too large
- Edit `scripts/optimize-images.js`
- Reduce `QUALITY.webp` and `QUALITY.jpeg` values
- Reduce `MAX_WIDTH` and `MAX_HEIGHT` values

### Want different output location
- Edit `OUTPUT_DIR` in `scripts/optimize-images.js`

### Git still tracking large files
- Check `.gitignore` is correct
- Remove from git: `git rm --cached path/to/large-file.jpg`
- Commit the removal

## Best Practices

1. ✅ **Always optimize before committing** new images
2. ✅ **Keep originals locally** but don't commit them
3. ✅ **Use WebP format** as primary, JPG as fallback
4. ✅ **Target <500KB** per optimized image
5. ✅ **Use Next.js Image component** for automatic optimization
6. ❌ **Don't commit** original camera files (.JPG uppercase)
7. ❌ **Don't commit** raw camera files (.NEF, .CR2, etc.)
8. ❌ **Don't commit** videos >5MB (host externally)

## Example: Complete Workflow

```bash
# 1. Add new images to ProductImages folder
# (original DSC_9635.JPG, DSC_9636.JPG, etc.)

# 2. Optimize them
npm run optimize:images

# 3. Review the optimized folder
ls public/ProductImages/optimized/

# 4. Update your code to use optimized images
# Edit components/catalog/ProductCard.tsx

# 5. Stage only optimized images
git add public/ProductImages/optimized/
git add components/

# 6. Commit
git commit -m "Add optimized product images"

# 7. Push
git push
```

## Performance Impact

Before optimization:
- 70 images × 14MB = ~980MB
- Git push: 5-10 minutes
- Page load: Slow

After optimization:
- 70 images × 0.3MB = ~21MB
- Git push: <30 seconds
- Page load: Fast ⚡

**Result: 98% size reduction!**
