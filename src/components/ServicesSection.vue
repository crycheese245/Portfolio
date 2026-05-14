<script setup>
import { ref } from 'vue'

const activeService = ref(0)

const services = [
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    title: 'Phát triển Web',
    desc: 'Xây dựng website chuẩn SEO, hiệu năng cao với Vue 3, Node.js và MySQL. Giao diện đẹp, tốc độ nhanh, dễ quản lý nội dung.',
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
    title: 'Phát triển BotAutomation',
    desc: 'Xây dựng hệ thống Bot tự động chăm sóc khách hàng 24/7 trên Messenger, Zalo và Discord. Tích hợp công nghệ AI thông minh để xử lý hội thoại tự nhiên, giúp cửa hàng vận hành trơn tru và tối ưu chi phí nhân sự.',
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
    title: 'Tích hợp AI & Tự động hóa',
    desc: 'Tích hợp các mô hình AI (ChatGPT, Gemini) vào hệ thống kinh doanh của bạn. Tự động hóa quy trình đặt hàng, phân loại yêu cầu, gửi thông báo — tiết kiệm thời gian và chi phí vận hành.',
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>`,
    title: 'Phát triển Mobile',
    desc: 'Sở hữu ứng dụng di động riêng chuyên nghiệp trên cả iPhone và Android nhờ công nghệ Flutter. Tôi giúp bạn tiếp cận khách hàng mọi lúc mọi nơi với ứng dụng có tốc độ cao, giao diện đẹp mắt và dễ dàng quản lý.',
  },
]

const toggle = (i) => {
  activeService.value = activeService.value === i ? -1 : i
}
</script>

<template>
  <section id="services" class="section services">
    <div class="container">
      <div class="services__layout">
        <!-- Left -->
        <div class="services__left reveal-left">
          <p class="tag">DỊCH VỤ</p>
          <h2 class="section-title" style="text-align:left">Giải pháp tôi mang lại</h2>
          <p class="section-subtitle" style="text-align:left">
            Thiết kế và phát triển các sản phẩm web tích hợp Trí tuệ nhân tạo. Giải pháp toàn diện từ giao diện chuyên nghiệp đến hệ thống vận hành tự động đa nền tảng.
          </p>
          <button
            class="btn btn-primary"
            style="margin-top:32px"
            onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})"
          >
            Bắt đầu dự án
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>

        <!-- Right: accordion -->
        <div class="services__right reveal-right">
          <div
            v-for="(svc, i) in services"
            :key="i"
            class="services__item"
            :class="{ 'services__item--active': activeService === i }"
            @click="toggle(i)"
          >
            <div class="services__header">
              <div class="services__icon-wrap" v-html="svc.icon" />
              <h3 class="services__title">{{ svc.title }}</h3>
              <div class="services__chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline :points="activeService === i ? '18 15 12 9 6 15' : '6 9 12 15 18 9'" />
                </svg>
              </div>
            </div>
            <div class="services__body" :class="{ 'services__body--open': activeService === i }">
              <p>{{ svc.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services__layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: start;
}

/* ---- Accordion ---- */
.services__item {
  border-radius: var(--radius);
  border: 1.5px solid var(--border);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s;
  margin-bottom: 12px;
}

.services__item:last-child { margin-bottom: 0; }

.services__item--active {
  border-color: var(--primary);
  box-shadow: 0 4px 20px rgba(124,58,237,0.12);
}

.services__header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 20px;
  position: relative;
}

.services__item--active .services__header {
  background: var(--primary-100);
}

.services__icon-wrap {
  width: 44px;
  height: 44px;
  background: var(--primary-100);
  color: var(--primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: var(--transition);
}

.services__item--active .services__icon-wrap {
  background: var(--primary);
  color: white;
}

.services__title {
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-dark);
}

.services__chevron {
  color: var(--text-gray);
  transition: transform 0.3s;
  flex-shrink: 0;
}

.services__item--active .services__chevron {
  color: var(--primary);
}

.services__body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
  padding: 0 20px;
}

.services__body--open {
  max-height: 200px;
  padding: 12px 20px 20px;
}

.services__body p {
  font-size: 14px;
  color: var(--text-gray);
  line-height: 1.75;
  padding-left: 58px;
  text-align: justify;
}

/* Left border accent for active */
.services__item--active {
  border-left: 4px solid var(--primary);
}

@media (max-width: 900px) {
  .services__layout { grid-template-columns: 1fr; gap: 48px; }
}
</style>
