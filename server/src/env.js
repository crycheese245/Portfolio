import dotenv from 'dotenv'

dotenv.config()

function readList(value, fallback) {
  if (!value) return fallback
  return value.split(',').map((item) => item.trim()).filter(Boolean)
}

export const env = {
  port: Number(process.env.PORT ?? 4180),
  jwtSecret: process.env.JWT_SECRET ?? 'dev-only-secret-change-me',
  adminUsername: process.env.ADMIN_USERNAME ?? 'admin',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'admin',
  corsOrigin: readList(process.env.CORS_ORIGIN, ['http://localhost:5176']),
}
