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
          Xin chào, tôi là<br />
          <span class="hero__name">Hoàng Trí Dũng</span>
        </h1>

        <p class="hero__role" :class="{ 'hero__role--show': isLoaded }">
          Tôi là Full Stack Developer chuyên về <span class="hero__highlight">AI &amp; Automation</span>,
          tập trung xây dựng website và hệ thống Bot tự động hóa cho cửa hàng nhỏ, mang đến trải nghiệm kỹ thuật số thông minh và hiệu quả.
        </p>

        <div class="hero__actions" :class="{ 'hero__actions--show': isLoaded }">
          <button class="btn btn-primary" onclick="document.getElementById('portfolio').scrollIntoView({behavior:'smooth'})">
            Xem dự án
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <a class="btn btn-outline" href="/cv.pdf" download>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Tải CV
          </a>
        </div>

        <!-- Stats -->
        <div class="hero__stats" :class="{ 'hero__stats--show': isLoaded }">
          <div v-for="(stat, i) in stats" :key="i" class="hero__stat">
            <strong ref="countRefs" class="hero__stat-value">0{{ stat.suffix }}</strong>
            <span class="hero__stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <!-- Right: Profile photo -->
      <div class="hero__photo-wrap" :class="{ 'hero__photo-wrap--show': isLoaded }">
        <div class="hero__photo-frame">
          <img
            :src="avatarSrc"
            alt="Hoang Tri Dung"
            class="hero__photo"
            @error="$event.target.style.display = 'none'"
          />
          <div class="hero__photo-fallback">HTD</div>
          <!-- Floating card -->
          <div class="hero__card hero__card--tl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            <div>
              <strong>3+ Năm</strong>
              <span>Kinh nghiệm</span>
            </div>
          </div>
          <div class="hero__card hero__card--br">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <div>
              <strong>10+ Dự án</strong>
              <span>Đã hoàn thành</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 120px 0 80px;
  overflow: hidden;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
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

/* ------ Photo ------ */
.hero__photo-wrap {
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateX(60px) scale(0.95);
  transition: opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s;
}
.hero__photo-wrap--show { opacity: 1; transform: translateX(0) scale(1); }

.hero__photo-frame {
  position: relative;
  width: 420px;
  max-width: 100%;
}

.hero__photo {
  width: 100%;
  height: 520px;
  object-fit: cover;
  border-radius: var(--radius-xl);
  position: relative;
  z-index: 1;
}

.hero__photo-fallback {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--primary-100), var(--primary-200));
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  font-weight: 900;
  color: var(--primary);
  z-index: 0;
}

.hero__photo + .hero__photo-fallback { display: none; }

.hero__card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  border-radius: var(--radius);
  padding: 12px 18px;
  box-shadow: var(--shadow-lg);
  z-index: 2;
  animation: cardFloat 4s ease-in-out infinite;
}

.hero__card strong {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-dark);
}

.hero__card span {
  font-size: 12px;
  color: var(--text-gray);
}

.hero__card--tl {
  top: 40px;
  left: -30px;
  animation-delay: 0s;
}

.hero__card--br {
  bottom: 60px;
  right: -20px;
  animation-delay: 2s;
}

@keyframes cardFloat {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}

@media (max-width: 1024px) {
  .hero__photo-frame { width: 360px; }
  .hero__photo { height: 450px; }
  .hero__inner { gap: 40px; }
}

@media (max-width: 768px) {
  .hero { padding: 100px 0 60px; }
  .hero__inner { grid-template-columns: 1fr; text-align: center; }

  .hero__role { margin: 0 auto 36px; }
  .hero__actions { justify-content: center; }
  .hero__stats { justify-content: center; }

  .hero__photo-wrap { order: -1; }
  .hero__photo-frame { width: 280px; }
  .hero__photo { height: 340px; }
  .hero__card--tl { left: -10px; }
  .hero__card--br { right: -10px; }
}
</style>
