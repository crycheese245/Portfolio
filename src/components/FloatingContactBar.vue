<script setup>
const contacts = [
  { name: 'Telegram', href: 'https://t.me/cheehouse', type: 'image', src: '/images/icons/telegram.webp' },
  { name: 'Zalo', href: 'https://zalo.me/0352025524', type: 'image', src: '/images/icons/zalo.png' },
  { name: 'Gọi điện', href: 'tel:+84352025524', type: 'phone' },
]
</script>

<template>
  <div class="floating-contact">
    <a
      v-for="c in contacts"
      :key="c.name"
      :href="c.href"
      :aria-label="c.name"
      class="floating-contact__btn"
      :class="`floating-contact__btn--${c.type}`"
      :target="c.type === 'phone' ? undefined : '_blank'"
      :rel="c.type === 'phone' ? undefined : 'noopener'"
    >
      <img v-if="c.type === 'image'" :src="c.src" :alt="c.name" />
      <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.93 19.79 19.79 0 01.4 1.27 2 2 0 012.39-.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    </a>
  </div>
</template>

<style scoped>
.floating-contact {
  position: fixed;
  bottom: 32px;
  left: 32px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.floating-contact__btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  transition: transform 0.2s, box-shadow 0.2s;
}

.floating-contact__btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: var(--shadow-xl);
}

.floating-contact__btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.floating-contact__btn--phone {
  background: #FF5B5B;
}

@media (max-width: 640px) {
  .floating-contact { bottom: 20px; left: 16px; gap: 10px; }
  .floating-contact__btn { width: 46px; height: 46px; }
}
</style>
