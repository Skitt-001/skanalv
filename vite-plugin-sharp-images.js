/**
 * Vite Plugin for Automatic Image Optimization with Sharp
 * Generates AVIF, WebP, and LQIP files from source images
 */

import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

export default function vitePluginSharpImages(options = {}) {
  const {
    imageDir = 'public/gallery',
    outputDir = 'public/gallery',
    sizes = [
      { width: 480, suffix: 'sm' },
      { width: 768, suffix: 'md' },
      { width: 1200, suffix: 'lg' },
    ],
    avifQuality = 75,
    webpQuality = 80,
    jpegQuality = 75,
  } = options

  return {
    name: 'vite-plugin-sharp-images',
    apply: 'build',
    async generateBundle() {
      try {
        const files = await fs.readdir(imageDir)
        const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f))

        console.log(`\n📸 Optimizing ${imageFiles.length} images with Sharp...`)

        for (const file of imageFiles) {
          const inputPath = path.join(imageDir, file)
          const baseName = path.parse(file).name

          // Get metadata
          const metadata = await sharp(inputPath).metadata()

          // Generate LQIP
          try {
            const lqipBuffer = await sharp(inputPath)
              .resize(10, 10, { fit: 'cover' })
              .blur(5)
              .toBuffer()

            const lqipBase64 = lqipBuffer.toString('base64')
            const lqipDataUrl = `data:image/jpeg;base64,${lqipBase64}`

            await fs.writeFile(
              path.join(outputDir, `${baseName}.lqip.json`),
              JSON.stringify({ dataUrl: lqipDataUrl }),
              'utf-8'
            )
          } catch (err) {
            console.warn(`⚠ Failed to generate LQIP for ${file}:`, err.message)
          }

          // Generate responsive sizes
          for (const { width, suffix } of sizes) {
            const height = Math.round((width / metadata.width) * metadata.height)

            try {
              // AVIF
              await sharp(inputPath)
                .resize(width, height, { fit: 'cover', withoutEnlargement: true })
                .avif({ quality: avifQuality, effort: 6 })
                .toFile(path.join(outputDir, `${baseName}-${suffix}.avif`))
            } catch (err) {
              console.warn(`⚠ Failed to generate AVIF for ${baseName}-${suffix}`)
            }

            try {
              // WebP
              await sharp(inputPath)
                .resize(width, height, { fit: 'cover', withoutEnlargement: true })
                .webp({ quality: webpQuality, effort: 6 })
                .toFile(path.join(outputDir, `${baseName}-${suffix}.webp`))
            } catch (err) {
              console.warn(`⚠ Failed to generate WebP for ${baseName}-${suffix}`)
            }

            // JPEG fallback is already in public folder
          }

          console.log(`✓ ${file}`)
        }

        console.log(`✨ Image optimization complete!\n`)
      } catch (err) {
        console.error('Error in sharp images plugin:', err.message)
      }
    },
  }
}
