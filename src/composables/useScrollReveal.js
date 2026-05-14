import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer

  const init = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document
      .querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      .forEach((el) => observer.observe(el))
  }

  onMounted(init)
  onUnmounted(() => observer?.disconnect())
}

export function animateCount(el, target, duration = 1800, suffix = '') {
  const start = performance.now()
  const update = (ts) => {
    const elapsed = ts - start
    const progress = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    el.textContent = Math.round(ease * target) + suffix
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}
