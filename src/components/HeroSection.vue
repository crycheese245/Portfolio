<script setup>
import { ref, onMounted } from 'vue'
import { animateCount } from '../composables/useScrollReveal'

const stats = [
  { value: 3, suffix: '+ năm', label: 'Kinh nghiệm' },
  { value: 10, suffix: '+', label: 'Dự án hoàn thành' },
  { value: 10, suffix: '+', label: 'Khách hàng hài lòng' },
]

const avatarSrc = '/images/avatar.jpg'
const countRefs = ref([])
const isLoaded = ref(false)

const authorSocialLinks = [
  {
    name: 'Facebook', url: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  },
  {
    name: 'GitHub', url: 'https://github.com/crycheese245',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
  },
  {
    name: 'Zalo', url: 'https://zalo.me/0352025524',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M20 2H4C2.9 2 2 2.9 2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 13H9.41l8.09-8H6V5h12l-8.09 8H18v2z"/></svg>`,
  },
  {
    name: 'YouTube', url: 'https://www.youtube.com/@cheehouse-245',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  },
]

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
    setTimeout(() => {
      countRefs.value.forEach((el, i) => {
        if (el) animateCount(el, stats[i].value, 1600, stats[i].suffix)
      })
    }, 800)
  }, 100)
})
</script>

<template>
  <section id="home" class="hero">
    <!-- Animated background blobs -->
    <div class="blob-wrap">
      <div class="blob blob--purple" />
      <div class="blob blob--pink" />
      <div class="blob blob--mint" />
      <div class="blob blob--peach" />
    </div>

    <div class="container hero__inner">
      <!-- Left: Text content -->
      <div class="hero__content">
        <div class="hero__badge" :class="{ 'hero__badge--show': isLoaded }">
          <span class="badge">
            <span class="badge__dot" />
            Đang nhận dự án mới
          </span>
        </div>

        <h1 class="hero__title" :class="{ 'hero__title--show': isLoaded }">
          Xin chào, chúng tôi là<br />
          <span class="hero__name">CheeHouse</span>
        </h1>

        <p class="hero__role" :class="{ 'hero__role--show': isLoaded }">
          CheeHouse chuyên <span class="hero__highlight">thiết kế website &amp; tự động hóa AI</span>
          cho cửa hàng nhỏ và cá nhân kinh doanh — từ web bán hàng chuẩn SEO đến chatbot Zalo/Messenger/Discord, mang đến trải nghiệm kỹ thuật số thông minh và hiệu quả.
        </p>

        <div class="hero__actions" :class="{ 'hero__actions--show': isLoaded }">
          <button class="btn btn-primary" onclick="document.getElementById('services').scrollIntoView({behavior:'smooth'})">
            Xem dịch vụ
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button class="btn btn-outline" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Nhận tư vấn
          </button>
        </div>

        <!-- Stats -->
        <div class="hero__stats" :class="{ 'hero__stats--show': isLoaded }">
          <div v-for="(stat, i) in stats" :key="i" class="hero__stat">
            <strong ref="countRefs" class="hero__stat-value">0{{ stat.suffix }}</strong>
            <span class="hero__stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Author card -->
    <div class="container">
      <div class="hero__author" :class="{ 'hero__author--show': isLoaded }">
        <div class="hero__author-top">
          <div class="hero__author-avatar-wrap">
            <img
              :src="avatarSrc"
              alt="CheeHouse"
              class="hero__author-avatar"
              @error="$event.target.style.display = 'none'"
            />
            <div class="hero__author-avatar-fallback">CH</div>
          </div>
          <div class="hero__author-info">
            <h3 class="hero__author-name">CheeHouse</h3>
            <p class="hero__author-label">Về chúng tôi</p>
            <p class="hero__author-tagline">Tận tâm - Chỉn chu - Giá hợp lý</p>
          </div>
        </div>
        <div class="hero__author-row">
          <button class="hero__author-link" onclick="document.getElementById('portfolio').scrollIntoView({behavior:'smooth'})">
            Xem tất cả dự án
          </button>
          <div class="hero__author-social">
            <a
              v-for="s in authorSocialLinks"
              :key="s.name"
              :href="s.url"
              :aria-label="s.name"
              class="hero__author-social-icon"
              target="_blank"
              rel="noopener"
            >
              <span v-html="s.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 56px;
  position: relative;
  padding: 64px 0 80px;
  overflow: hidden;
}

.hero__inner {
  position: relative;
  z-index: 1;
}

.hero__content {
  max-width: 700px;
}

/* ------ Content ------ */
.hero__badge {
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.hero__badge--show { opacity: 1; transform: translateY(0); }

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--primary-100);
  color: var(--primary);
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
}

.badge__dot {
  width: 8px;
  height: 8px;
  background: #10B981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
  50% { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
}

.hero__title {
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 900;
  color: var(--text-dark);
  line-height: 1.1;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s;
}
.hero__title--show { opacity: 1; transform: translateY(0); }

.hero__name {
  background: linear-gradient(135deg, #E879B0, #87CEEA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__role {
  font-size: 17px;
  color: var(--text-gray);
  line-height: 1.75;
  margin-bottom: 36px;
  max-width: 480px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
}
.hero__role--show { opacity: 1; transform: translateY(0); }

.hero__highlight {
  color: var(--primary);
  font-weight: 600;
}

.hero__actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 52px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s;
}
.hero__actions--show { opacity: 1; transform: translateY(0); }

/* ------ Stats ------ */
.hero__stats {
  display: flex;
  gap: 40px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s;
}
.hero__stats--show { opacity: 1; transform: translateY(0); }

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero__stat-value {
  font-size: 32px;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
}

.hero__stat-label {
  font-size: 13px;
  color: var(--text-gray);
  font-weight: 500;
}

.hero__stat + .hero__stat {
  padding-left: 40px;
  border-left: 1px solid var(--border);
}

/* ------ Author card ------ */
.hero__author {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 28px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
}
.hero__author--show { opacity: 1; transform: translateY(0); }

.hero__author-top {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hero__author-avatar-wrap {
  position: relative;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}

.hero__author-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  z-index: 1;
}

.hero__author-avatar-fallback {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--primary-100), var(--primary-200));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 900;
  color: var(--primary);
  z-index: 0;
}

.hero__author-avatar + .hero__author-avatar-fallback { display: none; }

.hero__author-name {
  font-size: 19px;
  font-weight: 800;
  color: var(--text-dark);
}

.hero__author-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--primary);
  margin: 2px 0;
}

.hero__author-tagline {
  font-size: 14px;
  color: var(--text-gray);
}

.hero__author-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.hero__author-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-style: italic;
}

.hero__author-social {
  display: flex;
  gap: 8px;
}

.hero__author-social-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-gray);
  transition: var(--transition);
}

.hero__author-social-icon:hover {
  background: var(--primary);
  color: white;
}

@media (max-width: 768px) {
  .hero { padding: 100px 0 60px; }
  .hero__inner { text-align: center; }

  .hero__content { max-width: 100%; }
  .hero__role { margin: 0 auto 36px; }
  .hero__actions { justify-content: center; }
  .hero__stats { justify-content: center; }

  .hero__author { flex-direction: column; text-align: center; }
  .hero__author-top { flex-direction: column; }
  .hero__author-row { flex-direction: column; gap: 12px; }
}
</style>
