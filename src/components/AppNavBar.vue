<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const logoSrc = '/images/cheehouse-logo.png'
const isScrolled = ref(false)
const isMobileOpen = ref(false)
const activeSection = ref('home')

const navLinks = [
  { label: 'Trang chủ', href: 'home' },
  { label: 'Giới thiệu', href: 'about' },
  { label: 'Dự án', href: 'portfolio' },
  { label: 'Dịch vụ', href: 'services' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 60
  const sections = ['home', 'about', 'portfolio', 'services', 'contact']
  for (const id of [...sections].reverse()) {
    const el = document.getElementById(id)
    if (el && window.scrollY >= el.offsetTop - 120) {
      activeSection.value = id
      break
    }
  }
}

const scrollTo = (id) => {
  isMobileOpen.value = false
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="container navbar__inner">
      <a class="navbar__logo" href="#" @click.prevent="scrollTo('home')">
        <img :src="logoSrc" alt="CheeHouse" class="navbar__logo-img" />
        <span>CheeHouse</span>
      </a>

      <!-- Desktop links -->
      <div class="navbar__links">
        <button
          v-for="link in navLinks"
          :key="link.href"
          class="navbar__link"
          :class="{ 'navbar__link--active': activeSection === link.href }"
          @click="scrollTo(link.href)"
        >
          {{ link.label }}
        </button>
        <button class="btn btn-primary navbar__cta" @click="scrollTo('contact')">
          Liên hệ
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      <button class="navbar__burger" :class="{ 'navbar__burger--open': isMobileOpen }" @click="isMobileOpen = !isMobileOpen">
        <span />
        <span />
        <span />
      </button>
    </div>
  </nav>

  <!-- Mobile menu — teleported to body to avoid stacking context issues -->
  <Teleport to="body">
    <Transition name="mnav">
      <div v-if="isMobileOpen" class="mobile-nav">
        <button class="mobile-nav__close" @click="isMobileOpen = false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="mobile-nav__logo">
          <img :src="logoSrc" alt="CheeHouse" class="navbar__logo-img" />
          <span>CheeHouse</span>
        </div>

        <nav class="mobile-nav__links">
          <button
            v-for="link in navLinks"
            :key="link.href"
            class="mobile-nav__link"
            :class="{ 'mobile-nav__link--active': activeSection === link.href }"
            @click="scrollTo(link.href)"
          >
            {{ link.label }}
          </button>
        </nav>

        <button class="btn btn-primary mobile-nav__cta" @click="scrollTo('contact')">
          Liên hệ
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 22px 0;
  transition: padding 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
  background: transparent;
}

.navbar--scrolled {
  padding: 14px 0;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 2px 24px rgba(0,0,0,0.07);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 19px;
  font-weight: 800;
  color: var(--text-dark);
  text-decoration: none;
}

.navbar__logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 10px;
  flex-shrink: 0;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.navbar__link {
  padding: 8px 14px;
  color: var(--text-gray);
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 14px;
  right: 14px;
  height: 2px;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.25s ease;
}

.navbar__link:hover,
.navbar__link--active {
  color: var(--primary);
}

.navbar__link--active::after,
.navbar__link:hover::after {
  transform: scaleX(1);
}

.navbar__cta {
  margin-left: 12px;
  padding: 10px 22px;
  font-size: 14px;
}

.navbar__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
}

.navbar__burger span {
  display: block;
  height: 2px;
  background: var(--text-dark);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.navbar__burger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.navbar__burger--open span:nth-child(2) { opacity: 0; }
.navbar__burger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 768px) {
  .navbar__burger { display: flex; }
  .navbar__links { display: none; }
}

/* ─── Mobile nav overlay (teleported to body) ─── */
.mobile-nav {
  position: fixed;
  inset: 0;
  background: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 32px 24px;
}

.mobile-nav__close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--text-dark);
  transition: background 0.2s;
}

.mobile-nav__close:hover { background: var(--bg-light); }

.mobile-nav__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 40px;
}

.mobile-nav__links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
  margin-bottom: 40px;
}

.mobile-nav__link {
  width: 100%;
  max-width: 260px;
  padding: 14px 20px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-gray);
  background: none;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  text-align: center;
  transition: background 0.2s, color 0.2s;
}

.mobile-nav__link:hover,
.mobile-nav__link--active {
  background: var(--bg-light);
  color: var(--primary);
}

.mobile-nav__cta {
  padding: 14px 48px;
  font-size: 16px;
}

/* ─── Transition ─── */
.mnav-enter-active,
.mnav-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.mnav-enter-from,
.mnav-leave-to { opacity: 0; transform: translateY(-12px); }
</style>
