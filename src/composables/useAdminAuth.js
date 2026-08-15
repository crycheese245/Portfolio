import { ref } from 'vue'
import { fetchMe, getToken, login as loginApi, logout as logoutApi } from '../api/blog.js'

const isAuthenticated = ref(false)
const username = ref('')
const checked = ref(false)

async function checkSession() {
  if (!getToken()) {
    isAuthenticated.value = false
    checked.value = true
    return
  }
  try {
    const me = await fetchMe()
    username.value = me.username
    isAuthenticated.value = true
  } catch {
    isAuthenticated.value = false
  } finally {
    checked.value = true
  }
}

async function login(user, pass) {
  const data = await loginApi(user, pass)
  username.value = data.username
  isAuthenticated.value = true
}

function logout() {
  logoutApi()
  isAuthenticated.value = false
  username.value = ''
}

export function useAdminAuth() {
  return { isAuthenticated, username, checked, checkSession, login, logout }
}
