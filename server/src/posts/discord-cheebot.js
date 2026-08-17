export const discordCheebotPost = {
  title: 'CheeBOT: tự động hoá vận hành cho một server Discord — role, sinh nhật, kênh giá sống',
  excerpt: 'Một bot Discord quy mô nhỏ cho một cộng đồng cụ thể, nhưng giải quyết vài bài toán vận hành thực tế đáng kể: phân biệt kick với rời nhóm, kênh tự đổi tên theo giá coin/tỷ giá mỗi 10 phút, và một quirk timezone khi deploy lên Railway.',
  coverImage: '/images/Project_DiscordBot.png',
  contentHtml: `
<p><b>CheeBOT</b> là một bot Discord viết cho một cộng đồng cụ thể — không phải sản phẩm đa server hướng thương mại, mà một công cụ tự động hoá vài việc vận hành lặp đi lặp lại trong server: chào thành viên mới, nhắc sinh nhật, chấm điểm hoạt động, và hiển thị giá coin/tỷ giá ngoại tệ theo thời gian thực ngay trên tên kênh.</p>

<h2>Kiến trúc</h2>
<p>discord.js v14, JavaScript thuần (không TypeScript), lưu dữ liệu bằng file JSON thay vì database (phù hợp quy mô một server), lên lịch bằng node-cron, chạy như một Node process đơn giản.</p>

<h2>Tính năng thực tế</h2>
<ul>
  <li><b>Tự động gán role</b> khi có thành viên mới tham gia, kèm embed chào mừng.</li>
  <li><b>Phân biệt kick và tự rời nhóm</b> — khi một thành viên biến mất khỏi server, bot kiểm tra audit log trong cửa sổ 5 giây để xác định đó là bị kick hay tự rời, thay vì chỉ báo chung chung "đã rời server".</li>
  <li><b>Hệ thống sinh nhật</b> — lưu ngày sinh, chạy cron hàng ngày để tự đăng lời chúc đúng ngày.</li>
  <li><b>Hệ thống level/XP</b> — cộng điểm ngẫu nhiên khi thành viên nhắn tin trong kênh chỉ định, có cooldown chống spam để farm điểm, kèm lệnh xem hạng/bảng xếp hạng.</li>
  <li><b>Kênh giá sống</b> — hai tiến trình định kỳ đổi tên kênh Discord theo giá coin (lấy từ API sàn MEXC) và tỷ giá ngoại tệ (lấy từ nguồn dữ liệu XML của Vietcombank), cập nhật mỗi 10 phút.</li>
</ul>

<h2>Điểm kỹ thuật đáng nhắc: quirk timezone lúc deploy</h2>
<p>Ban đầu dùng thẳng tuỳ chọn timezone có sẵn của node-cron để chạy job đúng giờ Việt Nam, nhưng khi triển khai lên Railway, tuỳ chọn này chạy không ổn định — cùng một lịch nhưng thực thi lệch giờ khó lường. Giải pháp cuối cùng đơn giản mà chắc chắn hơn: bỏ tuỳ chọn timezone, tính sẵn giờ UTC tương ứng với giờ Việt Nam mong muốn rồi hardcode thẳng giờ đó vào lịch cron. Kém "đẹp" hơn về mặt code, nhưng loại bỏ hẳn một lớp phụ thuộc vào việc container có cấu hình timezone đúng hay không.</p>

<h2>Giới hạn đổi tên kênh của Discord</h2>
<p>Discord chỉ cho phép đổi tên một kênh tối đa 2 lần mỗi 10 phút. Vì kênh giá coin và tỷ giá cần cập nhật gần như liên tục, bot dùng một vòng lặp đúng chu kỳ 10 phút, và trước khi gọi API đổi tên còn kiểm tra xem giá trị mới có thực sự khác giá trị cũ hay không — tránh tốn một lượt đổi tên quý giá cho một con số không đổi.</p>

<h2>Vài chi tiết vận hành khác</h2>
<p>Toàn bộ lệnh và event được nạp động bằng cách đọc thư mục theo quy ước đặt tên (mỗi file export ra <i>name</i> và <i>execute</i>), giúp thêm lệnh mới chỉ cần thêm file chứ không phải sửa file khởi động. Có bắt lỗi ở tầng process (unhandledRejection, uncaughtException) để bot không sập hoàn toàn vì một lỗi nhỏ không lường trước.</p>

<p>Đây không phải một bot "AI thông minh" gì cả — mà là ví dụ cho việc đôi khi bài toán vận hành thực tế (nhắc lịch đúng giờ, tránh rate limit, phân biệt đúng ngữ cảnh sự kiện) chỉ cần logic rõ ràng và một vài quyết định kỹ thuật thực dụng, không cần công nghệ phức tạp.</p>
`,
}
