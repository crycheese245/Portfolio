import express from 'express'
import cors from 'cors'
import { env } from './env.js'
import { initDatabase } from './models/index.js'
import { uploadsDir } from './paths.js'
import { authRoutes } from './routes/authRoutes.js'
import { postRoutes } from './routes/postRoutes.js'
import { uploadRoutes } from './routes/uploadRoutes.js'

const app = express()

app.use(cors({ origin: env.corsOrigin }))
app.use(express.json({ limit: '2mb' }))
app.use('/uploads', express.static(uploadsDir))

app.get('/api/health', (_request, response) => {
  response.json({ data: { ok: true } })
})

app.use('/api/admin', authRoutes)
app.use('/api', postRoutes)
app.use('/api', uploadRoutes)

app.use((error, _request, response, _next) => {
  console.error('[server] Unhandled error:', error)
  response.status(500).json({ message: 'Internal server error' })
})

async function start() {
  await initDatabase()
  app.listen(env.port, () => {
    console.log(`[server] Portfolio backend listening on http://localhost:${env.port}`)
  })
}

start().catch((error) => {
  console.error('[server] Failed to start:', error)
  process.exit(1)
})
