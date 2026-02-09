const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = path.join(__dirname, '../public/ProductImages');
const OUTPUT_DIR = path.join(__dirname, '../public/ProductImages/optimized');
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const QUALITY = {
  jpeg: 85,
  webp: 85,
  avif: 50,
};

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputPath, format = 'webp') {
  try {
    const stats = await fs.promises.stat(inputPath);
    const originalSize = stats.size;
    
    let sharpInstance = sharp(inputPath)
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true,
      });

    if (format === 'webp') {
      sharpInstance = sharpInstance.webp({ quality: QUALITY.webp });
      outputPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    } else if (format === 'avif') {
      sharpInstance = sharpInstance.avif({ quality: QUALITY.avif });
      outputPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.avif');
    } else if (format === 'jpg' || format === 'jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality: QUALITY.jpeg, mozjpeg: true });
      outputPath = outputPath.replace(/\.(png)$/i, '.jpg');
    } else {
      sharpInstance = sharpInstance.png({ quality: QUALITY.png });
    }

    await sharpInstance.toFile(outputPath);
    
    const newStats = await fs.promises.stat(outputPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    return {
      original: path.basename(inputPath),
      optimized: path.basename(outputPath),
      originalSize: (originalSize / 1024 / 1024).toFixed(2) + ' MB',
      newSize: (newSize / 1024 / 1024).toFixed(2) + ' MB',
      reduction: reduction + '%',
      format,
    };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  console.log('🖼️  Starting image optimization...\n');
  
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Input directory not found: ${INPUT_DIR}`);
    return;
  }

  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file) && 
    !file.includes('optimized')
  );

  if (imageFiles.length === 0) {
    console.log('ℹ️  No images found to optimize.');
    return;
  }

  console.log(`Found ${imageFiles.length} images to optimize\n`);

  const results = [];
  
  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file.toLowerCase());
    
    // Optimize to WebP (best compression)
    const webpResult = await optimizeImage(inputPath, outputPath, 'webp');
    if (webpResult) {
      results.push(webpResult);
      console.log(`✅ ${webpResult.original} → ${webpResult.optimized}`);
      console.log(`   ${webpResult.originalSize} → ${webpResult.newSize} (${webpResult.reduction} reduction)\n`);
    }
    
    // Also create JPG fallback for compatibility
    const jpgResult = await optimizeImage(inputPath, outputPath, 'jpg');
    if (jpgResult) {
      results.push(jpgResult);
    }
  }

  // Summary
  console.log('\n📊 Optimization Summary:');
  console.log('='.repeat(60));
  const totalOriginal = results.reduce((sum, r) => {
    const size = parseFloat(r.originalSize.replace(' MB', ''));
    return sum + size;
  }, 0);
  const totalNew = results.filter(r => r.format === 'webp').reduce((sum, r) => {
    const size = parseFloat(r.newSize.replace(' MB', ''));
    return sum + size;
  }, 0);
  const totalReduction = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);
  
  console.log(`Total images optimized: ${imageFiles.length}`);
  console.log(`Total size reduction: ${totalOriginal.toFixed(2)} MB → ${totalNew.toFixed(2)} MB (${totalReduction}% reduction)`);
  console.log('\n✨ Optimization complete!');
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Review optimized images');
  console.log('   2. Update your code to use optimized images');
  console.log('   3. Commit the optimized images (not the originals)');
}

// Run optimization
optimizeAllImages().catch(console.error);
