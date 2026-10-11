<script setup>
import { onMounted } from 'vue'

const DOWNLOAD_URL = 'https://emu.cheehouse.io.vn/tai-app'

const stack = [
  'Kotlin + Jetpack Compose',
  'Java / C++ (runtime J2ME, JNI)',
  'Libretro host (C++ + Oboe, OpenGL ES)',
  'mGBA · MAME · PPSSPP · PCSX ReARMed · ARMSX2',
  'Coil (tải ảnh)',
  'Android Keystore (AES-GCM)',
  'Foreground Service (tải nền)',
  'Backend Node.js dùng chung với CheeEmu web',
]

const features = [
  {
    title: 'Chơi game đa hệ máy trên một app',
    desc: 'J2ME, Game Boy / GBC / GBA, Arcade, PSP, PS1 và PS2. Core mGBA có sẵn trong APK, các core nặng (MAME, PPSSPP, PCSX ReARMed, ARMSX2) chỉ tải về khi cần để giữ app nhẹ.',
  },
  {
    title: 'Kho game đồng bộ với website',
    desc: 'Tab Kho game lấy trực tiếp thư viện của CheeEmu web; bấm Chơi hoặc Tải về là app tự xin link tạm, tải, cài và mở game — game VIP vẫn kiểm tra đúng quyền tài khoản.',
  },
  {
    title: 'Tài khoản, xếp hạng & thành tựu',
    desc: 'Đăng nhập bằng tài khoản web; thời gian chơi, EXP, cấp độ và thành tựu được cộng giống hệt khi chơi trên trình duyệt, kèm bảng xếp hạng ngay trong app.',
  },
  {
    title: 'Lưu nhanh, cheat & nút ảo tuỳ chỉnh',
    desc: 'Menu trong game có 4 slot lưu nhanh, nhập cheat, kéo thả và đổi cỡ từng nút trên màn hình theo kiểu tay cầm và hướng màn hình, tuỳ chọn core và hiện FPS.',
  },
  {
    title: 'Thư viện game trên máy',
    desc: 'Tab Đã tải lọc theo hệ máy, sắp xếp theo chơi gần đây / tên / hệ máy; mở được cả file game có sẵn trên điện thoại.',
  },
  {
    title: 'Tải nhiều game trong nền',
    desc: 'Tải song song nhiều game, tiếp tục khi rời app nhờ foreground service, hiện tiến trình trên thanh thông báo và lưu lịch sử tải.',
  },
  {
    title: 'Tự cập nhật phiên bản',
    desc: 'App so phiên bản với bản APK trên máy chủ và mời cập nhật; bản quá cũ sẽ được yêu cầu cập nhật trước khi vào kho game, game đã tải vẫn chơi được.',
  },
  {
    title: 'Góp ý, báo lỗi & ủng hộ',
    desc: 'Gửi góp ý kèm tối đa 5 ảnh (tự đính kèm phiên bản app, Android, tên máy); màn hình ủng hộ bằng VietQR ngay trong app.',
  },
]

const challenges = [
  {
    title: 'Một mã nguồn, hai bản phát hành',
    desc: 'App có bản Lite cho Google Play và bản Pro phát hành APK trên website, cài song song được. Phần dùng chung tách khỏi giao diện từng bản qua lớp Edition, thư viện riêng của Pro chỉ khai báo cho flavor Pro — nhờ đó bản Lite không chứa core GPL hay dịch vụ nền phải khai báo với Google Play.',
  },
  {
    title: 'Tự xây host libretro bằng C++',
    desc: 'Để chạy nhiều hệ máy, app tự viết host libretro: nạp core bằng dlopen, vẽ lên Surface (hoặc OpenGL ES cho PSP), phát tiếng qua Oboe, chạy vòng giả lập trên luồng riêng và lưu SRAM khi tạm dừng. Core được tải động theo danh sách trên máy chủ, kèm BIOS cần thiết.',
  },
  {
    title: 'Đồng bộ trải nghiệm giữa web và app',
    desc: 'App dùng chung backend với CheeEmu web: luồng "Mở bằng app" bằng token hết hạn sau 10 phút, heartbeat thời gian chơi mỗi 30 giây để cộng EXP và xét thành tựu, đếm người dùng app vào số người online của website, token đăng nhập được mã hoá AES-GCM bằng khoá trong Android Keystore.',
  },
]

onMounted(() => {
  document.title = 'CheeEmu Pro — App giả lập game đa hệ máy cho Android | CheeHouse'
})
</script>

<template>
  <section class="section project-hero">
    <div class="container project-hero__grid">
      <div>
        <RouterLink to="/#portfolio" class="project-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Quay lại danh sách dự án
        </RouterLink>

        <div class="project-hero__head">
          <span class="tag">Mobile · Android · Kotlin · C++</span>
          <h1 class="project-hero__title">CheeEmu Pro — Giả lập game đa hệ máy trên Android</h1>
          <p class="project-hero__lead">
            Phiên bản Android của CheeEmu: chơi game J2ME, GB/GBA, Arcade, PSP, PS1 và PS2 ngay trên điện thoại, đồng bộ
            kho game, tài khoản, thời gian chơi và thành tựu với website.
          </p>
          <div class="project-hero__cta">
            <a :href="DOWNLOAD_URL" target="_blank" rel="noopener" class="btn btn-primary">
              Tải app CheeEmu Pro
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <RouterLink to="/du-an/cheeemu" class="btn btn-outline">Xem bản web CheeEmu</RouterLink>
          </div>
        </div>
      </div>

      <img src="/images/Project_CheeEmuPro.jpg" alt="Giao diện CheeEmu Pro trên Android" class="project-hero__img project-hero__img--phone" />
    </div>
  </section>

  <section class="section section--light">
    <div class="container project-narrow">
      <h2 class="section-title" style="text-align:left">Tổng quan</h2>
      <p class="project-text">
        Chơi game trên trình duyệt điện thoại có giới hạn: hiệu năng thấp hơn, khó lưu game, không chạy được các hệ máy
        nặng như PSP hay PlayStation. CheeEmu Pro mang toàn bộ trải nghiệm CheeEmu lên một app Android gốc — runtime J2ME
        riêng cộng với host libretro tự xây dựng để chạy nhiều hệ máy, trong khi vẫn dùng chung tài khoản, kho game và hệ
        thống thành tựu với website, để người chơi chuyển qua lại giữa web và app mà không mất tiến trình.
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
        <a :href="DOWNLOAD_URL" target="_blank" rel="noopener" class="btn btn-outline">
          Tải CheeEmu Pro ngay
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

.project-hero__grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 56px;
  align-items: center;
}

.project-hero__grid .project-hero__head {
  margin-bottom: 0;
}

.project-hero__cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.project-hero__img--phone {
  max-width: 340px;
  border-radius: 28px;
  justify-self: center;
}

@media (max-width: 900px) {
  .project-hero__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .project-hero__img--phone {
    max-width: 300px;
  }
}
</style>
