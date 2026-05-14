<script setup>
import { ref, computed } from 'vue'

const filters = ['Tất cả', 'Web', 'Mobile', 'BotAutomation']
const activeFilter = ref('Tất cả')

const projects = [
  {
    id: 1,
    image: '/images/Project_PMQLDailyveso.png',
    category: 'Web',
    title: 'Website Quản lý Đại lý Vé số',
    desc: 'Hệ thống quản lý vé số trực tuyến với tính năng theo dõi doanh thu, quản lý kho vé và báo cáo theo thời gian thực.',
  },
  {
    id: 2,
    image: '/images/Project_PMChatAI_API.png',
    category: 'Web',
    title: 'Tích hợp Chat AI API',
    desc: 'Hệ thống chat thông minh tích hợp AI API, hỗ trợ tự động trả lời và xử lý hội thoại theo ngữ cảnh cho website và ứng dụng.',
  },
  {
    id: 3,
    image: '/images/Project_DiscordBot.png',
    category: 'BotAutomation',
    title: 'Discord Bot Đa năng',
    desc: 'Bot Discord tích hợp AI tự động quản lý server, phân loại ticket hỗ trợ, gửi thông báo sự kiện và tương tác với thành viên cộng đồng 24/7.',
  },
  {
    id: 4,
    image: '/images/Project_MapleInfo.png',
    category: 'Mobile',
    title: 'MapleInfo – Tra cứu MapleStory N',
    desc: 'Ứng dụng tra cứu thông tin nhân vật, vật phẩm và bảng xếp hạng trong game MapleStory N. Hỗ trợ tìm kiếm nhanh, phân tích chỉ số nhân vật và cập nhật dữ liệu theo thời gian thực.',
  },
  {
    id: 5,
    image: '/images/Project_AppRunEmu.png',
    category: 'Web',
    title: 'Nền tảng lưu trữ và giả lập game J2ME (Java)',
    desc: 'CheeEmu là một nền tảng web được thiết kế để lưu trữ và giả lập các trò chơi J2ME cổ điển, cho phép người dùng trải nghiệm lại các tựa game di động huyền thoại trực tiếp trên trình duyệt hiện đại mà không cần cài đặt thêm phần mềm phức tạp.',
  },
  {
    id: 6,
    image: '/images/Project_Portfolio_CheeHouse.png',
    category: 'Web',
    title: 'Website Portfolio Cá nhân',
    desc: 'Trang portfolio chuyên nghiệp với animation mượt mà, tối ưu SEO và tích hợp form liên hệ kết nối trực tiếp qua email.',
  },
  {
    id: 7,
    image: '',
    category: 'Web',
    title: 'Đang cập nhật...',
    desc: 'Dự án mới đang được hoàn thiện. Hãy theo dõi để cập nhật sớm nhất!',
    placeholder: true,
  },
]

const PAGE_SIZE = 6
const visibleCount = ref(PAGE_SIZE)

const filtered = computed(() =>
  activeFilter.value === 'Tất cả'
    ? projects
    : projects.filter(p => p.category === activeFilter.value)
)

const displayed = computed(() => filtered.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < filtered.value.length)

const setFilter = (f) => {
  activeFilter.value = f
  visibleCount.value = PAGE_SIZE
}

const loadMore = () => { visibleCount.value += PAGE_SIZE }

const modal = ref(null)
const openModal = (project) => {
  modal.value = project
  document.body.style.overflow = 'hidden'
}
const closeModal = () => {
  modal.value = null
  document.body.style.overflow = ''
}
</script>

<template>
  <section id="portfolio" class="section portfolio">
    <div class="container">
      <div class="section-header reveal">
        <p class="tag">Dự án của tôi</p>
        <h2 class="section-title">Dự án nổi bật</h2>
        <p class="section-subtitle">
          Những dự án tiêu biểu kết hợp giữa tư duy thiết kế và sức mạnh công nghệ. Tôi giúp bạn hiện thực hóa ý tưởng qua các hệ thống Web App hiện đại và trợ lý ảo AI hoạt động đa nền tảng.
        </p>
      </div>

      <!-- Filter tabs -->
      <div class="portfolio__filters reveal">
        <button
          v-for="f in filters"
          :key="f"
          class="portfolio__filter"
          :class="{ 'portfolio__filter--active': activeFilter === f }"
          @click="setFilter(f)"
        >
          {{ f }}
        </button>
      </div>

      <!-- Grid -->
      <TransitionGroup name="pf" tag="div" class="portfolio__grid">
        <div
          v-for="project in displayed"
          :key="project.id"
          class="portfolio__item"
          :class="{ 'portfolio__item--placeholder': project.placeholder }"
        >
          <div class="portfolio__img-wrap">
            <div v-if="project.placeholder" class="portfolio__placeholder-img">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--border)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span>Sắp Triển khai & Đồng hành</span>
            </div>
            <img v-else :src="project.image" :alt="project.title" class="portfolio__img" loading="lazy" />
            <div v-if="!project.placeholder" class="portfolio__overlay">
              <button class="btn btn-white btn-sm" @click.prevent="openModal(project)">
                Xem chi tiết
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
          <div class="portfolio__info">
            <span class="tag" style="font-size:11px">{{ project.category }}</span>
            <h3 class="portfolio__title">{{ project.title }}</h3>
            <p class="portfolio__desc">{{ project.desc }}</p>
          </div>
        </div>
      </TransitionGroup>

      <!-- Modal lightbox -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="modal" class="pf-modal" @click.self="closeModal">
            <div class="pf-modal__box">
              <button class="pf-modal__close" @click="closeModal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <img :src="modal.image" :alt="modal.title" class="pf-modal__img" />
              <div class="pf-modal__info">
                <span class="tag" style="font-size:11px">{{ modal.category }}</span>
                <h3 class="pf-modal__title">{{ modal.title }}</h3>
                <p class="pf-modal__desc">{{ modal.desc }}</p>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <div v-if="hasMore" class="portfolio__footer reveal">
        <button class="btn btn-outline" @click="loadMore">
          Xem thêm dự án
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio__filters {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.portfolio__filter {
  padding: 9px 22px;
  border-radius: 100px;
  border: 1.5px solid var(--border);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-gray);
  background: none;
  cursor: pointer;
  transition: var(--transition);
  font-family: inherit;
}

.portfolio__filter:hover,
.portfolio__filter--active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  position: relative;
}

.pf-enter-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.pf-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; position: absolute; width: 0; overflow: hidden; }
.pf-enter-from  { opacity: 0; transform: translateY(20px); }
.pf-leave-to    { opacity: 0; transform: translateY(-10px); }

.portfolio__item {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  transition: var(--transition);
}

.portfolio__item:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-6px);
}

.portfolio__img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/10;
}

.portfolio__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.portfolio__item:hover .portfolio__img {
  transform: scale(1.06);
}

.portfolio__overlay {
  position: absolute;
  inset: 0;
  background: rgba(124, 58, 237, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.portfolio__item:hover .portfolio__overlay { opacity: 1; }

.portfolio__info {
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.portfolio__title {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-dark);
}

.portfolio__desc {
  font-size: 13px;
  color: var(--text-gray);
  line-height: 1.65;
}

.portfolio__footer {
  text-align: center;
  margin-top: 52px;
}

.portfolio__item--placeholder {
  border-style: dashed;
  opacity: 0.6;
}

.portfolio__placeholder-img {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--bg-light);
  color: var(--text-gray);
  font-size: 13px;
  font-weight: 500;
}

@media (max-width: 900px) {
  .portfolio__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .portfolio__grid { grid-template-columns: 1fr; }
}

/* ---- Modal ---- */
.pf-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.pf-modal__box {
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  max-width: 860px;
  width: 100%;
  box-shadow: 0 32px 80px rgba(0,0,0,0.3);
  position: relative;
}

.pf-modal__close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.5);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: background 0.2s;
}

.pf-modal__close:hover { background: rgba(0,0,0,0.8); }

.pf-modal__img {
  width: 100%;
  max-height: 520px;
  object-fit: contain;
  background: #f8f8f8;
  display: block;
}

.pf-modal__info {
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pf-modal__title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-dark);
}

.pf-modal__desc {
  font-size: 14px;
  color: var(--text-gray);
  line-height: 1.7;
}

/* Modal transition */
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-active .pf-modal__box, .modal-leave-active .pf-modal__box { transition: transform 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .pf-modal__box, .modal-leave-to .pf-modal__box { transform: scale(0.92); }
</style>
