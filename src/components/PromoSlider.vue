<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const slides = [
  {
    key: 'emu',
    eyebrow: 'Sản phẩm nổi bật',
    title: 'CheeEmu — Chơi game Java J2ME ngay trên trình duyệt',
    desc: 'Kho game huyền thoại thời "cục gạch", chơi trực tiếp không cần cài đặt. Có tài khoản lưu tiến trình, chơi online và cộng đồng người chơi.',
    cta: 'Vào chơi ngay',
    href: 'https://emu.cheehouse.io.vn',
    image: '/images/Project_AppRunEmu.png',
    theme: 'emu',
  },
  {
    key: 'store',
    eyebrow: 'Cửa hàng',
    title: 'CheeStore — Mua sắm chính hãng, giá tốt',
    desc: 'Trang bán hàng của CheeHouse. Sản phẩm được tuyển chọn, thanh toán tiện lợi và hỗ trợ nhanh.',
    cta: 'Ghé cửa hàng',
    href: 'https://store.cheehouse.io.vn',
    image: '/images/Project_PMChatAI_API.png',
    theme: 'store',
  },
]

const active = ref(0)
const AUTOPLAY_MS = 6000
let timer = null

const go = (i) => {
  active.value = (i + slides.length) % slides.length
  restart()
}
const next = () => go(active.value + 1)
const prev = () => go(active.value - 1)

const restart = () => {
  stop()
  timer = window.setInterval(next, AUTOPLAY_MS)
}
const stop = () => {
  if (timer) window.clearInterval(timer)
  timer = null
}

onMounted(restart)
onUnmounted(stop)
</script>

<template>
  <section class="promo" @mouseenter="stop" @mouseleave="restart">
    <div class="container">
      <div class="promo__viewport">
        <div class="promo__track" :style="{ transform: `translateX(-${active * 100}%)` }">
          <a
            v-for="slide in slides"
            :key="slide.key"
            class="promo__slide"
            :class="`promo__slide--${slide.theme}`"
            :href="slide.href"
            target="_blank"
            rel="noopener"
          >
            <div class="promo__body">
              <span class="promo__eyebrow">{{ slide.eyebrow }}</span>
              <h2 class="promo__title">{{ slide.title }}</h2>
              <p class="promo__desc">{{ slide.desc }}</p>
              <span class="btn btn-primary promo__cta">
                {{ slide.cta }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
            <div class="promo__media">
              <img :src="slide.image" :alt="slide.title" @error="$event.target.style.visibility = 'hidden'" />
            </div>
          </a>
        </div>
      </div>

      <button class="promo__arrow promo__arrow--prev" aria-label="Slide trước" @click.prevent="prev">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="promo__arrow promo__arrow--next" aria-label="Slide kế" @click.prevent="next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <div class="promo__dots">
        <button
          v-for="(slide, i) in slides"
          :key="slide.key"
          class="promo__dot"
          :class="{ 'promo__dot--active': i === active }"
          :aria-label="`Chuyển tới slide ${i + 1}`"
          @click="go(i)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.promo {
  position: relative;
  padding: 100px 0 8px;
}

@media (max-width: 768px) {
  .promo { padding: 88px 0 4px; }
}

.promo__viewport {
  overflow: hidden;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.promo__track {
  display: flex;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.promo__slide {
  flex: 0 0 100%;
  min-width: 100%;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 32px;
  padding: 44px 48px;
  color: var(--text-dark);
}

.promo__slide--emu {
  background: linear-gradient(120deg, var(--primary-100), var(--secondary-blue));
}
.promo__slide--store {
  background: linear-gradient(120deg, var(--secondary-mint), var(--primary-100));
}

.promo__eyebrow {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.7);
  color: var(--primary-700);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.promo__title {
  font-size: clamp(20px, 2.6vw, 30px);
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 12px;
}

.promo__desc {
  font-size: 15px;
  color: var(--text-gray);
  line-height: 1.7;
  margin-bottom: 24px;
  max-width: 460px;
}

.promo__cta {
  padding: 12px 24px;
  font-size: 14px;
  pointer-events: none;
}

.promo__media {
  display: flex;
  justify-content: center;
}

.promo__media img {
  width: 100%;
  max-width: 340px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.promo__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-dark);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
}
.promo__arrow:hover { background: #fff; }
.promo__arrow--prev { left: 8px; }
.promo__arrow--next { right: 8px; }

.promo__dots {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
}

.promo__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
  transition: width 0.25s, background 0.25s;
}
.promo__dot--active {
  width: 24px;
  border-radius: 100px;
  background: var(--primary);
}

@media (max-width: 900px) {
  .promo__slide {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 36px 28px;
  }
  .promo__desc { margin-left: auto; margin-right: auto; }
  .promo__media { order: -1; }
  .promo__media img { max-width: 240px; }
  .promo__arrow { display: none; }
}
</style>
