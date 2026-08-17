const TOKEN_KEY = 'cheehouse.admin.token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`/api${path}`, { ...options, headers })
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.message || `Request failed (${response.status})`)
  }

  return payload.data
}

// ── Public ──────────────────────────────────────────────────────────────────

export function fetchPosts() {
  return request('/posts')
}

export function fetchPost(slug) {
  return request(`/posts/${encodeURIComponent(slug)}`)
}

// ── Admin auth ───────────────────────────────────────────────────────────────

export async function login(username, password) {
  const data = await request('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  setToken(data.token)
  return data
}

export function fetchMe() {
  return request('/admin/me')
}

export function logout() {
  setToken('')
}

// ── Admin posts ──────────────────────────────────────────────────────────────

export function fetchAdminPosts() {
  return request('/admin/posts')
}

export function fetchAdminPost(id) {
  return request(`/admin/posts/${id}`)
}

export function createPost(payload) {
  return request('/admin/posts', { method: 'POST', body: JSON.stringify(payload) })
}

export function updatePost(id, payload) {
  return request(`/admin/posts/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
}

export function deletePost(id) {
  return request(`/admin/posts/${id}`, { method: 'DELETE' })
}

export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  const data = await request('/admin/upload', { method: 'POST', body: formData })
  return data.url
}
