// One-off script to add/update blog posts against an already-running database
// (seedFirstPosts only runs once, when the table is empty — this covers
// adding or editing posts afterwards without going through the admin editor).
//
// Usage (from server/): node scripts/add-post.js
// Safe to re-run — creates a post if its slug doesn't exist yet, otherwise
// updates that post's excerpt/coverImage/contentHtml to match the source file.

import { nanoid } from 'nanoid'
import { sequelize } from '../src/db.js'
import { BlogPost } from '../src/models/BlogPost.js'
import { slugify } from '../src/utils/slug.js'
import { lotteryAgencyPost } from '../src/posts/lottery-agency.js'
import { aichatPost } from '../src/posts/aichat.js'

const postsToAdd = [lotteryAgencyPost, aichatPost]

async function run() {
  await sequelize.authenticate()

  for (const post of postsToAdd) {
    const slug = slugify(post.title)
    const existing = await BlogPost.findOne({ where: { slug } })

    if (existing) {
      await existing.update({
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        contentHtml: post.contentHtml.trim(),
      })
      console.log(`[updated] "${post.title}" (slug: ${slug})`)
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
