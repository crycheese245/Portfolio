import { Router } from 'express'
import multer from 'multer'
import { nanoid } from 'nanoid'
import { extname } from 'node:path'
import { mkdirSync } from 'node:fs'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { sanitizeAndSaveImage } from '../utils/sanitizeImage.js'
import { uploadsDir } from '../paths.js'

mkdirSync(uploadsDir, { recursive: true })

const EXT_BY_MIME = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, Object.hasOwn(EXT_BY_MIME, file.mimetype))
  },
})

const router = Router()

router.post('/admin/upload', requireAdmin, upload.single('image'), asyncHandler(async (request, response) => {
  if (!request.file) {
    response.status(400).json({ message: 'Chưa chọn ảnh hoặc định dạng không hỗ trợ (jpg/png/webp/gif)' })
    return
  }

  const filename = `${nanoid()}${extname(request.file.originalname).toLowerCase() || EXT_BY_MIME[request.file.mimetype]}`
  await sanitizeAndSaveImage(request.file.buffer, request.file.mimetype, uploadsDir, filename)

  response.status(201).json({ data: { url: `/uploads/${filename}` } })
}))

export { router as uploadRoutes }
