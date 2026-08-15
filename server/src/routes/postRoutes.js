import { Router } from 'express'
import { nanoid } from 'nanoid'
import { Op } from 'sequelize'
import { BlogPost } from '../models/index.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { slugify } from '../utils/slug.js'

const router = Router()

async function uniqueSlug(title, ignoreId) {
  const base = slugify(title)
  let slug = base
  let suffix = 2

  while (await BlogPost.findOne({ where: { slug, ...(ignoreId ? { id: { [Op.ne]: ignoreId } } : {}) } })) {
    slug = `${base}-${suffix}`
    suffix += 1
  }

  return slug
}

// ── Public ──────────────────────────────────────────────────────────────────

router.get('/posts', asyncHandler(async (_request, response) => {
  const posts = await BlogPost.findAll({
    where: { published: true },
    order: [['createdAt', 'DESC']],
  })
  response.json({ data: posts })
}))

router.get('/posts/:slug', asyncHandler(async (request, response) => {
  const post = await BlogPost.findOne({ where: { slug: request.params.slug, published: true } })
  if (!post) {
    response.status(404).json({ message: 'Post not found' })
    return
  }
  response.json({ data: post })
}))

// ── Admin ────────────────────────────────────────────────────────────────────

router.get('/admin/posts', requireAdmin, asyncHandler(async (_request, response) => {
  const posts = await BlogPost.findAll({ order: [['createdAt', 'DESC']] })
  response.json({ data: posts })
}))

router.get('/admin/posts/:id', requireAdmin, asyncHandler(async (request, response) => {
  const post = await BlogPost.findByPk(request.params.id)
  if (!post) {
    response.status(404).json({ message: 'Post not found' })
    return
  }
  response.json({ data: post })
}))

router.post('/admin/posts', requireAdmin, asyncHandler(async (request, response) => {
  const { title, excerpt, coverImage, contentHtml, published } = request.body ?? {}

  if (typeof title !== 'string' || !title.trim()) {
    response.status(400).json({ message: 'Tiêu đề không được để trống' })
    return
  }

  const post = await BlogPost.create({
    id: nanoid(),
    slug: await uniqueSlug(title),
    title: title.trim(),
    excerpt: typeof excerpt === 'string' ? excerpt.trim() : '',
    coverImage: typeof coverImage === 'string' && coverImage ? coverImage : null,
    contentHtml: typeof contentHtml === 'string' ? contentHtml : '',
    published: Boolean(published),
  })

  response.status(201).json({ data: post })
}))

router.put('/admin/posts/:id', requireAdmin, asyncHandler(async (request, response) => {
  const post = await BlogPost.findByPk(request.params.id)
  if (!post) {
    response.status(404).json({ message: 'Post not found' })
    return
  }

  const { title, excerpt, coverImage, contentHtml, published } = request.body ?? {}

  if (typeof title !== 'string' || !title.trim()) {
    response.status(400).json({ message: 'Tiêu đề không được để trống' })
    return
  }

  const nextSlug = title.trim() === post.title ? post.slug : await uniqueSlug(title, post.id)

  await post.update({
    title: title.trim(),
    slug: nextSlug,
    excerpt: typeof excerpt === 'string' ? excerpt.trim() : post.excerpt,
    coverImage: typeof coverImage === 'string' ? (coverImage || null) : post.coverImage,
    contentHtml: typeof contentHtml === 'string' ? contentHtml : post.contentHtml,
    published: Boolean(published),
  })

  response.json({ data: post })
}))

router.delete('/admin/posts/:id', requireAdmin, asyncHandler(async (request, response) => {
  const post = await BlogPost.findByPk(request.params.id)
  if (!post) {
    response.status(404).json({ message: 'Post not found' })
    return
  }
  await post.destroy()
  response.json({ data: { ok: true } })
}))

export { router as postRoutes }
