<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPost } from '../api/blog.js'

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const error = ref('')

function formatDate(value) {
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value))
}

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setStructuredData(data) {
  let el = document.getElementById('blog-post-jsonld')
  if (!el) {
    el = document.createElement('script')
    el.id = 'blog-post-jsonld'
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function clearStructuredData() {
  document.getElementById('blog-post-jsonld')?.remove()
}

async function load(slug) {
  loading.value = true
  error.value = ''
  try {
    post.value = await fetchPost(slug)
    document.title = `${post.value.title} | CheeHouse Blog`
    setMeta('description', post.value.excerpt)
    setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.value.title,
      description: post.value.excerpt,
      image: post.value.coverImage ? `${window.location.origin}${post.value.coverImage}` : undefined,
      datePublished: post.value.createdAt,
      dateModified: post.value.updatedAt,
      author: { '@type': 'Person', name: 'CheeHouse' },
    })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Không tìm thấy bài viết'
  } finally {
    loading.value = false
  }
}

watch(() => route.params.slug, (slug) => { if (slug) load(String(slug)) })
onMounted(() => load(String(route.params.slug)))
onBeforeUnmount(clearStructuredData)
</script>

<template>
  <section class="section blog-post">
    <div class="container blog-post__narrow">
      <RouterLink to="/blog" class="blog-post__back">← Tất cả bài viết</RouterLink>

      <p v-if="loading" class="blog-post__empty">Đang tải...</p>
      <p v-else-if="error" class="blog-post__empty">{{ error }}</p>

      <article v-else-if="post">
        <span class="blog-post__date">{{ formatDate(post.createdAt) }}</span>
        <h1>{{ post.title }}</h1>
        <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title" class="blog-post__cover" />
        <div class="blog-post__body" v-html="post.contentHtml" />
      </article>
    </div>
  </section>
</template>

<style scoped>
.blog-post {
  padding-top: 140px;
}

.blog-post__narrow {
  max-width: 760px;
}

.blog-post__back {
  display: inline-block;
  margin-bottom: 28px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-gray);
}

.blog-post__back:hover {
  color: var(--primary);
}

.blog-post__empty {
  padding: 80px 0;
  text-align: center;
  color: var(--text-gray);
}

.blog-post__date {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

article h1 {
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 800;
  color: var(--text-dark);
  margin: 12px 0 28px;
  line-height: 1.25;
}

.blog-post__cover {
  width: 100%;
  border-radius: var(--radius-lg);
  margin-bottom: 32px;
}

.blog-post__body {
  font-size: 16px;
  line-height: 1.9;
  color: var(--text-dark);
}

.blog-post__body :deep(p) {
  margin-bottom: 18px;
}

.blog-post__body :deep(h2) {
  font-size: 24px;
  font-weight: 800;
  margin: 36px 0 14px;
}

.blog-post__body :deep(h3) {
  font-size: 19px;
  font-weight: 700;
  margin: 28px 0 10px;
}

.blog-post__body :deep(img) {
  max-width: 100%;
  border-radius: var(--radius-lg);
  margin: 20px 0;
}

.blog-post__body :deep(blockquote) {
  border-left: 3px solid var(--primary);
  padding-left: 18px;
  color: var(--text-gray);
  margin: 20px 0;
}

.blog-post__body :deep(ul),
.blog-post__body :deep(ol) {
  padding-left: 26px;
  margin: 14px 0;
}

.blog-post__body :deep(a) {
  color: var(--primary);
  text-decoration: underline;
}
</style>
