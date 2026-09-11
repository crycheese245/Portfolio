<script setup>
const testimonials = [
  {
    text: 'Phần mềm rất dễ sử dụng, ngay cả với những nhân viên không rành công nghệ tại đại lý của tôi. Đội ngũ CheeHouse hỗ trợ rất tận tâm, đảm bảo hệ thống luôn hoạt động ổn định. Đây thực sự là công cụ đắc lực giúp tôi quản lý hàng nghìn tờ vé mỗi ngày mà không sợ sai sót.',
    name: 'Hữu Nhật',
    role: 'Chủ đại lý vé số Hữu Nhật',
    avatar: 'HN',
    rating: 5,
  },
  {
    text: 'Trời ơi, tìm mãi mới thấy một web chạy được game Java mượt thế này! Nhìn giao diện là thấy cả bầu trời tuổi thơ ùa về. Hồi xưa trốn ba mẹ thức đêm cày game trên con Nokia, giờ được chơi lại ngay trên trình duyệt mà không cần cài đặt gì, cảm động thực sự. Cảm ơn tác giả nhiều nhé!',
    name: 'Thiên Ngân',
    role: 'Giáo viên tiểu học',
    avatar: 'TN',
    rating: 5,
  },
  {
    text: 'Tính năng theo dõi Market Place là đỉnh nhất! Mình có thể cập nhật giá cả thị trường liên tục để chọn thời điểm xả hàng tốt nhất. Nhờ vậy mà việc quản lý tài sản và chia lợi nhuận với bạn bè trong nhóm chơi chung trở nên minh bạch và dễ dàng hơn nhiều. Không còn cảnh phải ngồi check giá thủ công từng món nữa.',
    name: 'Thẩm Quang Minh',
    role: 'Game thủ MapleStory N',
    avatar: 'QM',
    rating: 5,
  },
]

// Duplicated once so the marquee track can loop seamlessly (translate -50%
// lands exactly back on an identical copy) - same 3 real testimonials, not
// fabricated ones.
const marqueeItems = [...testimonials, ...testimonials]
</script>

<template>
  <section class="section testimonial">
    <div class="container">
      <div class="section-header reveal">
        <p class="tag">Đánh giá khách hàng</p>
        <h2 class="section-title">Nhận xét</h2>
        <p class="section-subtitle">
          Những phản hồi thực tế từ khách hàng đã tin tưởng hợp tác cùng CheeHouse
          trong các dự án thiết kế và phát triển sản phẩm.
        </p>
      </div>

      <div class="testimonial__marquee reveal">
        <div class="testimonial__track">
          <div v-for="(t, i) in marqueeItems" :key="i" class="testimonial-card">
            <div class="testimonial-card__top">
              <strong class="testimonial-card__name">{{ t.name }}</strong>
              <span class="testimonial-card__badge">{{ t.avatar }}</span>
            </div>

            <div class="testimonial-card__stars">
              <svg v-for="s in t.rating" :key="s" width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>

            <p class="testimonial-card__text">"{{ t.text }}"</p>

            <span class="testimonial-card__role">{{ t.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial__marquee {
  overflow: hidden;
  margin-top: 56px;
  -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
  mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
}

.testimonial__track {
  display: flex;
  gap: 24px;
  width: max-content;
  animation: testimonialMarquee 34s linear infinite;
}

.testimonial__marquee:hover .testimonial__track {
  animation-play-state: paused;
}

@keyframes testimonialMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.testimonial-card {
  flex-shrink: 0;
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--shadow);
}

.testimonial-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.testimonial-card__name {
  font-size: 16px;
  font-weight: 800;
  color: var(--text-dark);
}

.testimonial-card__badge {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #E879B0, #87CEEA);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.testimonial-card__stars {
  display: flex;
  gap: 2px;
}

.testimonial-card__text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-gray);
  font-style: italic;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.testimonial-card__role {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--border);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-dark);
}

@media (max-width: 600px) {
  .testimonial-card { width: 270px; padding: 22px; }
}
</style>
