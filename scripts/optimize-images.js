import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '../public/gallery')

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

const files = fs.readdirSync(publicDir).filter(f => /\.(jpg|jpeg)$/i.test(f) && !f.includes('-md') && !f.includes('-sm'))

async function optimizeImages() {
  for (const file of files) {
    const inputPath = path.join(publicDir, file)
    const baseName = path.parse(file).name

    // Get metadata for responsive sizing
    const metadata = await sharp(inputPath).metadata()

    // Single responsive size for Netlify builds
    const width = 768
    const height = Math.round((width / metadata.width) * metadata.height)

    // AVIF - best compression (faster encoding with effort: 3)
    await sharp(inputPath)
      .resize(width, height, { fit: 'cover', withoutEnlargement: true })
      .avif({ quality: 75, effort: 3 })
      .toFile(path.join(publicDir, `${baseName}-md.avif`))

    // JPEG fallback
    await sharp(inputPath)
      .resize(width, height, { fit: 'cover', withoutEnlargement: true })
      .jpeg({ quality: 75, progressive: true })
      .toFile(path.join(publicDir, `${baseName}-md.jpg`))

    console.log(`✓ Optimized ${file}`)
  }

  console.log(`\nOptimized ${files.length} images to ${publicDir}`)
}

optimizeImages().catch(err => {
  console.error('Error optimizing images:', err)
  process.exit(1)
})
