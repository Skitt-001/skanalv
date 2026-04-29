#!/usr/bin/env node
/**
 * Generate Low-Quality Image Placeholders (LQIP) for blur-up effect
 * Creates 10px blurred versions stored as base64 data URLs
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const galleryDir = path.join(__dirname, '../public/gallery')

async function generateLQIP() {
  try {
    console.log('🖼️  Generating LQIP placeholders...\n')

    const files = fs.readdirSync(galleryDir)
    // Get unique base names (without size suffix)
    const baseNames = new Set()
    files.forEach(f => {
      const match = f.match(/^(.+?)(?:-sm|-md|-lg)?\.(jpg|webp|avif)$/)
      if (match && (f.includes('-sm.') || f.includes('-md.') || f.includes('-lg.'))) {
        baseNames.add(match[1])
      }
    })

    for (const baseName of baseNames) {
      const jpgFile = path.join(galleryDir, `${baseName}-md.jpg`)
      const lqipFile = path.join(galleryDir, `${baseName}.lqip.json`)

      if (!fs.existsSync(jpgFile)) continue

      try {
        // Generate 10px blurred placeholder
        const lqipBuffer = await sharp(jpgFile)
          .resize(10, 10, { fit: 'cover' })
          .blur(5)
          .toBuffer()

        const lqipBase64 = lqipBuffer.toString('base64')
        const lqipDataUrl = `data:image/jpeg;base64,${lqipBase64}`

        fs.writeFileSync(
          lqipFile,
          JSON.stringify({ dataUrl: lqipDataUrl }),
          'utf-8'
        )

        console.log(`✓ ${baseName}`)
      } catch (err) {
        console.error(`✗ Failed for ${baseName}:`, err.message)
      }
    }

    console.log(`\n✨ Generated LQIP placeholders for ${baseNames.size} images`)
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  }
}

generateLQIP()
