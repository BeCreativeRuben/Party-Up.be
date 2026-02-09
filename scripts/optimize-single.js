const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Get file path from command line argument
const inputFile = process.argv[2];

if (!inputFile) {
  console.error('Usage: node scripts/optimize-single.js <path-to-image>');
  process.exit(1);
}

const inputPath = path.resolve(inputFile);
const outputDir = path.join(path.dirname(inputPath), 'optimized');
const ext = path.extname(inputPath).toLowerCase();
const basename = path.basename(inputPath, ext);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimize() {
  try {
    const stats = await fs.promises.stat(inputPath);
    const originalSize = stats.size;
    
    console.log(`Optimizing: ${path.basename(inputPath)}`);
    console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB\n`);

    // Optimize to WebP
    const webpPath = path.join(outputDir, `${basename}.webp`);
    await sharp(inputPath)
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toFile(webpPath);
    
    const webpStats = await fs.promises.stat(webpPath);
    const webpSize = webpStats.size;
    const webpReduction = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ WebP: ${path.basename(webpPath)}`);
    console.log(`   Size: ${(webpSize / 1024 / 1024).toFixed(2)} MB (${webpReduction}% reduction)`);

    // Also create optimized JPG fallback
    const jpgPath = path.join(outputDir, `${basename}.jpg`);
    await sharp(inputPath)
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(jpgPath);
    
    const jpgStats = await fs.promises.stat(jpgPath);
    const jpgSize = jpgStats.size;
    const jpgReduction = ((originalSize - jpgSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ JPG: ${path.basename(jpgPath)}`);
    console.log(`   Size: ${(jpgSize / 1024 / 1024).toFixed(2)} MB (${jpgReduction}% reduction)`);
    
    console.log(`\n✨ Optimized images saved to: ${outputDir}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

optimize();
