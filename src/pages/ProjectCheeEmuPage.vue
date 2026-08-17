<script setup>
import { onMounted } from 'vue'

const DEMO_URL = 'https://emu.cheehouse.io.vn/'

const stack = [
  'Vue 3 + Vite (frontend)',
  'Node.js + Express (backend)',
  'MySQL + Sequelize ORM',
  'CheerpJ (Java-to-Web runtime)',
  'Socket.io (chat & phòng chơi realtime)',
  'Tailscale networking (multiplayer online)',
  'Nginx + Cloudflare',
]

const features = [
  {
    title: 'Chơi game Java J2ME ngay trên trình duyệt',
    desc: 'Kho hàng trăm game J2ME (JAR) cổ điển — chạy trực tiếp bằng runtime CheerpJ, không cần cài giả lập hay tải file về máy.',
  },
  {
    title: 'Chơi online đa người thật',
    desc: 'Hỗ trợ song song 2 cơ chế mạng: cầu nối WebSocket-TCP tự host cho các server game cũ, và mạng ảo Tailscale nhúng trong CheerpJ cho các game cần kết nối Internet thật — tự động chọn cơ chế phù hợp theo từng game.',
  },
  {
    title: 'Cloud Save đa thiết bị',
    desc: 'Lưu tiến trình chơi lên server, tối đa 5 slot mỗi tài khoản, đồng bộ giữa các thiết bị và trình duyệt khác nhau.',
  },
  {
    title: 'Cộng đồng: đánh giá, yêu thích, phòng chat',
    desc: 'Hệ thống review/rating theo từng game, danh sách game yêu thích cá nhân, khu vực chat trực tiếp (Cbox) giữa người chơi.',
  },
  {
    title: 'Duyệt game theo thể loại / nhà sản xuất / runtime',
    desc: 'Phân loại toàn bộ thư viện theo thể loại, hãng phát hành và loại core giả lập, kèm trang danh mục riêng cho từng nhóm.',
  },
  {
    title: 'Trang quản trị đầy đủ',
    desc: 'Upload game đơn lẻ/hàng loạt, quản lý phân quyền theo vai trò (khách/thành viên/VIP/admin), cấu hình toàn bộ tính năng site.',
  },
]

const challenges = [
  {
    title: 'Bài toán SEO cho ứng dụng SPA',
    desc: 'Vì toàn bộ giao diện là Single Page Application phía client, Googlebot ban đầu chỉ thấy một trang gần như trống. Giải pháp: xây dựng tầng prerender phía server — Nginx nhận diện crawler qua User-Agent và trả về HTML dựng sẵn với đầy đủ nội dung bài viết, thống kê, breadcrumb và dữ liệu có cấu trúc (JSON-LD) cho từng loại trang (game, thể loại, nhà sản xuất...), trong khi người dùng thật vẫn nhận app Vue đầy đủ trải nghiệm.',
  },
  {
    title: 'Kết nối multiplayer xuyên NAT',
    desc: 'Nhiều game J2ME đời cũ mong đợi kết nối socket TCP trực tiếp — điều bất khả thi trong sandbox trình duyệt. Giải pháp là xây một cầu nối WebSocket ↔ TCP tự host cho các server đã biết trước, kết hợp mạng ảo Tailscale được CheerpJ hỗ trợ sẵn cho trường hợp cần định tuyến ra Internet thật.',
  },
  {
    title: 'Chạy máy ảo Java trong trình duyệt an toàn',
    desc: 'CheerpJ yêu cầu SharedArrayBuffer và Cross-Origin Isolation (COOP/COEP) — phải cấu hình header ở tầng Nginx cho toàn site, đồng thời proxy các tài nguyên game (HTTP thuần từ server J2ME cũ) qua backend để tránh lỗi mixed-content/CORS.',
  },
]

onMounted(() => {
  document.title = 'CheeEmu — Nền tảng giả lập game Java J2ME trên trình duyệt | CheeHouse'
})
</script>

<template>
  <section class="section project-hero">
    <div class="container">
      <RouterLink to="/#portfolio" class="project-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Quay lại danh sách dự án
      </RouterLink>

      <div class="project-hero__head">
        <span class="tag">Web · Vue 3 · Node.js</span>
        <h1 class="project-hero__title">CheeEmu — Trạm Dừng Ký Ức</h1>
        <p class="project-hero__lead">
          Nền tảng web lưu trữ và giả lập game Java J2ME cổ điển, cho phép người dùng chơi lại những tựa game di động
          huyền thoại ngay trên trình duyệt hiện đại — không cần cài đặt phần mềm, không cần điện thoại cũ.
        </p>
        <div class="project-hero__cta">
          <a :href="DEMO_URL" target="_blank" rel="noopener" class="btn btn-primary">
            Xem website trực tiếp
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>

      <img src="/images/Project_AppRunEmu.png" alt="Giao diện CheeEmu" class="project-hero__img" />
    </div>
  </section>

  <section class="section section--light">
    <div class="container project-narrow">
      <h2 class="section-title" style="text-align:left">Tổng quan</h2>
      <p class="project-text">
        CheeEmu ra đời từ nhu cầu rất thực tế: rất nhiều tựa game Java (J2ME) trên điện thoại "cục gạch" ngày trước
        không còn cách nào chơi lại được — máy cũ đã hỏng, các emulator desktop thì khó cài, còn kho ROM online phần lớn
        chỉ cho tải file chứ không cho chơi ngay. CheeEmu giải quyết cả hai vấn đề đó bằng một nền tảng web duy nhất:
        chơi trực tiếp trong trình duyệt bằng runtime CheerpJ (biên dịch máy ảo Java sang WebAssembly/JS), có tài khoản
        để lưu tiến trình, và có cộng đồng để đánh giá, trò chuyện xung quanh những ký ức đó.
      </p>

      <h2 class="section-title" style="text-align:left; margin-top:56px">Công nghệ sử dụng</h2>
      <div class="project-stack">
        <span v-for="s in stack" :key="s" class="project-stack__item">{{ s }}</span>
      </div>

      <h2 class="section-title" style="text-align:left; margin-top:56px">Tính năng nổi bật</h2>
      <div class="project-features">
        <div v-for="f in features" :key="f.title" class="project-feature">
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>

      <h2 class="section-title" style="text-align:left; margin-top:56px">Thách thức kỹ thuật đã giải quyết</h2>
      <div class="project-challenges">
        <div v-for="c in challenges" :key="c.title" class="project-challenge">
          <h3>{{ c.title }}</h3>
          <p>{{ c.desc }}</p>
        </div>
      </div>

      <div class="project-footer-cta">
        <a :href="DEMO_URL" target="_blank" rel="noopener" class="btn btn-outline">
          Trải nghiệm CheeEmu ngay
        </a>
        <RouterLink to="/#contact" class="btn btn-primary">Liên hệ hợp tác dự án tương tự</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-hero {
  padding-top: 140px;
}

.project-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-gray);
  margin-bottom: 32px;
  transition: color 0.2s;
}

.project-back:hover {
  color: var(--primary);
}

.project-hero__head {
  max-width: 760px;
  margin-bottom: 40px;
}

.project-hero__title {
  font-size: clamp(28px, 4.5vw, 44px);
  font-weight: 800;
  color: var(--text-dark);
  margin: 16px 0;
  line-height: 1.2;
}

.project-hero__lead {
  font-size: 17px;
  color: var(--text-gray);
  line-height: 1.75;
}

.project-hero__cta {
  margin-top: 28px;
}

.project-hero__img {
  width: 100%;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  display: block;
}

.project-narrow {
  max-width: 840px;
}

.project-text {
  font-size: 16px;
  color: var(--text-gray);
  line-height: 1.85;
}

.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.project-stack__item {
  padding: 8px 16px;
  border-radius: 100px;
  border: 1.5px solid var(--border);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-dark);
  background: white;
}

.project-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.project-feature {
  padding: 22px 24px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: white;
}

.project-feature h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.project-feature p {
  font-size: 14px;
  color: var(--text-gray);
  line-height: 1.7;
}

.project-challenges {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project-challenge {
  padding: 24px 26px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  border-left: 4px solid var(--primary);
  background: white;
}

.project-challenge h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 10px;
}

.project-challenge p {
  font-size: 14.5px;
  color: var(--text-gray);
  line-height: 1.8;
}

.project-footer-cta {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 56px;
}

@media (max-width: 700px) {
  .project-features {
    grid-template-columns: 1fr;
  }
}
</style>
