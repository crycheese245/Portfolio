<script setup>
import { ref } from 'vue'

const blogs = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/blog1/600/400',
    date: '22 Tháng 10, 2024',
    comments: 12,
    title: 'Cách xây dựng Portfolio ấn tượng trong năm 2024',
    desc: 'Những nguyên tắc then chốt giúp portfolio của bạn nổi bật trước khách hàng và nhà tuyển dụng.',
    category: 'Thiết kế',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/blog2/600/400',
    date: '15 Tháng 9, 2024',
    comments: 8,
    title: 'Tối ưu hiệu suất Vue 3 mà mọi Developer cần biết',
    desc: 'Khám phá những kỹ thuật tối ưu Vue 3 hiệu quả nhất để ứng dụng chạy nhanh vượt trội.',
    category: 'Lập trình',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/blog3/600/400',
    date: '05 Tháng 8, 2024',
    comments: 24,
    title: 'Tương lai UI/UX: Quy trình thiết kế hỗ trợ bởi AI',
    desc: 'Trí tuệ nhân tạo đang thay đổi cách các designer tiếp cận và giải quyết bài toán phức tạp.',
    category: 'UI/UX',
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/blog4/600/400',
    date: '18 Tháng 7, 2024',
    comments: 17,
    title: 'Xây dựng Website Tiếp cận Toàn diện: Hướng dẫn thực tế',
    desc: 'Các bước thực tế để đảm bảo dự án web của bạn thân thiện và đạt chuẩn WCAG.',
    category: 'Lập trình',
  },
]

const activeDot = ref(0)
</script>

<template>
  <section id="blog" class="section blog">
    <div class="container">
      <div class="section-header reveal">
        <p class="tag">Bài viết mới nhất</p>
        <h2 class="section-title">Blog</h2>
        <p class="section-subtitle">
          Tôi chia sẻ kiến thức, kinh nghiệm và những xu hướng mới nhất trong lĩnh vực
          thiết kế và phát triển web qua các bài viết của mình.
        </p>
      </div>

      <div class="blog__grid">
        <article
          v-for="(post, i) in blogs"
          :key="post.id"
          class="blog__card reveal"
          :class="`delay-${i + 1}`"
        >
          <div class="blog__img-wrap">
            <img :src="post.image" :alt="post.title" class="blog__img" loading="lazy" />
            <span class="blog__cat">{{ post.category }}</span>
          </div>
          <div class="blog__body">
            <div class="blog__meta">
              <span class="blog__meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {{ post.date }}
              </span>
              <span class="blog__meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                {{ post.comments }} Bình luận
              </span>
            </div>
            <h3 class="blog__title">{{ post.title }}</h3>
            <p class="blog__desc">{{ post.desc }}</p>
            <a href="#" class="blog__link">
              Đọc thêm
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </article>
      </div>

      <!-- Dots -->
      <div class="blog__dots reveal">
        <button
          v-for="i in 3"
          :key="i"
          class="blog__dot"
          :class="{ 'blog__dot--active': activeDot === i - 1 }"
          @click="activeDot = i - 1"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.blog__card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  background: white;
  transition: var(--transition);
}

.blog__card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-5px);
}

.blog__img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/10;
}

.blog__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog__card:hover .blog__img { transform: scale(1.06); }

.blog__cat {
  position: absolute;
  top: 14px;
  left: 14px;
  background: var(--primary);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 100px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.blog__body {
  padding: 20px;
}

.blog__meta {
  display: flex;
  gap: 14px;
  margin-bottom: 12px;
}

.blog__meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--text-light);
}

.blog__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1.4;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog__desc {
  font-size: 13px;
  color: var(--text-gray);
  line-height: 1.65;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--primary);
  font-size: 13px;
  font-weight: 600;
  transition: gap 0.2s;
}

.blog__link:hover { gap: 10px; }

.blog__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
}

.blog__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: var(--border);
  cursor: pointer;
  transition: var(--transition);
}

.blog__dot--active {
  background: var(--primary);
  width: 28px;
  border-radius: 5px;
}

@media (max-width: 1100px) { .blog__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .blog__grid { grid-template-columns: 1fr; } }
</style>
