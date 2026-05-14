<script setup>
import { ref } from 'vue'

const avatarSrc = '/images/avatar.jpg'
const activeSlide = ref(0)
const socialLinks = [
  {
    name: 'Facebook', url: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  },
  {
    name: 'GitHub', url: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
  },
  {
    name: 'LinkedIn', url: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    name: 'Zalo', url: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20 2H4C2.9 2 2 2.9 2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 13H9.41l8.09-8H6V5h12l-8.09 8H18v2z"/></svg>`,
  },
  {
    name: 'Discord', url: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  },
  {
    name: 'YouTube', url: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  },
  {
    name: 'TikTok', url: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
  },
]

const skills = ['Vue.js', 'React', 'Node.js', 'Flutter', 'SQL', 'Figma']
</script>

<template>
  <section id="about" class="section about">
    <div class="container">
      <div class="about__inner">
        <!-- Left: Photo -->
        <div class="about__photo-col reveal-left">
          <div class="about__photo-wrap">
            <img :src="avatarSrc" alt="Hoang Tri Dung" class="about__photo"
            @error="$event.target.parentElement.classList.add('no-photo')" />
            <div class="about__photo-fallback">HTD</div>
            <div class="about__photo-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0112 0v2"/></svg>
              <span>Full Stack<br/>Developer</span>
            </div>
          </div>

          <!-- Social icons -->
          <div class="about__social">
            <a
              v-for="s in socialLinks"
              :key="s.name"
              :href="s.url"
              :aria-label="s.name"
              class="about__social-icon"
              target="_blank"
              rel="noopener"
            >
              <span v-html="s.svg" class="about__social-svg" />
            </a>
          </div>
        </div>

        <!-- Right: Text -->
        <div class="about__text-col reveal-right">
          <p class="tag">Về tôi</p>
          <h2 class="about__title">
            Chuyên gia <span class="text-primary">Phát triển Web</span><br />
            &amp; Giải pháp AI cho Kinh doanh Nhỏ
          </h2>
          <p class="about__desc">
            Bạn cần một website chuyên nghiệp hay một trợ lý ảo thông minh? Tôi ở đây để giúp bạn.
            Tôi tập trung vào việc tạo ra các sản phẩm số thực tế, giúp các cửa hàng nhỏ và cá nhân
            tối ưu hóa vận hành thông qua công nghệ.
          </p>
          <p class="about__desc">
            Từ việc xây dựng website chuẩn SEO đến tích hợp AI thông minh hay thiết lập các Bot tự động
            trên Zalo, Messenger, Discord — tôi đảm bảo sản phẩm không chỉ đẹp mắt mà còn mang lại
            giá trị kinh tế thực sự cho hành trình sáng tạo của bạn.
          </p>

          <div class="about__skills">
            <span v-for="skill in skills" :key="skill" class="about__skill-tag">{{ skill }}</span>
          </div>

          <div class="about__actions">
            <button class="btn btn-primary" onclick="document.getElementById('portfolio').scrollIntoView({behavior:'smooth'})">
              Dự án của tôi
            </button>
            <button class="btn btn-outline" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">
              Liên hệ
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 100px 0;
  overflow: hidden;
}

.about__inner {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 80px;
  align-items: center;
}

/* ---- Photo ---- */
.about__photo-wrap {
  position: relative;
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
}

.about__photo {
  width: 100%;
  height: 480px;
  object-fit: cover;
  border-radius: var(--radius-xl);
  position: relative;
  z-index: 1;
}

.about__photo-fallback {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--primary-100), var(--primary-200));
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  font-weight: 900;
  color: var(--primary);
  z-index: 0;
}

.about__photo + .about__photo-fallback { display: none; }

.about__photo-badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: var(--primary);
  color: white;
  border-radius: var(--radius);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  box-shadow: var(--shadow-primary);
  z-index: 2;
  animation: cardFloat 4s ease-in-out infinite;
}

@keyframes cardFloat {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

.about__social {
  display: flex;
  gap: 10px;
  margin-top: 36px;
  justify-content: center;
}

.about__social-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-gray);
  transition: var(--transition);
}

.about__social-icon:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  transform: translateY(-3px);
}

.about__social-svg {
  display: flex;
  align-items: center;
}

.about__social-svg :deep(svg) {
  display: block;
}

/* ---- Text ---- */
.about__title {
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 800;
  line-height: 1.25;
  color: var(--text-dark);
  margin: 16px 0 24px;
}

.text-primary { color: var(--primary); }

.about__desc {
  font-size: 16px;
  color: var(--text-gray);
  line-height: 1.8;
  margin-bottom: 16px;
}

.about__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 24px 0 32px;
}

.about__skill-tag {
  padding: 8px 16px;
  background: var(--primary-100);
  color: var(--primary);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  transition: var(--transition);
}

.about__skill-tag:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

.about__actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .about__inner { grid-template-columns: 1fr; gap: 60px; }
  .about__photo-wrap { max-width: 300px; }
  .about__photo { height: 380px; }
}
</style>
