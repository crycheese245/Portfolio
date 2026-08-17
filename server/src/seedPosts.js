import { nanoid } from 'nanoid'
import { slugify } from './utils/slug.js'

// Seed content for the very first deploy so the blog isn't empty on day one.
// Safe to edit/delete afterwards from the admin panel — this only runs once,
// when the blog_posts table is empty.
const firstPosts = [
  {
    title: 'Vì sao ứng dụng SPA thường "vô hình" với Google — case study từ CheeEmu',
    excerpt: 'CheeEmu từng có 0 trên 370 trang được Google index dù kỹ thuật SEO cơ bản (robots.txt, sitemap, meta tag) đều đúng chuẩn. Đây là quá trình chẩn đoán và sửa thật.',
    coverImage: '/images/Project_AppRunEmu.png',
    contentHtml: `
<p>Một trong những dự án mình đang duy trì là <b>CheeEmu</b> — nền tảng web cho phép chơi lại game Java J2ME cổ điển ngay trên trình duyệt. Sau vài tháng vận hành, Google Search Console báo một con số khiến mình khá bất ngờ: <b>0 trên 370 trang được index</b>. Không phải index chậm, mà là index bằng 0 tuyệt đối.</p>

<h2>Triệu chứng ban đầu</h2>
<p>Mở báo cáo "Page indexing" trong Search Console, phần lớn URL rơi vào nhóm <b>"Discovered - currently not indexed"</b> (368 trang) — nghĩa là Google biết URL tồn tại qua sitemap, nhưng chưa buồn crawl. Một trang duy nhất rơi vào <b>"Crawled - currently not indexed"</b>, và lần validate gần nhất đã <b>Failed</b> — tức Google thực sự đã vào crawl, đọc được nội dung, và vẫn quyết định không index.</p>
<p>Dòng "Crawled - currently not indexed" kèm Failed chính là manh mối quan trọng nhất: đây không phải lỗi chặn kỹ thuật (robots.txt, thẻ noindex đều kiểm tra sạch), mà là <b>quyết định chủ động của Google</b> rằng nội dung không đáng để index.</p>

<h2>Nguyên nhân gốc: Googlebot và người dùng thấy hai thứ khác nhau</h2>
<p>CheeEmu là ứng dụng Vue SPA — toàn bộ nội dung được render bằng JavaScript phía client. Để Googlebot không phải chờ JS chạy xong (và để hỗ trợ mạng xã hội hiển thị preview đẹp), server có một tầng <i>prerender</i>: Nginx nhận diện crawler qua User-Agent, và nếu đúng là bot thì trả về một bản HTML dựng sẵn ở backend thay vì SPA shell rỗng.</p>
<p>Vấn đề nằm ở chính bản HTML dựng sẵn đó. Kiểm tra kỹ mới thấy nó cực kỳ sơ sài — mỗi trang game chỉ có đúng:</p>
<blockquote>&lt;h1&gt;Chơi {tên game} trực tuyến&lt;/h1&gt;<br>&lt;p&gt;{nhà sản xuất} · {thể loại}&lt;/p&gt;<br>&lt;p&gt;{một câu mô tả ngắn}&lt;/p&gt;</blockquote>
<p>Trong khi đó, người dùng thật vào cùng trang lại thấy đầy đủ: bài viết mô tả dài, thống kê lượt xem/lượt thích/đánh giá, bảng tương thích trình giả lập, danh sách game liên quan... Googlebot — thứ duy nhất quyết định trang có được index hay không — chỉ nhìn thấy phiên bản nghèo nàn nhất. Kết hợp với việc domain còn mới, chưa có nhiều tín hiệu uy tín, đây gần như là công thức chuẩn cho "thin content" theo đúng nghĩa đen.</p>

<h2>Cách sửa</h2>
<p>Giải pháp không phức tạp về mặt kỹ thuật — chỉ là <b>làm giàu lại đúng phần nội dung bot nhìn thấy</b>, dùng chính dữ liệu đã có sẵn trong database:</p>
<ul>
  <li>Trang game: trả về toàn bộ bài viết mô tả (thay vì bản rút gọn 1 câu), thống kê lượt xem/thích/đánh giá thật, bảng tương thích trình giả lập, danh sách game cùng thể loại, breadcrumb dạng link thật thay vì chỉ nhúng trong JSON-LD ẩn.</li>
  <li>Trang chủ: thêm số lượng game thực tế, danh sách đầy đủ thể loại và nhà sản xuất kèm liên kết.</li>
  <li>Các trang danh mục (thể loại / nhà sản xuất / loại giả lập): từ chỗ chỉ có tiêu đề + một câu mô tả tĩnh, giờ liệt kê thật các mục con kèm số lượng game.</li>
</ul>
<p>Sau khi deploy, kiểm chứng bằng cách giả lập chính Googlebot:</p>
<blockquote>curl -A "Googlebot" https://emu.cheehouse.io.vn/</blockquote>
<p>để chắc chắn nội dung mới thực sự lên production trước khi bấm "Request Indexing" trong Search Console.</p>

<h2>Bài học rút ra</h2>
<p>Vài điều mình nghĩ đáng nhớ lại cho lần sau:</p>
<ul>
  <li><b>"Deploy xong" không có nghĩa là Googlebot đã thấy bản mới.</b> Luôn kiểm tra bằng chính User-Agent của bot, đừng chỉ tin vào việc trang chạy đúng trên trình duyệt của mình.</li>
  <li><b>Dynamic rendering (trả HTML khác nhau cho bot vs người dùng) là con dao hai lưỡi.</b> Nó giải quyết bài toán SPA-not-indexable, nhưng nếu bản cho bot quá sơ sài so với bản thật, hậu quả còn tệ hơn cả không prerender gì cả — vì trông giống thin content hoặc cloaking.</li>
  <li><b>"Crawled successfully" không đồng nghĩa "sẽ được index".</b> Google tách bạch rõ hai bước, và bước quyết định index luôn xét đến chất lượng nội dung thực tế nhận được ở lần crawl đó.</li>
</ul>
<p>Domain vẫn còn mới nên quá trình index lại cần thời gian — nhưng ít nhất giờ đây gốc rễ vấn đề đã được xử lý đúng chỗ, chứ không phải đoán mò.</p>
`,
  },
]

export async function seedFirstPosts(BlogPost) {
  const count = await BlogPost.count()
  if (count > 0) return

  for (const post of firstPosts) {
    await BlogPost.create({
      id: nanoid(),
      slug: slugify(post.title),
      title: post.title,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      contentHtml: post.contentHtml.trim(),
      published: true,
    })
  }

  console.log(`[db] Seeded ${firstPosts.length} initial blog post(s).`)
}
