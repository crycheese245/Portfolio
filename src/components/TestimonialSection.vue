<script setup>
import { ref, computed } from 'vue'

const testimonials = [
  {
    text: 'Phần mềm rất dễ sử dụng, ngay cả với những nhân viên không rành công nghệ tại đại lý của tôi. Dũng hỗ trợ rất tận tâm, đảm bảo hệ thống luôn hoạt động ổn định. Đây thực sự là công cụ đắc lực giúp tôi quản lý hàng nghìn tờ vé mỗi ngày mà không sợ sai sót.',
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

const current = ref(0)
const active = computed(() => testimonials[current.value])

const prev = () => { current.value = (current.value - 1 + testimonials.length) % testimonials.length }
const next = () => { current.value = (current.value + 1) % testimonials.length }
</script>

<template>
  <section class="section testimonial">
    <div class="container">
      <div class="section-header reveal">
        <p class="tag">Đánh giá khách hàng</p>
        <h2 class="section-title">Nhận xét</h2>
        <p class="section-subtitle">
          Những phản hồi thực tế từ khách hàng đã tin tưởng hợp tác cùng tôi
          trong các dự án thiết kế và phát triển sản phẩm.
        </p>
      </div>

      <div class="testimonial__wrap reveal">
        <div class="testimonial__card">
          <!-- Stars -->
          <div class="testimonial__stars">
            <svg v-for="i in active.rating" :key="i" width="18" height="18" viewBox="0 0 24 24" fill="#FBBF24" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>

          <blockquote class="testimonial__quote">
            "{{ active.text }}"
          </blockquote>

          <div class="testimonial__author">
            <div class="testimonial__avatar">{{ active.avatar }}</div>
            <div>
              <strong class="testimonial__name">{{ active.name }}</strong>
              <span class="testimonial__role">{{ active.role }}</span>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="testimonial__nav">
          <button class="testimonial__btn" @click="prev">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          <div class="testimonial__dots">
            <button
              v-for="(_, i) in testimonials"
              :key="i"
              class="testimonial__dot"
              :class="{ 'testimonial__dot--active': current === i }"
              @click="current = i"
            />
          </div>

          <button class="testimonial__btn" @click="next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial__wrap {
  max-width: 760px;
  margin: 0 auto;
}

.testimonial__card {
  background: var(--bg-light);
  border-radius: var(--radius-xl);
  padding: 52px 56px;
  text-align: center;
  border: 1px solid var(--border);
  position: relative;
}

.testimonial__card::before {
  content: '"';
  position: absolute;
  top: 24px;
  left: 48px;
  font-size: 120px;
  line-height: 1;
  color: var(--primary-200);
  font-family: Georgia, serif;
  font-weight: 700;
}

.testimonial__stars {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 24px;
}

.testimonial__quote {
  font-size: 18px;
  line-height: 1.8;
  color: var(--text-gray);
  font-style: italic;
  margin-bottom: 36px;
  position: relative;
  z-index: 1;
}

.testimonial__author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.testimonial__avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E879B0, #87CEEA);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
}

.testimonial__name {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-dark);
  text-align: left;
}

.testimonial__role {
  font-size: 13px;
  color: var(--text-gray);
}

/* Navigation */
.testimonial__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 32px;
}

.testimonial__btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-gray);
  transition: var(--transition);
}

.testimonial__btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  transform: scale(1.05);
}

.testimonial__dots {
  display: flex;
  gap: 8px;
}

.testimonial__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: var(--border);
  cursor: pointer;
  transition: var(--transition);
}

.testimonial__dot--active {
  background: var(--primary);
  width: 28px;
  border-radius: 5px;
}

@media (max-width: 600px) {
  .testimonial__card { padding: 36px 24px; }
  .testimonial__card::before { font-size: 80px; left: 24px; }
  .testimonial__quote { font-size: 16px; }
}
</style>
