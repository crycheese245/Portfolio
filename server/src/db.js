import { Sequelize } from 'sequelize'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '..', 'data')
mkdirSync(dataDir, { recursive: true })

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(dataDir, 'portfolio.sqlite'),
  logging: false,
})
