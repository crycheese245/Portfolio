import sharp from 'sharp'
import { join } from 'node:path'

const SUPPORTED_MIMETYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

// Re-encode through Sharp so pixel data is fully rebuilt from a decoded raster,
// which strips any hidden payload embedded via metadata or format-specific tricks.
export async function sanitizeAndSaveImage(buffer, mimetype, destDir, filename) {
  if (!SUPPORTED_MIMETYPES.has(mimetype)) {
    throw new Error(`Unsupported image type: ${mimetype}`)
  }

  const image = sharp(buffer, { animated: mimetype === 'image/gif' })
    .resize({ width: 1600, withoutEnlargement: true })

  switch (mimetype) {
    case 'image/jpeg':
      image.jpeg({ quality: 85 })
      break
    case 'image/png':
      image.png({ compressionLevel: 6 })
      break
    case 'image/webp':
      image.webp({ quality: 85 })
      break
    case 'image/gif':
      image.gif()
      break
  }

  await image.toFile(join(destDir, filename))
}
