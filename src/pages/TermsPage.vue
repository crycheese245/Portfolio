<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Điều khoản dịch vụ | CheeHouse'
})
</script>

<template>
  <section class="section legal-page">
    <div class="container legal-page__narrow">
      <RouterLink to="/" class="legal-page__back">← Về trang chủ</RouterLink>

      <h1>Điều khoản dịch vụ</h1>
      <p class="legal-page__updated">Cập nhật lần cuối: tháng 8/2026</p>

      <p>Khi truy cập và sử dụng website <b>cheehouse.io.vn</b> ("website"), bạn đồng ý với các điều khoản dưới đây.</p>

      <h2>1. Nội dung website</h2>
      <p>Website này là trang portfolio cá nhân, giới thiệu các dự án đã thực hiện, bài viết kỹ thuật và thông tin liên hệ. Nội dung được cung cấp với mục đích tham khảo, giới thiệu năng lực và chia sẻ kiến thức kỹ thuật.</p>

      <h2>2. Quyền sở hữu trí tuệ</h2>
      <p>Toàn bộ nội dung trên website (bài viết, hình ảnh, mã nguồn minh hoạ, thiết kế giao diện) thuộc quyền sở hữu của tác giả, trừ khi có ghi chú khác. Bạn có thể đọc, chia sẻ liên kết tới nội dung, nhưng không được sao chép, phân phối lại với mục đích thương mại mà không có sự đồng ý bằng văn bản.</p>

      <h2>3. Sử dụng hợp lệ</h2>
      <p>Bạn đồng ý không sử dụng website vào các mục đích: vi phạm pháp luật, phát tán mã độc, thu thập dữ liệu trái phép, hoặc gây ảnh hưởng đến hoạt động bình thường của website.</p>

      <h2>4. Liên kết tới website khác</h2>
      <p>Website có thể chứa liên kết tới các trang bên ngoài (ví dụ demo dự án, mạng xã hội). Chúng tôi không chịu trách nhiệm về nội dung hoặc chính sách bảo mật của các website bên thứ ba này.</p>

      <h2>5. Quảng cáo</h2>
      <p>Website có hiển thị quảng cáo thông qua Google AdSense. Việc hiển thị quảng cáo tuân theo <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">chính sách quảng cáo của Google</a> — xem thêm tại trang <RouterLink to="/chinh-sach-bao-mat">Chính sách bảo mật</RouterLink>.</p>

      <h2>6. Giới hạn trách nhiệm</h2>
      <p>Nội dung kỹ thuật (bài viết, case study) được chia sẻ dựa trên kinh nghiệm thực tế của tác giả, mang tính tham khảo, không đảm bảo phù hợp tuyệt đối với mọi trường hợp sử dụng. Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ việc áp dụng nội dung trên website.</p>

      <h2>7. Thay đổi điều khoản</h2>
      <p>Điều khoản này có thể được cập nhật theo thời gian. Phiên bản mới nhất luôn được đăng tại trang này.</p>

      <h2>8. Liên hệ</h2>
      <p>Mọi thắc mắc về điều khoản dịch vụ, vui lòng liên hệ:</p>
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

.legal-page a {
  color: var(--primary);
  text-decoration: underline;
}
</style>
