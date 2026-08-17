import { verifyAdminToken } from '../token.js'

export function requireAdmin(request, response, next) {
  const authorization = request.header('authorization')

  if (!authorization?.startsWith('Bearer ')) {
    response.status(401).json({ message: 'Authentication required' })
    return
  }

  try {
    const token = authorization.slice('Bearer '.length)
    request.adminId = verifyAdminToken(token).sub
    next()
  } catch {
    response.status(401).json({ message: 'Invalid or expired session' })
  }
}
