import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, '../src/bildes')
const publicDir = path.join(__dirname, '../public/gallery')

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

const files = fs.readdirSync(srcDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f))

async function optimizeImages() {
  for (const file of files) {
    const inputPath = path.join(srcDir, file)
    const baseName = path.parse(file).name

    // Get metadata for responsive sizing
    const metadata = await sharp(inputPath).metadata()

    // Create responsive sizes
    const sizes = [
      { width: 480, suffix: 'sm' },
      { width: 768, suffix: 'md' },
      { width: 1200, suffix: 'lg' },
    ]

    for (const { width, suffix } of sizes) {
      const height = Math.round((width / metadata.width) * metadata.height)

      // AVIF - best compression
      await sharp(inputPath)
        .resize(width, height, { fit: 'cover', withoutEnlargement: true })
        .avif({ quality: 75, effort: 6 })
        .toFile(path.join(publicDir, `${baseName}-${suffix}.avif`))

      // WebP - good compression
      await sharp(inputPath)
        .resize(width, height, { fit: 'cover', withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(path.join(publicDir, `${baseName}-${suffix}.webp`))

      // JPEG fallback
      await sharp(inputPath)
        .resize(width, height, { fit: 'cover', withoutEnlargement: true })
        .jpeg({ quality: 75, progressive: true })
        .toFile(path.join(publicDir, `${baseName}-${suffix}.jpg`))
    }

    console.log(`✓ Optimized ${file}`)
  }

  console.log(`\nOptimized ${files.length} images to ${publicDir}`)
}

optimizeImages().catch(err => {
  console.error('Error optimizing images:', err)
  process.exit(1)
})
