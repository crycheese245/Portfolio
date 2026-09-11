<script setup>
import { ref, onMounted } from 'vue'
import { animateCount } from '../composables/useScrollReveal'

const stats = [
  { value: 3, suffix: '+ năm', label: 'Kinh nghiệm' },
  { value: 10, suffix: '+', label: 'Dự án hoàn thành' },
  { value: 10, suffix: '+', label: 'Khách hàng hài lòng' },
]

const heroServices = [
  {
    label: 'Phát triển Web',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  },
  {
    label: 'Bot & Automation',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  },
  {
    label: 'Tích hợp AI',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
  },
  {
    label: 'Phát triển Mobile',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>`,
  },
]

const countRefs = ref([])
const isLoaded = ref(false)

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

      <!-- Right: Service highlights -->
      <div class="hero__services" :class="{ 'hero__services--show': isLoaded }">
        <div
          v-for="(service, i) in heroServices"
          :key="service.label"
          class="hero__service-card"
          :style="{ animationDelay: `${i * 0.6}s` }"
        >
          <div class="hero__service-icon" v-html="service.icon" />
          <span>{{ service.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 88vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 64px 0 80px;
  overflow: hidden;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* ------ Service highlights ------ */
.hero__services {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s;
}
.hero__services--show { opacity: 1; transform: translateX(0); }

.hero__service-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 24px 20px;
  border-radius: var(--radius-lg);
  background: white;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  font-size: 14px;
  font-weight: 700;
  color: var(--text-dark);
  animation: heroServiceFloat 5s ease-in-out infinite;
}

.hero__service-card:nth-child(even) { margin-top: 28px; }

.hero__service-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  background: var(--primary-100);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes heroServiceFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
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

@media (max-width: 1024px) {
  .hero__inner { grid-template-columns: 1fr; }
  .hero__services { max-width: 420px; margin: 0 auto; }
}

@media (max-width: 768px) {
  .hero { padding: 100px 0 60px; }
  .hero__inner { text-align: center; }

  .hero__role { margin: 0 auto 36px; }
  .hero__actions { justify-content: center; }
  .hero__stats { justify-content: center; }

  .hero__service-card { align-items: center; text-align: center; }
  .hero__service-card:nth-child(even) { margin-top: 0; }
}
</style>
