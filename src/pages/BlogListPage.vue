<script setup>
import { onMounted, ref } from 'vue'
import { fetchPosts } from '../api/blog.js'

const posts = ref([])
const loading = ref(true)
const error = ref('')

function formatDate(value) {
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value))
}

onMounted(async () => {
  try {
    posts.value = await fetchPosts()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Không tải được danh sách bài viết'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="section blog-list">
    <div class="container">
      <div class="section-header reveal">
        <p class="tag">Blog</p>
        <h1 class="section-title">Bài viết & Case Study</h1>
        <p class="section-subtitle">
          Ghi chép về những vấn đề kỹ thuật thật đã gặp và cách giải quyết trong quá trình xây dựng sản phẩm.
        </p>
      </div>

      <p v-if="loading" class="blog-list__empty">Đang tải...</p>
      <p v-else-if="error" class="blog-list__empty">{{ error }}</p>
      <p v-else-if="posts.length === 0" class="blog-list__empty">Chưa có bài viết nào, quay lại sau nhé.</p>

      <div v-else class="blog-list__grid">
        <RouterLink v-for="post in posts" :key="post.id" :to="`/blog/${post.slug}`" class="blog-card">
          <div class="blog-card__img-wrap">
            <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title" loading="lazy" />
            <div v-else class="blog-card__img-placeholder" />
          </div>
          <div class="blog-card__info">
            <span class="blog-card__date">{{ formatDate(post.createdAt) }}</span>
            <h2>{{ post.title }}</h2>
            <p>{{ post.excerpt }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-list {
  padding-top: 140px;
}

.blog-list__empty {
  padding: 80px 0;
  text-align: center;
  color: var(--text-gray);
}

.blog-list__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.blog-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  transition: var(--transition);
  background: white;
  display: block;
}

.blog-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-6px);
}

.blog-card__img-wrap {
  aspect-ratio: 16/10;
  overflow: hidden;
}

.blog-card__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-card__img-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary), var(--primary-700));
}

.blog-card__info {
  padding: 20px 22px;
}

.blog-card__date {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.blog-card__info h2 {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 8px 0;
}

.blog-card__info p {
  font-size: 13px;
  color: var(--text-gray);
  line-height: 1.65;
}

@media (max-width: 900px) {
  .blog-list__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .blog-list__grid { grid-template-columns: 1fr; }
}
</style>
