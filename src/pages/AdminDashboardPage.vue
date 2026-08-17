<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { deletePost, fetchAdminPosts } from '../api/blog.js'
import { useAdminAuth } from '../composables/useAdminAuth.js'

const router = useRouter()
const { username, logout } = useAdminAuth()

const posts = ref([])
const loading = ref(true)
const error = ref('')
const deletingId = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    posts.value = await fetchAdminPosts()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Không tải được danh sách bài viết'
  } finally {
    loading.value = false
  }
}

async function remove(post) {
  if (!window.confirm(`Xoá bài viết "${post.title}"? Không thể hoàn tác.`)) return
  deletingId.value = post.id
  try {
    await deletePost(post.id)
    posts.value = posts.value.filter((p) => p.id !== post.id)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Xoá thất bại'
  } finally {
    deletingId.value = ''
  }
}

function doLogout() {
  logout()
  router.push('/quan-tri/dang-nhap')
}

function formatDate(value) {
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value))
}

onMounted(load)
</script>

<template>
  <section class="admin-dash">
    <div class="admin-dash__head">
      <div>
        <p class="tag">Quản trị</p>
        <h1>Bài viết blog</h1>
        <p class="admin-dash__user">Đăng nhập: {{ username }}</p>
      </div>
      <div class="admin-dash__actions">
        <RouterLink to="/quan-tri/bai-viet/moi" class="btn btn-primary">+ Bài viết mới</RouterLink>
        <button class="btn btn-outline" @click="doLogout">Đăng xuất</button>
      </div>
    </div>

    <p v-if="error" class="admin-dash__error">{{ error }}</p>
    <p v-if="loading" class="admin-dash__empty">Đang tải...</p>
    <p v-else-if="posts.length === 0" class="admin-dash__empty">Chưa có bài viết nào.</p>

    <div v-else class="admin-dash__list">
      <div v-for="post in posts" :key="post.id" class="admin-dash__row">
        <div class="admin-dash__row-info">
          <span class="admin-dash__status" :class="{ 'is-published': post.published }">
            {{ post.published ? 'Đã đăng' : 'Nháp' }}
          </span>
          <div>
            <strong>{{ post.title }}</strong>
            <span class="admin-dash__date">{{ formatDate(post.createdAt) }}</span>
          </div>
        </div>
        <div class="admin-dash__row-actions">
          <RouterLink v-if="post.published" :to="`/blog/${post.slug}`" target="_blank" class="admin-dash__link">Xem</RouterLink>
          <RouterLink :to="`/quan-tri/bai-viet/${post.id}`" class="admin-dash__link">Sửa</RouterLink>
          <button class="admin-dash__link admin-dash__link--danger" :disabled="deletingId === post.id" @click="remove(post)">
            {{ deletingId === post.id ? 'Đang xoá...' : 'Xoá' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.admin-dash {
  max-width: 900px;
  margin: 0 auto;
  padding: 140px 24px 80px;
}

.admin-dash__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.admin-dash__head h1 {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-dark);
  margin: 8px 0 4px;
}

.admin-dash__user {
  font-size: 13px;
  color: var(--text-gray);
}

.admin-dash__actions {
  display: flex;
  gap: 10px;
}

.admin-dash__error {
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #dc2626;
}

.admin-dash__empty {
  padding: 60px 0;
  text-align: center;
  color: var(--text-gray);
}

.admin-dash__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.admin-dash__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: white;
  flex-wrap: wrap;
}

.admin-dash__row-info {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.admin-dash__row-info strong {
  display: block;
  color: var(--text-dark);
  font-size: 15px;
}

.admin-dash__date {
  font-size: 12px;
  color: var(--text-gray);
}

.admin-dash__status {
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  background: var(--bg-light);
  color: var(--text-gray);
}

.admin-dash__status.is-published {
  background: rgba(232, 121, 176, 0.14);
  color: var(--primary);
}

.admin-dash__row-actions {
  display: flex;
  gap: 16px;
  flex-shrink: 0;
}

.admin-dash__link {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-gray);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.admin-dash__link:hover {
  color: var(--primary);
}

.admin-dash__link--danger:hover {
  color: #dc2626;
}
</style>
