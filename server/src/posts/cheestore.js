export const cheestorePost = {
  title: 'CheeStore: xây web bán thẻ bài Yu-Gi-Oh! & Pokémon — từ AI Scan nhập kho đến đối soát chuyển khoản tự động',
  excerpt: 'Bán thẻ bài lẻ nghĩa là quản lý hàng nghìn mã thẻ, mỗi thẻ một set, một độ hiếm, một mức giá. Đây là cách CheeStore biến việc nhập kho thành "chụp ảnh rồi xác nhận", và tự khớp tiền chuyển khoản với đơn hàng không cần ai ngồi soi sao kê.',
  coverImage: '/images/Banner_CheeStore.png',
  contentHtml: `
<p><b>CheeStore</b> là cửa hàng trực tuyến của CheeHouse, chuyên thẻ bài lẻ Yu-Gi-Oh! và Pokémon. Thoạt nhìn nó giống mọi website bán hàng khác — danh mục, giỏ hàng, thanh toán, trang quản trị. Nhưng đặc thù "thẻ bài lẻ" tạo ra hai bài toán vận hành mà một shop thông thường không gặp, và phần lớn công sức của dự án nằm ở đó.</p>

<h2>Bài toán 1: nhập kho hàng nghìn mã thẻ</h2>
<p>Một shop quần áo có vài chục mẫu, mỗi mẫu vài size. Một shop thẻ bài lẻ thì mỗi lá là một sản phẩm riêng: cùng một tên card có thể in ở nhiều set khác nhau, mỗi bản in lại có độ hiếm khác nhau (Common, Super Rare, Secret Rare, Prismatic Secret Rare...) và giá chênh nhau gấp chục lần. Nhập tay từng lá — gõ mã set, tên, độ hiếm, tìm ảnh, tra giá — vừa chậm vừa dễ sai.</p>
<p>Giải pháp là tính năng <b>AI Scan</b> trong trang quản trị, hoạt động theo một luồng gồm bốn bước:</p>
<ul>
  <li><b>Chụp và cắt thẻ ngay trên trình duyệt.</b> Ảnh chụp bằng điện thoại hiếm khi thẳng: thẻ cầm hơi nghiêng, dư nền, lệch khung. Frontend dùng OpenCV.js để tìm đúng bốn góc của lá bài và nắn thẳng phối cảnh trước khi gửi đi — vừa giúp AI đọc chính xác hơn, vừa có sẵn ảnh sản phẩm sạch.</li>
  <li><b>AI đọc thẻ với output có cấu trúc.</b> Backend gửi ảnh cho một provider AI (hỗ trợ cả Claude, OpenAI và Gemini — admin chọn trong cài đặt). Prompt yêu cầu trả về đúng các trường: loại game, tên card giữ nguyên ngôn ngữ gốc, mã set (dạng <i>MP23-EN163</i> với Yu-Gi-Oh!, số thứ tự <i>182/191</i> với Pokémon), độ hiếm và một chỉ số <i>confidence</i>. Prompt dặn rõ: ảnh mờ hay không chắc thì trả "unknown" với confidence thấp, <b>đừng đoán bừa</b>.</li>
  <li><b>Đối chiếu với dữ liệu thẻ gốc.</b> Kết quả AI chỉ là "gợi ý đọc được". Hệ thống đối chiếu tiếp với cơ sở dữ liệu thẻ đồng bộ từ YGOProDeck và Pokémon TCG để lấy thông tin chuẩn. Với Pokémon, số thứ tự in trên thẻ là cách tin cậy nhất để khớp đúng một bản in; nếu số đọc sai thì lùi về khớp theo tên thay vì báo "không tìm thấy" oan.</li>
  <li><b>Admin luôn là người xác nhận cuối.</b> Các ứng viên được sắp theo độ khớp với độ hiếm AI đoán và chọn sẵn một gợi ý, nhưng admin vẫn thấy toàn bộ danh sách để tự chọn. Giá gợi ý được quy từ giá sàn USD sang VND theo tỷ giá đã đồng bộ, làm tròn nghìn. Nếu thẻ đã có trong kho, hệ thống chặn tạo trùng.</li>
</ul>
<p>Một quyết định đáng nhắc: phiên bản đầu dùng thêm một request AI nữa để tự viết mô tả sản phẩm. Sau một thời gian chạy thật, phần này bị bỏ để mỗi lần scan chỉ còn <b>đúng một request</b> — mô tả được dựng từ template theo dữ liệu thẻ. Tiết kiệm quota rõ rệt, còn chất lượng mô tả gần như không khác vì thông tin thẻ bài vốn đã có cấu trúc.</p>

<h2>Bài toán 2: tiền chuyển khoản về, đơn nào là của ai?</h2>
<p>Ở Việt Nam, chuyển khoản ngân hàng là cách thanh toán phổ biến nhất — nhưng cũng tốn công nhất cho người bán: mở app ngân hàng, đọc nội dung chuyển khoản, dò ngược sang đơn hàng, bấm xác nhận. Với vài đơn mỗi ngày còn chịu được, nhiều hơn thì thành việc toàn thời gian.</p>
<p>CheeStore tự động hoá việc này:</p>
<ul>
  <li>Mỗi đơn chọn chuyển khoản sinh một <b>mã QR VietQR</b> có sẵn số tiền và nội dung định danh đơn hàng — khách chỉ cần quét, không phải gõ tay.</li>
  <li>Khi có tiền vào tài khoản, <b>SePay</b> gọi webhook về backend (xác thực bằng API key). Backend đọc nội dung giao dịch, tìm đúng đơn, kiểm tra số tiền rồi chuyển trạng thái đơn sang đã thanh toán.</li>
  <li>Đơn chuyển khoản chưa hoàn tất có nút <b>thanh toán lại</b>, khách không phải đặt đơn mới.</li>
</ul>
<p>Song song, cửa hàng vẫn hỗ trợ MoMo và PayPal; admin bật/tắt từng phương thức ngay trong dashboard thay vì phải sửa code và deploy lại.</p>

<h2>Những thứ nhỏ nhưng ảnh hưởng doanh thu</h2>
<ul>
  <li><b>Mua không cần tài khoản.</b> Bắt khách đăng ký trước khi mua là cách chắc chắn để mất đơn. Khách vãng lai giờ thêm được vào giỏ và đặt hàng, form địa chỉ có dropdown tỉnh/phường theo API và validate theo từng trường.</li>
  <li><b>Trợ lý AI ngay góc màn hình.</b> Trả lời các câu hỏi lặp lại — đang khuyến mãi gì, đổi trả thế nào, phí ship bao nhiêu — và chuyển cho nhân viên qua kênh chat realtime (Socket.io) khi câu hỏi vượt quá phạm vi.</li>
  <li><b>Doanh thu chỉ tính đơn hoàn thành.</b> Nghe hiển nhiên, nhưng bản đầu cộng cả đơn đang chờ — số liệu đẹp mà sai.</li>
  <li><b>Theo dõi đơn có thanh tiến trình vận chuyển</b> và ghi chú đơn hàng hiển thị thẳng ở trang quản lý của admin.</li>
</ul>

<h2>SEO: lại là chuyện SPA</h2>
<p>Giống <a href="https://emu.cheehouse.io.vn/" target="_blank" rel="noopener">CheeEmu</a>, CheeStore là ứng dụng Vue chạy phía client, và Google Search Console sớm báo tình trạng quen thuộc: <i>"Crawled - currently not indexed"</i>. Cách xử lý cũng đi theo bài học cũ — prerender các trang public, sinh sitemap động, meta tag và dữ liệu có cấu trúc theo từng sản phẩm, đồng thời sửa lại trang chủ vốn bị lệch title so với nội dung và thiếu thẻ <i>h1</i>.</p>

<h2>Công nghệ</h2>
<p>Frontend Vue 3 + Vite + Pinia, Tailwind CSS kết hợp Bootstrap, Chart.js cho trang thống kê. Backend Node.js + Express 5, MySQL qua Sequelize, Socket.io cho chat và thông báo, Swagger cho tài liệu API, chạy sau Nginx và Cloudflare.</p>

<p>Bài học lớn nhất từ CheeStore có lẽ là: AI hữu ích nhất khi nó <b>đề xuất</b> chứ không <b>quyết định</b>. AI Scan không thay admin chọn bản in hay định giá — nó chỉ biến một việc mất vài phút thành vài giây, còn con người vẫn bấm nút cuối cùng.</p>
<p>Ghé cửa hàng tại <a href="https://store.cheehouse.io.vn/" target="_blank" rel="noopener">store.cheehouse.io.vn</a>, hoặc xem <a href="/du-an/cheestore">trang giới thiệu dự án CheeStore</a>.</p>
`,
}
