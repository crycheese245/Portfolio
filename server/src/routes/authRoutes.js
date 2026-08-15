import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { Admin } from '../models/index.js'
import { signAdminToken } from '../token.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { requireAdmin } from '../middleware/requireAdmin.js'

const router = Router()

router.post('/login', asyncHandler(async (request, response) => {
  const { username, password } = request.body ?? {}

  if (typeof username !== 'string' || typeof password !== 'string') {
    response.status(400).json({ message: 'Thiếu tên đăng nhập hoặc mật khẩu' })
    return
  }

  const admin = await Admin.findOne({ where: { username } })
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    response.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' })
    return
  }

  response.json({ data: { token: signAdminToken(admin), username: admin.username } })
}))

router.get('/me', requireAdmin, asyncHandler(async (request, response) => {
  const admin = await Admin.findByPk(request.adminId)
  if (!admin) {
    response.status(401).json({ message: 'Invalid session' })
    return
  }
  response.json({ data: { username: admin.username } })
}))

export { router as authRoutes }
