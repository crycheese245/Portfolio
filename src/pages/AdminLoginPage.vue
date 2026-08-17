<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminAuth } from '../composables/useAdminAuth.js'

const route = useRoute()
const router = useRouter()
const { login } = useAdminAuth()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await login(username.value.trim(), password.value)
    router.push(typeof route.query.redirect === 'string' ? route.query.redirect : '/quan-tri')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Đăng nhập thất bại'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="admin-login">
    <form class="admin-login__box" @submit.prevent="submit">
      <h1>Đăng nhập quản trị</h1>
      <p class="admin-login__sub">Khu vực quản lý bài viết blog — chỉ dành cho quản trị viên.</p>

      <label>
        <span>Tên đăng nhập</span>
        <input v-model="username" required autocomplete="username" />
      </label>
      <label>
        <span>Mật khẩu</span>
        <input v-model="password" type="password" required autocomplete="current-password" />
      </label>

      <p v-if="error" class="admin-login__error">{{ error }}</p>

      <button class="btn btn-primary" :disabled="loading" type="submit">
        {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
      </button>

      <RouterLink to="/" class="admin-login__back">← Về trang chủ</RouterLink>
    </form>
  </section>
</template>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--bg-light);
}

.admin-login__box {
  width: 100%;
  max-width: 380px;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 36px 32px;
  box-shadow: var(--shadow-lg);
}

.admin-login__box h1 {
  font-size: 22px;
  font-weight: 800;
  color: var(--text-dark);
}

.admin-login__sub {
  margin: 8px 0 28px;
  font-size: 14px;
  color: var(--text-gray);
  line-height: 1.6;
}

.admin-login__box label {
  display: block;
  margin-bottom: 18px;
}

.admin-login__box label span {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-dark);
}

.admin-login__box input {
  width: 100%;
  padding: 11px 14px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.admin-login__box input:focus {
  border-color: var(--primary);
}

.admin-login__error {
  margin-bottom: 16px;
  font-size: 13px;
  font-weight: 600;
  color: #dc2626;
}

.admin-login__box .btn {
  width: 100%;
  justify-content: center;
}

.admin-login__back {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-gray);
}

.admin-login__back:hover {
  color: var(--primary);
}
</style>
