<script setup>
import { onMounted } from 'vue'

const DEMO_URL = 'https://store.cheehouse.io.vn/'

const stack = [
  'Vue 3 + Vite + Pinia (frontend)',
  'Tailwind CSS + Bootstrap',
  'Node.js + Express 5 (backend)',
  'MySQL + Sequelize ORM',
  'Socket.io (chat & thông báo realtime)',
  'Claude / OpenAI / Gemini (AI Scan & trợ lý AI)',
  'OpenCV.js (xử lý ảnh thẻ bài)',
  'MoMo · PayPal · VietQR/SePay',
  'Nginx + Cloudflare',
]

const features = [
  {
    title: 'Cửa hàng thẻ bài Yu-Gi-Oh! & Pokémon',
    desc: 'Danh mục thẻ bài lẻ theo thương hiệu, thể loại và độ hiếm; tìm kiếm, lọc nhanh, lượt xem, danh sách yêu thích và khối "Xem nhiều nhất" ngay trang chủ.',
  },
  {
    title: 'AI Scan — chụp thẻ là có sản phẩm',
    desc: 'Admin chỉ cần chụp ảnh thẻ bài: hệ thống tự cắt, nắn thẳng bằng OpenCV, nhận diện bằng AI, đối chiếu dữ liệu gốc từ YGOProDeck / Pokémon TCG rồi tạo sản phẩm, đồng thời chặn tạo trùng.',
  },
  {
    title: 'Đặt hàng linh hoạt, kể cả khách vãng lai',
    desc: 'Giỏ hàng, mã giảm giá, flash sale, phí vận chuyển cấu hình được, địa chỉ theo tỉnh/phường; khách không cần đăng nhập vẫn mua được và theo dõi được tiến trình giao hàng.',
  },
  {
    title: 'Thanh toán đa kênh',
    desc: 'Hỗ trợ MoMo, PayPal và chuyển khoản ngân hàng qua VietQR (tự đối soát bằng webhook SePay); admin bật/tắt từng phương thức, khách có thể thanh toán lại đơn chưa hoàn tất.',
  },
  {
    title: 'Trợ lý AI & chat hỗ trợ realtime',
    desc: 'Chatbot AI tư vấn sản phẩm, chính sách đổi trả, phí vận chuyển 24/7; khi cần, chuyển tiếp cho nhân viên qua kênh chat realtime bằng Socket.io.',
  },
  {
    title: 'Thành viên, điểm thưởng & đánh giá',
    desc: 'Hạng thành viên, luật tích điểm do admin cấu hình, đánh giá sản phẩm kèm tối đa 5 ảnh, đăng nhập Google và xác minh email.',
  },
  {
    title: 'Trang quản trị đầy đủ',
    desc: 'Quản lý sản phẩm, đơn hàng, slide, trang chính sách, thống kê doanh thu bằng biểu đồ, nhật ký hoạt động/hệ thống và phân quyền admin/staff.',
  },
  {
    title: 'Chuẩn SEO cho cửa hàng',
    desc: 'Sitemap, robots.txt, meta tag động, dữ liệu có cấu trúc và prerender trang public để Google lập chỉ mục sản phẩm đầy đủ.',
  },
]

const challenges = [
  {
    title: 'Nhập liệu hàng trăm thẻ bài nhanh và chính xác',
    desc: 'Nhập tay từng thẻ (mã set, tên, độ hiếm, ảnh) rất tốn thời gian và dễ sai. Giải pháp là luồng AI Scan: tiền xử lý ảnh bằng OpenCV để tìm đúng khung thẻ và nắn thẳng khi thẻ cầm hơi nghiêng, chỉ dùng một request AI cho mỗi lần scan để tiết kiệm quota, rồi đối chiếu với cơ sở dữ liệu thẻ gốc để lấy thông tin chuẩn và gắn link card gốc.',
  },
  {
    title: 'Đối soát thanh toán chuyển khoản tự động',
    desc: 'Chuyển khoản ngân hàng là kênh phổ biến nhất nhưng khó xác nhận thủ công. Mỗi đơn sinh mã QR VietQR kèm nội dung định danh, webhook SePay báo giao dịch về backend để tự khớp đơn và cập nhật trạng thái — chạy song song với luồng MoMo và PayPal.',
  },
  {
    title: 'SEO cho ứng dụng SPA bán hàng',
    desc: 'Trang sản phẩm dựng bằng Vue phía client nên Google từng báo "Crawled - currently not indexed". Giải pháp: prerender các trang public, sinh sitemap động và meta/JSON-LD theo từng sản phẩm, đồng thời chuẩn hoá cấu trúc heading cho trang chủ.',
  },
]

onMounted(() => {
  document.title = 'CheeStore — Website bán thẻ bài Yu-Gi-Oh! & Pokémon | CheeHouse'
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
        <span class="tag">Web · E-commerce · Vue 3 · Node.js</span>
        <h1 class="project-hero__title">CheeStore — Thoả sức mua sắm</h1>
        <p class="project-hero__lead">
          Website thương mại điện tử chuyên thẻ bài Yu-Gi-Oh! và Pokémon: từ nhập kho bằng AI Scan, bán hàng,
          thanh toán đa kênh đến chăm sóc khách hàng bằng trợ lý AI — tất cả trong một hệ thống tự xây dựng.
        </p>
        <div class="project-hero__cta">
          <a :href="DEMO_URL" target="_blank" rel="noopener" class="btn btn-primary">
            Xem website trực tiếp
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>

      <img src="/images/Banner_CheeStore.png" alt="Giao diện CheeStore" class="project-hero__img" />
    </div>
  </section>

  <section class="section section--light">
    <div class="container project-narrow">
      <h2 class="section-title" style="text-align:left">Tổng quan</h2>
      <p class="project-text">
        CheeStore là cửa hàng trực tuyến của CheeHouse, tập trung vào thẻ bài lẻ Yu-Gi-Oh! và Pokémon. Khó khăn lớn nhất
        của mô hình này là số lượng mã thẻ cực lớn, mỗi thẻ lại có set, độ hiếm và giá khác nhau — nhập liệu thủ công
        gần như không khả thi. CheeStore giải quyết bằng công cụ AI Scan cho admin, kết hợp trải nghiệm mua sắm
        đầy đủ cho khách: giỏ hàng, mua không cần tài khoản, thanh toán MoMo/PayPal/chuyển khoản tự đối soát,
        theo dõi đơn hàng và trợ lý AI hỗ trợ 24/7.
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
          Ghé CheeStore ngay
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
