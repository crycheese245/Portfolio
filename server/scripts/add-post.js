// One-off script to insert new blog posts into an already-running database
// (seedFirstPosts only runs once, when the table is empty — this covers
// adding more posts afterwards without going through the admin editor).
//
// Usage (from server/): node scripts/add-post.js
// Safe to re-run — skips any post whose slug already exists.

import { nanoid } from 'nanoid'
import { sequelize } from '../src/db.js'
import { BlogPost } from '../src/models/BlogPost.js'
import { slugify } from '../src/utils/slug.js'
import { lotteryAgencyPost } from '../src/posts/lottery-agency.js'

const postsToAdd = [lotteryAgencyPost]

async function run() {
  await sequelize.authenticate()

  for (const post of postsToAdd) {
    const slug = slugify(post.title)
    const existing = await BlogPost.findOne({ where: { slug } })

    if (existing) {
      console.log(`[skip] "${post.title}" already exists (slug: ${slug})`)
      continue
    }

    await BlogPost.create({
      id: nanoid(),
      slug,
      title: post.title,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      contentHtml: post.contentHtml.trim(),
      published: true,
    })
    console.log(`[added] "${post.title}" (slug: ${slug})`)
  }

  await sequelize.close()
}

run().catch((error) => {
  console.error('[add-post] Failed:', error)
  process.exit(1)
})
