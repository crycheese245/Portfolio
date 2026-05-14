<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppNavBar from './components/AppNavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import WorkProcess from './components/WorkProcess.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import CTASection from './components/CTASection.vue'
import ServicesSection from './components/ServicesSection.vue'
import TestimonialSection from './components/TestimonialSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
import { useScrollReveal } from './composables/useScrollReveal'

useScrollReveal()

const showTop = ref(false)
const onScroll = () => { showTop.value = window.scrollY > 400 }
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="app">
    <AppNavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <WorkProcess />
      <PortfolioSection />
      <CTASection />
      <ServicesSection />
      <TestimonialSection />
      <ContactSection />
    </main>
    <AppFooter />

    <Transition name="backtop">
      <button v-if="showTop" class="back-top" @click="scrollTop" aria-label="Lên đầu trang">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<style>
.back-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-primary);
  z-index: 999;
  transition: background 0.2s, transform 0.2s;
}

.back-top:hover {
  background: var(--primary-700);
  transform: translateY(-3px);
}

.backtop-enter-active,
.backtop-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.backtop-enter-from,
.backtop-leave-to    { opacity: 0; transform: translateY(12px); }
</style>
