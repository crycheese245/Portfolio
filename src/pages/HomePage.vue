<script setup>
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import WorkProcess from '../components/WorkProcess.vue'
import PortfolioSection from '../components/PortfolioSection.vue'
import CTASection from '../components/CTASection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import TestimonialSection from '../components/TestimonialSection.vue'
import ContactSection from '../components/ContactSection.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()
</script>

<template>
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
</template>
