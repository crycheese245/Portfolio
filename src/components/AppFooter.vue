<script setup>
const socialLinks = [
  {
    name: 'Facebook', url: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  },
  {
    name: 'GitHub', url: 'https://github.com/crycheese245',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
  },
  {
    name: 'LinkedIn', url: 'https://www.linkedin.com/in/dunght245',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    name: 'Zalo', url: 'https://zalo.me/0352025524',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20 2H4C2.9 2 2 2.9 2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 13H9.41l8.09-8H6V5h12l-8.09 8H18v2z"/></svg>`,
  },
  {
    name: 'Discord', url: 'https://discord.com/users/312541057411710986',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  },
  {
    name: 'YouTube', url: 'https://www.youtube.com/@cheehouse-245',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  },
  {
    name: 'TikTok', url: 'https://www.tiktok.com/@cheehouse',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
  },
]

const links = [
  { label: 'Trang chủ', href: 'home' },
  { label: 'Giới thiệu', href: 'about' },
  { label: 'Dự án', href: 'portfolio' },
  { label: 'Dịch vụ', href: 'services' },
  { label: 'Liên hệ', href: 'contact' },
]

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const logoSrc = '/images/cheehouse-logo.png'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <!-- Logo + tagline -->
      <div class="footer__brand">
        <a href="#" class="footer__logo" @click.prevent="scrollTo('home')">
          <img :src="logoSrc" alt="CheeHouse" class="footer__logo-img" />
          <span>CheeHouse</span>
        </a>
        <p class="footer__tagline">
          Xây dựng "Ngôi nhà Online" cho shop nhỏ của bạn. Tận tâm - Chỉn chu - Giá hợp lý
        </p>
      </div>

      <!-- Nav links -->
      <nav class="footer__nav">
        <h4 class="footer__nav-title">Điều hướng</h4>
        <ul>
          <li v-for="link in links" :key="link.href">
            <a href="#" @click.prevent="scrollTo(link.href)">{{ link.label }}</a>
          </li>
        </ul>
      </nav>

      <!-- Services list -->
      <div class="footer__services">
        <h4 class="footer__nav-title">Dịch vụ</h4>
        <ul>
          <li><a href="#">Phát triển BotAutomation</a></li>
          <li><a href="#">Phát triển Web</a></li>
          <li><a href="#">Phát triển Mobile</a></li>
          <li><a href="#">Nhận diện thương hiệu</a></li>
        </ul>
      </div>

      <!-- Contact snippet -->
      <div class="footer__contact">
        <h4 class="footer__nav-title">Liên hệ</h4>
        <p>Tỉnh Vĩnh Long, Việt Nam</p>
        <p>hoangtridung.work245@gmail.com</p>
        <div class="footer__social">
          <a
            v-for="s in socialLinks"
            :key="s.name"
            :href="s.url"
            :aria-label="s.name"
            class="footer__social-icon"
            target="_blank"
            rel="noopener"
          >
            <span v-html="s.svg" style="display:flex" />
          </a>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p>&copy; {{ year }} CheeHouse. Bảo lưu mọi quyền.</p>
        <div class="footer__bottom-links">
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Điều khoản dịch vụ</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0F0A1E;
  color: rgba(255,255,255,0.7);
}

.footer__inner {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.4fr;
  gap: 48px;
  padding: 72px 24px 56px;
}

.footer__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
}

.footer__logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 10px;
  flex-shrink: 0;
}

.footer__tagline {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255,255,255,0.5);
  max-width: 240px;
}

.footer__nav-title {
  color: white;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 20px;
}

.footer__nav ul,
.footer__services ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__nav a,
.footer__services a {
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  transition: color 0.2s;
}

.footer__nav a:hover,
.footer__services a:hover { color: white; }

.footer__contact p {
  font-size: 14px;
  margin-bottom: 10px;
  color: rgba(255,255,255,0.5);
}

.footer__social {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.footer__social-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: rgba(255,255,255,0.5);
  transition: var(--transition);
}

.footer__social-icon:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.footer__bottom {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 24px 0;
}

.footer__bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.footer__bottom p {
  font-size: 13px;
  color: rgba(255,255,255,0.35);
}

.footer__bottom-links {
  display: flex;
  gap: 24px;
}

.footer__bottom-links a {
  font-size: 13px;
  color: rgba(255,255,255,0.35);
  transition: color 0.2s;
}

.footer__bottom-links a:hover { color: white; }

@media (max-width: 900px) {
  .footer__inner { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 500px) {
  .footer__inner { grid-template-columns: 1fr; gap: 32px; }
  .footer__bottom-inner { flex-direction: column; text-align: center; }
}
</style>
