<script setup>
const steps = [
  {
    num: '01',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
    title: 'Phân tích & Tư vấn',
    desc: 'Lắng nghe nhu cầu kinh doanh của bạn để đề xuất giải pháp công nghệ phù hợp nhất. Tôi tập trung vào việc tìm ra cách tối ưu hóa vận hành, dù đó là một website bán hàng hay một hệ thống tự động hóa bằng AI.',
  },
  {
    num: '02',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    title: 'Giải pháp & Kỹ thuật',
    desc: 'Xây dựng cấu trúc hệ thống và lựa chọn công nghệ lõi. Tại đây, tôi sẽ thiết kế kịch bản cho Chatbot (Zalo/Messenger/Discord) hoặc tích hợp các mô hình AI để giải quyết đúng bài toán mà bạn đang gặp phải.',
  },
  {
    num: '03',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>`,
    title: 'Phát triển & Tối ưu',
    desc: 'Tiến hành lập trình và xây dựng giao diện. Tôi đảm bảo sản phẩm không chỉ có code sạch, hoạt động ổn định mà còn phải dễ dàng sử dụng đối với cả chủ cửa hàng và khách hàng cuối.',
  },
  {
    num: '04',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.93a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>`,
    title: 'Triển khai & Đồng hành',
    desc: 'Bàn giao sản phẩm hoàn thiện và hướng dẫn bạn cách làm chủ công nghệ. Tôi luôn sẵn sàng hỗ trợ kỹ thuật, bảo trì và nâng cấp tính năng để sản phẩm luôn mang lại giá trị bền vững cho bạn.',
  },
]
</script>

<template>
  <section id="process" class="section section--light process">
    <div class="container">
      <div class="process__layout">
        <!-- Left: heading -->
        <div class="process__heading reveal-left">
          <p class="tag">Cách tôi làm việc</p>
          <h2 class="section-title" style="text-align:left">
            Quy trình làm việc
          </h2>
          <p class="section-subtitle" style="text-align:left">
            Từ ý tưởng đến sản phẩm thực tế chỉ qua 4 bước chuyên nghiệp. Tôi đồng hành cùng bạn để đưa AI và tự động hóa vào quy trình bán hàng hằng ngày.
          </p>
        </div>

        <!-- Right: steps grid -->
        <div class="process__grid">
          <div
            v-for="(step, i) in steps"
            :key="step.num"
            class="process__card reveal"
            :class="`delay-${i + 1}`"
          >
            <div class="process__card-top">
              <div class="process__icon" v-html="step.icon" />
              <span class="process__num">{{ step.num }}</span>
            </div>
            <h3 class="process__title">{{ step.title }}</h3>
            <p class="process__desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process__layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  align-items: center;
}

.process__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.process__card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  border: 1px solid var(--border);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.process__card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--primary-100), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.process__card:hover {
  border-color: var(--primary-200);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.process__card:hover::before { opacity: 1; }

.process__card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.process__icon {
  width: 52px;
  height: 52px;
  background: var(--primary-100);
  color: var(--primary);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.process__card:hover .process__icon {
  background: var(--primary);
  color: white;
}

.process__num {
  font-size: 36px;
  font-weight: 900;
  color: var(--border);
  line-height: 1;
  transition: color 0.3s;
}

.process__card:hover .process__num { color: var(--primary-200); }

.process__title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
}

.process__desc {
  font-size: 14px;
  color: var(--text-gray);
  line-height: 1.75;
  position: relative;
  z-index: 1;
}

@media (max-width: 1024px) {
  .process__layout { grid-template-columns: 1fr; gap: 48px; }
}

@media (max-width: 600px) {
  .process__grid { grid-template-columns: 1fr; }
}
</style>
