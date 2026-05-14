<script setup>
import { ref, reactive } from 'vue'

const form = reactive({ name: '', email: '', subject: '', message: '' })
const submitted = ref(false)
const sending = ref(false)

const handleSubmit = async () => {
  sending.value = true
  await new Promise((r) => setTimeout(r, 1200))
  sending.value = false
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  }, 4000)
}

const socialLinks = [
  {
    name: 'Facebook', url: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  },
  {
    name: 'GitHub', url: 'https://github.com/crycheese245',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
  },
  {
    name: 'LinkedIn', url: 'https://www.linkedin.com/in/dunght245',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    name: 'Zalo', url: 'https://zalo.me/0352025524',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4C2.9 2 2 2.9 2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 13H9.41l8.09-8H6V5h12l-8.09 8H18v2z"/></svg>`,
  },
  {
    name: 'Discord', url: 'https://discord.com/users/312541057411710986',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  },
  {
    name: 'YouTube', url: 'https://www.youtube.com/@cheehouse-245',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  },
  {
    name: 'TikTok', url: 'https://www.tiktok.com/@cheehouse',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
  },
]

const contactInfo = [
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    label: 'Địa chỉ',
    value: 'Tỉnh Vĩnh Long, Việt Nam',
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.93 19.79 19.79 0 01.4 1.27 2 2 0 012.39-.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
    label: 'Điện thoại',
    value: '+84 352 025 524',
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    label: 'Email',
    value: 'hoangtridung.work245@gmail.com',
  },
]
</script>

<template>
  <section id="contact" class="section section--light contact">
    <div class="container">
      <div class="section-header reveal">
        <p class="tag">Kết nối</p>
        <h2 class="section-title">Hãy nói về dự án của bạn</h2>
        <p class="section-subtitle">
          Sẵn sàng biến ý tưởng thành hiện thực? Hãy liên hệ và chúng ta cùng
          tạo ra điều gì đó thật tuyệt vời!
        </p>
      </div>

      <div class="contact__layout">
        <!-- Left: info + map -->
        <div class="contact__info reveal-left">
          <div
            v-for="info in contactInfo"
            :key="info.label"
            class="contact__info-item"
          >
            <div class="contact__info-icon" v-html="info.icon" />
            <div>
              <span class="contact__info-label">{{ info.label }}</span>
              <strong class="contact__info-value">{{ info.value }}</strong>
            </div>
          </div>

          <!-- Social row -->
          <div class="contact__social">
            <a
              v-for="s in socialLinks"
              :key="s.name"
              :href="s.url"
              :aria-label="s.name"
              class="contact__social-btn"
              target="_blank"
              rel="noopener"
            >
              <span class="cs-icon" v-html="s.svg" />
              {{ s.name }}
            </a>
          </div>
        </div>

        <!-- Right: form -->
        <div class="contact__form-wrap reveal-right">
          <Transition name="success-fade">
            <div v-if="submitted" class="contact__success">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <h3>Đã gửi thành công!</h3>
              <p>Tôi sẽ phản hồi bạn trong vòng 24 giờ.</p>
            </div>
          </Transition>

          <form v-if="!submitted" class="contact__form" @submit.prevent="handleSubmit">
            <div class="contact__row">
              <div class="contact__field">
                <label>Họ và tên</label>
                <input v-model="form.name" type="text" placeholder="Nguyễn Văn A" required />
              </div>
              <div class="contact__field">
                <label>Email</label>
                <input v-model="form.email" type="email" placeholder="email@example.com" required />
              </div>
            </div>
            <div class="contact__field">
              <label>Tiêu đề</label>
              <input v-model="form.subject" type="text" placeholder="Trao đổi về dự án" required />
            </div>
            <div class="contact__field">
              <label>Nội dung</label>
              <textarea v-model="form.message" rows="5" placeholder="Hãy mô tả ý tưởng hoặc dự án của bạn..." required />
            </div>
            <button type="submit" class="btn btn-primary contact__submit" :disabled="sending">
              <span v-if="!sending">
                Gửi tin nhắn
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </span>
              <span v-else class="contact__loader">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0110 10" stroke-opacity="1"/></svg>
                Đang gửi...
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact__layout {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 72px;
  align-items: start;
}

/* ---- Info ---- */
.contact__info-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: white;
  margin-bottom: 16px;
  transition: var(--transition);
}

.contact__info-item:hover {
  border-color: var(--primary-200);
  box-shadow: var(--shadow);
}

.contact__info-icon {
  width: 44px;
  height: 44px;
  background: var(--primary-100);
  color: var(--primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact__info-label {
  display: block;
  font-size: 12px;
  color: var(--text-light);
  font-weight: 500;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact__info-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-dark);
}

.contact__social {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.contact__social {
  flex-wrap: wrap;
}

.contact__social-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1.5px solid var(--border);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-gray);
  transition: var(--transition);
  text-decoration: none;
}

.contact__social-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.cs-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.cs-icon :deep(svg) {
  width: 16px;
  height: 16px;
  display: block;
}

/* ---- Form ---- */
.contact__form-wrap {
  background: white;
  border-radius: var(--radius-xl);
  padding: 40px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.contact__form { display: flex; flex-direction: column; gap: 20px; }

.contact__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact__field label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-dark);
}

.contact__field input,
.contact__field textarea {
  padding: 13px 16px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  font-family: inherit;
  font-size: 15px;
  color: var(--text-dark);
  background: var(--bg-light);
  transition: border-color 0.25s, box-shadow 0.25s;
  outline: none;
  resize: vertical;
}

.contact__field input:focus,
.contact__field textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
  background: white;
}

.contact__field input::placeholder,
.contact__field textarea::placeholder { color: var(--text-light); }

.contact__submit {
  width: 100%;
  justify-content: center;
  padding: 16px;
  font-size: 16px;
  border-radius: 10px;
}

.contact__submit:disabled { opacity: 0.7; cursor: not-allowed; }

.contact__loader {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Success */
.contact__success {
  text-align: center;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.contact__success h3 {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-dark);
}

.contact__success p { color: var(--text-gray); }

.success-fade-enter-active,
.success-fade-leave-active { transition: opacity 0.4s, transform 0.4s; }
.success-fade-enter-from,
.success-fade-leave-to { opacity: 0; transform: scale(0.9); }

@media (max-width: 900px) {
  .contact__layout { grid-template-columns: 1fr; gap: 40px; }
}

@media (max-width: 600px) {
  .contact__form-wrap { padding: 28px 20px; }
  .contact__row { grid-template-columns: 1fr; }
}
</style>
