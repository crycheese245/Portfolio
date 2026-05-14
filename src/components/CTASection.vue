<script setup></script>

<template>
  <section class="cta">
    <!-- Blobs -->
    <div class="cta__blob cta__blob--1" />
    <div class="cta__blob cta__blob--2" />

    <div class="container cta__inner">
      <div class="reveal">
        <h2 class="cta__title">
          Bạn có ý tưởng dự án?<br />
          <span>Hãy cùng nhau thảo luận!</span>
        </h2>
        <p class="cta__desc">
          Bạn muốn số hóa cửa hàng hay tự động hóa việc chăm sóc khách hàng?<br class="hidden-mobile" />
          Hãy chia sẻ ý tưởng của bạn, tôi sẽ giúp bạn biến chúng thành công cụ kinh doanh đắc lực.
        </p>
        <button
          class="btn btn-white cta__btn"
          onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})"
        >
          Hợp tác ngay
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background: var(--bg-dark);
  padding: 100px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.cta__blob--1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(232,121,176,0.3), transparent 70%);
  top: -150px;
  left: -100px;
  animation: blobFloat 9s ease-in-out infinite;
}

.cta__blob--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(207,236,243,0.2), transparent 70%);
  bottom: -100px;
  right: -80px;
  animation: blobFloat 11s ease-in-out infinite reverse;
}

@keyframes blobFloat {
  0%,100% { transform: translate(0,0) scale(1); }
  50%      { transform: translate(20px,-20px) scale(1.05); }
}

.cta__inner {
  position: relative;
  z-index: 1;
}

.cta__title {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 900;
  color: white;
  line-height: 1.2;
  margin-bottom: 24px;
}

.cta__title span {
  background: linear-gradient(135deg, #F9B2D7, #CFECF3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta__desc {
  font-size: 17px;
  color: rgba(255,255,255,0.6);
  line-height: 1.75;
  margin-bottom: 40px;
}

.cta__btn {
  padding: 16px 36px;
  font-size: 16px;
  border-radius: 10px;
}

.hidden-mobile { display: inline; }

@media (max-width: 600px) {
  .hidden-mobile { display: none; }
}
</style>
