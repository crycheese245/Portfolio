import jwt from 'jsonwebtoken'
import { env } from './env.js'

export function signAdminToken(admin) {
  return jwt.sign({ role: 'admin' }, env.jwtSecret, {
    expiresIn: '7d',
    subject: admin.id,
  })
}

export function verifyAdminToken(token) {
  const payload = jwt.verify(token, env.jwtSecret)
  if (typeof payload !== 'object' || typeof payload.sub !== 'string' || payload.role !== 'admin') {
    throw new Error('Invalid token')
  }
  return payload
}
