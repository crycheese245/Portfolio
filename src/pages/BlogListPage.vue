<script setup>
import { computed, onMounted, ref } from 'vue'
import { fetchPosts } from '../api/blog.js'

const posts = ref([])
const loading = ref(true)
const error = ref('')

const featuredPost = computed(() => posts.value[0] ?? null)
const restPosts = computed(() => posts.value.slice(1))

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
      <div class="section-header">
        <p class="tag">Blog</p>
        <h1 class="section-title">Bài viết & Case Study</h1>
        <p class="section-subtitle">
          Ghi chép về những vấn đề kỹ thuật thật đã gặp và cách giải quyết trong quá trình xây dựng sản phẩm.
        </p>
      </div>

      <p v-if="loading" class="blog-list__empty">Đang tải...</p>
      <p v-else-if="error" class="blog-list__empty">{{ error }}</p>
      <p v-else-if="posts.length === 0" class="blog-list__empty">Chưa có bài viết nào, quay lại sau nhé.</p>

      <template v-else>
        <RouterLink :to="`/blog/${featuredPost.slug}`" class="blog-featured">
          <div class="blog-featured__img-wrap">
            <img v-if="featuredPost.coverImage" :src="featuredPost.coverImage" :alt="featuredPost.title" loading="lazy" />
            <div v-else class="blog-card__img-placeholder" />
          </div>
          <div class="blog-featured__info">
            <span class="tag" style="font-size:11px">Bài viết mới nhất</span>
            <span class="blog-card__date">{{ formatDate(featuredPost.createdAt) }}</span>
            <h2>{{ featuredPost.title }}</h2>
            <p>{{ featuredPost.excerpt }}</p>
            <span class="blog-featured__cta">
              Đọc bài viết
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </RouterLink>

        <div v-if="restPosts.length" class="blog-list__grid">
          <RouterLink v-for="post in restPosts" :key="post.id" :to="`/blog/${post.slug}`" class="blog-card">
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
      </template>
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

.blog-featured {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 40px;
  align-items: center;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  background: white;
  overflow: hidden;
  margin-bottom: 44px;
  transition: var(--transition);
}

.blog-featured:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.blog-featured__img-wrap {
  aspect-ratio: 4/3;
  overflow: hidden;
}

.blog-featured__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-featured__info {
  padding: 12px 40px 12px 0;
}

.blog-featured__info .blog-card__date {
  margin-left: 10px;
}

.blog-featured__info h2 {
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 800;
  color: var(--text-dark);
  line-height: 1.3;
  margin: 14px 0 12px;
}

.blog-featured__info p {
  font-size: 15px;
  color: var(--text-gray);
  line-height: 1.75;
}

.blog-featured__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 700;
  color: var(--primary);
}

@media (max-width: 800px) {
  .blog-featured {
    grid-template-columns: 1fr;
  }

  .blog-featured__info {
    padding: 0 24px 24px;
  }
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
