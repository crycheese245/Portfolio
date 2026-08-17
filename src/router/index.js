import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import { useAdminAuth } from '../composables/useAdminAuth.js'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/du-an/cheeemu',
    name: 'project-cheeemu',
    component: () => import('../pages/ProjectCheeEmuPage.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../pages/BlogListPage.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('../pages/BlogPostPage.vue'),
  },
  {
    path: '/chinh-sach-bao-mat',
    name: 'privacy',
    component: () => import('../pages/PrivacyPolicyPage.vue'),
  },
  {
    path: '/dieu-khoan-dich-vu',
    name: 'terms',
    component: () => import('../pages/TermsPage.vue'),
  },
  {
    path: '/quan-tri/dang-nhap',
    name: 'admin-login',
    component: () => import('../pages/AdminLoginPage.vue'),
  },
  {
    path: '/quan-tri',
    name: 'admin-dashboard',
    component: () => import('../pages/AdminDashboardPage.vue'),
    meta: { requiresAdmin: true },
  },
  {
    path: '/quan-tri/bai-viet/moi',
    name: 'admin-post-new',
    component: () => import('../pages/AdminPostEditorPage.vue'),
    meta: { requiresAdmin: true },
  },
  {
    path: '/quan-tri/bai-viet/:id',
    name: 'admin-post-edit',
    component: () => import('../pages/AdminPostEditorPage.vue'),
    meta: { requiresAdmin: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAdmin) return true

  const { isAuthenticated, checked, checkSession } = useAdminAuth()
  if (!checked.value) await checkSession()

  if (!isAuthenticated.value) {
    return { path: '/quan-tri/dang-nhap', query: { redirect: to.fullPath } }
  }

  return true
})

export default router
