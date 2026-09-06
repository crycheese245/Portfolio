// Server-rendered HTML for crawlers (Googlebot, the AdSense reviewer bot, social
// link previews, ...). The public site is a pure client-rendered Vue SPA - its
// raw HTML is just `<div id="app"></div>`, so any crawler that doesn't run
// JavaScript (or times out trying) sees an empty page. Nginx routes bot
// user-agents here instead of the static build; everyone else still gets the
// normal SPA. Mirrors the same fix already applied to the CheeEmu project.

import { Router } from 'express'
import { BlogPost } from './models/BlogPost.js'

export const prerenderRoutes = Router()

const SITE_URL = 'https://cheehouse.io.vn'

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatDate(value) {
  return new Date(value).toISOString().slice(0, 10)
}

function layout({ title, description, canonical, image, bodyHtml }) {
  const fullTitle = title.includes('CheeHouse') ? title : `${title} | CheeHouse`
  const ogImage = image || `${SITE_URL}/images/cheehouse-logo.png`

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${esc(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="CheeHouse">
  <meta property="og:title" content="${esc(fullTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:image" content="${esc(ogImage)}">
</head>
<body>
${bodyHtml}
</body>
</html>`
}

function send(res, opts) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.send(layout(opts))
}

// ── Homepage ─────────────────────────────────────────────────────────────────

prerenderRoutes.get('/', async (_req, res) => {
  const description = 'CheeHouse – Hoang Tri Dung Portfolio – Full Stack Developer & Flutterer'
  const posts = await BlogPost.findAll({ where: { published: true }, order: [['createdAt', 'DESC']], limit: 5 })

  const postListHtml = posts.length
    ? `<h2>Bài viết gần đây</h2>\n<ul>\n${posts
        .map((p) => `  <li><a href="${SITE_URL}/blog/${esc(p.slug)}">${esc(p.title)}</a></li>`)
        .join('\n')}\n</ul>`
    : ''

  send(res, {
    title: 'CheeHouse | Portfolio',
    description,
    canonical: SITE_URL,
    bodyHtml: [
      '<h1>Hoàng Trí Dũng — Full Stack Developer</h1>',
      '<p>Tôi là Full Stack Developer chuyên về AI &amp; Automation, tập trung xây dựng website và hệ thống Bot tự động hóa cho cửa hàng nhỏ, mang đến trải nghiệm kỹ thuật số thông minh và hiệu quả.</p>',
      '<h2>Về tôi</h2>',
      '<p>Bạn cần một website chuyên nghiệp hay một trợ lý ảo thông minh? Tôi ở đây để giúp bạn. Tôi tập trung vào việc tạo ra các sản phẩm số thực tế, giúp các cửa hàng nhỏ và cá nhân vận hành hiệu quả hơn.</p>',
      '<p>Từ việc xây dựng website chuẩn SEO đến tích hợp AI thông minh hay thiết lập các Bot tự động trên Zalo, Messenger, Discord — tôi đảm bảo sản phẩm không chỉ đẹp mắt mà còn mang lại giá trị thực tế cho khách hàng.</p>',
      '<h2>Dự án nổi bật</h2>',
      '<ul>',
      `  <li><a href="${SITE_URL}/blog/xay-he-thong-quan-ly-dai-ly-ve-so-tu-chon-doi-soat-ket-qua-tinh-thuong-va-xuat-bang-ke-tu-dong">Website Quản lý Đại lý Vé số</a></li>`,
      `  <li><a href="${SITE_URL}/blog/xay-cheehouse-aichat-chat-da-mo-hinh-ai-voi-he-thong-token-noi-bo-va-duyet-nap-tien-thu-cong">Tích hợp Chat AI API (CheeHouse AIChat)</a></li>`,
      `  <li><a href="${SITE_URL}/blog/cheebot-tu-dong-hoa-van-hanh-cho-mot-server-discord-role-sinh-nhat-kenh-gia-song">Discord Bot Đa năng</a></li>`,
      `  <li><a href="${SITE_URL}/du-an/cheeemu">CheeEmu — Nền tảng lưu trữ và giả lập game J2ME</a></li>`,
      '</ul>',
      postListHtml
    ].filter(Boolean).join('\n')
  })
})

// ── Blog list ────────────────────────────────────────────────────────────────

prerenderRoutes.get('/blog', async (_req, res) => {
  const posts = await BlogPost.findAll({ where: { published: true }, order: [['createdAt', 'DESC']] })

  const listHtml = posts.length
    ? `<ul>\n${posts
        .map((p) => `  <li><a href="${SITE_URL}/blog/${esc(p.slug)}">${esc(p.title)}</a> — ${formatDate(p.createdAt)}<br>${esc(p.excerpt)}</li>`)
        .join('\n')}\n</ul>`
    : '<p>Chưa có bài viết nào.</p>'

  send(res, {
    title: 'Blog & Case Study',
    description: 'Ghi chép về những vấn đề kỹ thuật thật đã gặp và cách giải quyết trong quá trình xây dựng sản phẩm.',
    canonical: `${SITE_URL}/blog`,
    bodyHtml: ['<h1>Blog &amp; Case Study</h1>', listHtml].join('\n')
  })
})

// ── Blog post detail ─────────────────────────────────────────────────────────

prerenderRoutes.get('/blog/:slug', async (req, res, next) => {
  const post = await BlogPost.findOne({ where: { slug: req.params.slug, published: true } })
  if (!post) return next()

  send(res, {
    title: post.title,
    description: post.excerpt,
    canonical: `${SITE_URL}/blog/${post.slug}`,
    image: post.coverImage ? `${SITE_URL}${post.coverImage}` : undefined,
    bodyHtml: [
      `<h1>${esc(post.title)}</h1>`,
      `<p>${formatDate(post.createdAt)}</p>`,
      post.coverImage ? `<img src="${esc(post.coverImage)}" alt="${esc(post.title)}">` : '',
      post.contentHtml
    ].filter(Boolean).join('\n')
  })
})

// ── CheeEmu case study ───────────────────────────────────────────────────────

prerenderRoutes.get('/du-an/cheeemu', (_req, res) => {
  send(res, {
    title: 'CheeEmu — Nền tảng giả lập game Java J2ME trên trình duyệt',
    description: 'Nền tảng web lưu trữ và giả lập game Java J2ME cổ điển, chơi trực tiếp trên trình duyệt hiện đại - không cần cài đặt phần mềm.',
    canonical: `${SITE_URL}/du-an/cheeemu`,
    image: `${SITE_URL}/images/Project_AppRunEmu.png`,
    bodyHtml: [
      '<h1>CheeEmu — Trạm Dừng Ký Ức</h1>',
      '<p>Nền tảng web lưu trữ và giả lập game Java J2ME cổ điển, cho phép người dùng chơi lại những tựa game di động huyền thoại ngay trên trình duyệt hiện đại — không cần cài đặt phần mềm, không cần điện thoại cũ.</p>',
      '<h2>Tổng quan</h2>',
      '<p>CheeEmu ra đời từ nhu cầu rất thực tế: rất nhiều tựa game Java (J2ME) trên điện thoại "cục gạch" ngày trước không còn cách nào chơi lại được. CheeEmu giải quyết bằng một nền tảng web duy nhất: chơi trực tiếp trong trình duyệt bằng runtime CheerpJ, có tài khoản để lưu tiến trình, và có cộng đồng để đánh giá, trò chuyện.</p>',
      '<h2>Công nghệ sử dụng</h2>',
      '<p>Vue 3 + Vite (frontend), Node.js + Express (backend), MySQL + Sequelize ORM, CheerpJ (Java-to-Web runtime), Socket.io (chat &amp; phòng chơi realtime), mạng ảo Tailscale cho multiplayer online.</p>',
      '<p><a href="https://emu.cheehouse.io.vn/">Xem website trực tiếp</a></p>'
    ].join('\n')
  })
})

// ── Legal pages ──────────────────────────────────────────────────────────────

prerenderRoutes.get('/chinh-sach-bao-mat', (_req, res) => {
  send(res, {
    title: 'Chính sách bảo mật',
    description: 'Chính sách bảo mật của CheeHouse - cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.',
    canonical: `${SITE_URL}/chinh-sach-bao-mat`,
    bodyHtml: [
      '<h1>Chính sách bảo mật</h1>',
      '<p>CheeHouse tôn trọng quyền riêng tư của người truy cập website cheehouse.io.vn và các trang con của nó.</p>',
      '<h2>Thông tin chúng tôi thu thập</h2>',
      '<p>Thông tin bạn chủ động cung cấp qua form liên hệ (họ tên, email, tiêu đề, nội dung), và thông tin thu thập tự động qua cookie phục vụ thống kê và hiển thị quảng cáo.</p>',
      '<h2>Cookie và quảng cáo cá nhân hoá (Google AdSense)</h2>',
      '<p>Website này sử dụng dịch vụ quảng cáo Google AdSense. Google sử dụng cookie để hiển thị quảng cáo dựa trên lịch sử truy cập của bạn. Bạn có thể từ chối quảng cáo cá nhân hoá tại Cài đặt quảng cáo của Google (adssettings.google.com).</p>',
      '<h2>Liên hệ</h2>',
      '<p>Email: hoangtridung.work245@gmail.com — Địa chỉ: Tỉnh Vĩnh Long, Việt Nam</p>'
    ].join('\n')
  })
})

prerenderRoutes.get('/dieu-khoan-dich-vu', (_req, res) => {
  send(res, {
    title: 'Điều khoản dịch vụ',
    description: 'Điều khoản dịch vụ khi truy cập và sử dụng website CheeHouse.',
    canonical: `${SITE_URL}/dieu-khoan-dich-vu`,
    bodyHtml: [
      '<h1>Điều khoản dịch vụ</h1>',
      '<p>Khi truy cập và sử dụng website cheehouse.io.vn, bạn đồng ý với các điều khoản: nội dung thuộc quyền sở hữu của tác giả, không sao chép phân phối lại với mục đích thương mại khi chưa được đồng ý, và không sử dụng website vào mục đích vi phạm pháp luật.</p>',
      '<p>Website có hiển thị quảng cáo thông qua Google AdSense theo chính sách quảng cáo của Google.</p>',
      '<h2>Liên hệ</h2>',
      '<p>Email: hoangtridung.work245@gmail.com — Địa chỉ: Tỉnh Vĩnh Long, Việt Nam</p>'
    ].join('\n')
  })
})
