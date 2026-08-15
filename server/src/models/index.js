import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'
import { sequelize } from '../db.js'
import { env } from '../env.js'
import { Admin } from './Admin.js'
import { BlogPost } from './BlogPost.js'
import { seedFirstPosts } from '../seedPosts.js'

export { Admin, BlogPost }

export async function initDatabase() {
  await sequelize.sync()

  const adminCount = await Admin.count()
  if (adminCount === 0) {
    await Admin.create({
      id: nanoid(),
      username: env.adminUsername,
      passwordHash: await bcrypt.hash(env.adminPassword, 12),
    })
    console.log(`[db] Seeded initial admin account "${env.adminUsername}" from env config.`)
  }

  await seedFirstPosts(BlogPost)
}
