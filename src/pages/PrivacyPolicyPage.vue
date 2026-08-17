<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Chính sách bảo mật | CheeHouse'
})
</script>

<template>
  <section class="section legal-page">
    <div class="container legal-page__narrow">
      <RouterLink to="/" class="legal-page__back">← Về trang chủ</RouterLink>

      <h1>Chính sách bảo mật</h1>
      <p class="legal-page__updated">Cập nhật lần cuối: tháng 8/2026</p>

      <p>CheeHouse ("chúng tôi") tôn trọng quyền riêng tư của người truy cập website <b>cheehouse.io.vn</b> và các trang con của nó. Chính sách này giải thích chúng tôi thu thập, sử dụng và bảo vệ thông tin như thế nào.</p>

      <h2>1. Thông tin chúng tôi thu thập</h2>
      <p>Chúng tôi thu thập thông tin trong các trường hợp sau:</p>
      <ul>
        <li><b>Thông tin bạn chủ động cung cấp</b>: khi bạn điền form liên hệ (họ tên, email, tiêu đề, nội dung), thông tin này chỉ được dùng để phản hồi yêu cầu của bạn.</li>
        <li><b>Thông tin thu thập tự động qua cookie</b>: bao gồm dữ liệu về trình duyệt, thiết bị, trang bạn xem, thời gian truy cập — phục vụ mục đích thống kê và hiển thị quảng cáo (xem mục 2).</li>
      </ul>

      <h2>2. Cookie và quảng cáo cá nhân hoá (Google AdSense)</h2>
      <p>Website này sử dụng dịch vụ quảng cáo <b>Google AdSense</b>. Google, với tư cách là bên thứ ba, sử dụng cookie để hiển thị quảng cáo dựa trên lịch sử truy cập của bạn vào website này và các website khác trên Internet.</p>
      <p>Việc Google sử dụng cookie quảng cáo cho phép Google và các đối tác của họ hiển thị quảng cáo phù hợp với người dùng dựa trên lượt truy cập của họ vào website này và/hoặc các website khác.</p>
      <p>Bạn có thể từ chối quảng cáo cá nhân hoá bằng cách truy cập:</p>
      <ul>
        <li><a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Cài đặt quảng cáo của Google</a></li>
        <li><a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a> (đối với các nhà cung cấp quảng cáo khác ngoài Google)</li>
      </ul>

      <h2>3. Mục đích sử dụng thông tin</h2>
      <ul>
        <li>Phản hồi các yêu cầu liên hệ, tư vấn dự án.</li>
        <li>Cải thiện trải nghiệm và nội dung website.</li>
        <li>Hiển thị quảng cáo phù hợp thông qua Google AdSense.</li>
      </ul>
      <p>Chúng tôi <b>không bán</b> thông tin cá nhân của bạn cho bên thứ ba.</p>

      <h2>4. Chia sẻ thông tin với bên thứ ba</h2>
      <p>Thông tin thu thập qua cookie có thể được chia sẻ với Google (nhà cung cấp dịch vụ quảng cáo AdSense) theo đúng <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">chính sách của Google về cách sử dụng dữ liệu từ các trang đối tác</a>. Chúng tôi không chia sẻ thông tin liên hệ bạn cung cấp cho bất kỳ bên thứ ba nào ngoài mục đích phản hồi bạn.</p>

      <h2>5. Bảo mật dữ liệu</h2>
      <p>Chúng tôi áp dụng các biện pháp hợp lý để bảo vệ thông tin bạn cung cấp khỏi truy cập, sử dụng hoặc tiết lộ trái phép. Tuy nhiên không có phương thức truyền tải qua Internet nào an toàn tuyệt đối 100%.</p>

      <h2>6. Quyền của bạn</h2>
      <p>Bạn có quyền yêu cầu chúng tôi cung cấp, chỉnh sửa hoặc xoá thông tin cá nhân bạn đã gửi qua form liên hệ, bằng cách liên hệ trực tiếp theo thông tin bên dưới.</p>

      <h2>7. Liên hệ</h2>
      <p>Nếu có câu hỏi về chính sách bảo mật này, vui lòng liên hệ:</p>
      <p>Email: <a href="mailto:hoangtridung.work245@gmail.com">hoangtridung.work245@gmail.com</a><br>Địa chỉ: Tỉnh Vĩnh Long, Việt Nam</p>
    </div>
  </section>
</template>

<style scoped>
.legal-page {
  padding-top: 140px;
}

.legal-page__narrow {
  max-width: 760px;
}

.legal-page__back {
  display: inline-block;
  margin-bottom: 28px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-gray);
}

.legal-page__back:hover {
  color: var(--primary);
}

.legal-page h1 {
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.legal-page__updated {
  font-size: 13px;
  color: var(--text-gray);
  margin-bottom: 32px;
}

.legal-page h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 32px 0 12px;
}

.legal-page p {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-gray);
  margin-bottom: 12px;
}

.legal-page ul {
  padding-left: 22px;
  margin-bottom: 12px;
}

.legal-page li {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-gray);
}

.legal-page a {
  color: var(--primary);
  text-decoration: underline;
}
</style>
