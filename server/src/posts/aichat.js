export const aichatPost = {
  title: 'Xây CheeHouse AIChat: chat đa mô hình AI với hệ thống token nội bộ và duyệt nạp tiền thủ công',
  excerpt: 'Một web app chat AI tự host, nhiều người dùng, hỗ trợ nhiều mô hình AI cùng lúc qua một router trung gian tự dựng — kèm ví token nội bộ, giới hạn ngân sách theo tháng và bộ lọc kiểm duyệt hai lớp.',
  coverImage: '/images/Project_PMChatAI_API.png',
  contentHtml: `
<p><b>CheeHouse AIChat</b> là một web app chat AI tự host, cho phép nhiều người dùng đăng ký tài khoản và trò chuyện với nhiều mô hình AI khác nhau trong cùng một giao diện — có ví "CheeToken" nội bộ để tính chi phí theo từng lần chat, thay vì mỗi người tự trả tiền API riêng.</p>

<h2>Không gọi thẳng OpenAI/Anthropic — mà qua một router trung gian tự dựng</h2>
<p>Điểm khác biệt lớn nhất so với một chatbot demo thông thường: backend không gọi trực tiếp API của OpenAI hay Anthropic, mà proxy toàn bộ request tới một service tự host riêng gọi là <b>"9Router"</b> — đóng vai trò gom nhiều nhà cung cấp AI lại thành một điểm truy cập chuẩn OpenAI-compatible. Nhờ vậy phần lõi của AIChat không cần quan tâm đang nói chuyện với model nào, chỉ cần xử lý đúng 2 định dạng dữ liệu stream trả về (kiểu OpenAI và kiểu Anthropic gốc) cùng lúc, vì router có thể trả về theo format của nhà cung cấp gốc tuỳ model được chọn.</p>

<h2>Kiến trúc</h2>
<ul>
  <li>Backend: Node.js (Express) + Sequelize/MySQL, xác thực JWT + bcrypt, xử lý file upload bằng Multer, đọc nội dung PDF (pdf-parse) và Word (mammoth).</li>
  <li>Frontend: Vue 3 + Vite, render markdown bằng thư viện marked, không dùng UI framework có sẵn — CSS viết tay toàn bộ.</li>
</ul>

<h2>Streaming trả lời theo thời gian thực</h2>
<p>Câu trả lời của AI được stream về client từng đoạn nhỏ qua Server-Sent Events, thay vì chờ toàn bộ câu trả lời xong mới hiển thị. Cái khó là backend vừa phải chuyển tiếp nguyên trạng từng chunk dữ liệu cho client càng nhanh càng tốt, vừa phải tự "đọc trộm" trong luồng đó để trích ra số token đã dùng — cần thiết cho việc trừ tiền trong ví ngay sau khi trả lời xong, mà không được làm chậm hoặc làm hỏng luồng stream đang gửi cho người dùng.</p>

<h2>Ví token nội bộ và nhiều lớp kiểm soát chi phí</h2>
<p>Trước khi một cuộc chat được phép bắt đầu, hệ thống phải xác nhận đồng thời: model đó có nằm trong danh sách được phép dùng không, người dùng có đang vượt giới hạn token cho model này không, có đang vượt ngân sách chi tiêu trong tháng không, và số dư ví có đủ không. Cả bốn điều kiện được kiểm tra trước khi mở kết nối stream, trả về đúng mã lỗi tương ứng (thiếu quyền, hết ngân sách, hay không đủ số dư) thay vì một lỗi chung chung.</p>
<p>Việc trừ tiền trong ví được thiết kế có khoá dòng dữ liệu (row locking) khi cập nhật số dư — tránh trường hợp người dùng gửi nhiều request cùng lúc làm số dư bị trừ sai do race condition.</p>

<h2>Ngữ cảnh hội thoại (Context) và một góc chưa hoàn thiện</h2>
<p>Người dùng có thể tạo sẵn các đoạn văn bản (Markdown) đặt tên riêng, dùng làm "ngữ cảnh" chèn vào đầu mỗi cuộc trò chuyện — tiện cho việc tái sử dụng system prompt mà không phải gõ lại. Tính năng này lưu ở backend, đồng bộ được giữa các thiết bị.</p>
<p>Thành thật mà nói, có một tính năng "Memory" khác trong app hiện chỉ lưu ở <b>localStorage</b> trên trình duyệt — cùng ý tưởng chèn ngữ cảnh nhưng chưa được đồng bộ lên server, nên đổi máy hoặc xoá cache trình duyệt là mất. Đây là một điểm mình biết rõ và để dành làm sau, chưa đồng bộ hoá 2 cơ chế này lại với nhau.</p>

<h2>Kiểm duyệt nội dung hai lớp</h2>
<p>Trước khi một tin nhắn được gửi tới model, hệ thống chạy qua một bộ lọc regex kiểm tra từ khoá nhạy cảm (jailbreak, vũ khí, ma tuý, mã độc...) hỗ trợ cả tiếng Việt lẫn tiếng Anh — nhanh, chạy cục bộ, không tốn phí. Nếu cấu hình thêm, có thể gọi tiếp OpenAI Moderation API làm lớp kiểm tra thứ hai. Nếu lớp gọi API bị timeout, hệ thống chủ động "fail open" (cho qua) thay vì chặn cứng toàn bộ, tránh làm gián đoạn trải nghiệm chỉ vì một dịch vụ ngoài bị chậm. Tài khoản admin được bỏ qua bộ lọc này.</p>

<h2>Nạp tiền: duyệt thủ công, không qua cổng thanh toán</h2>
<p>Hệ thống nạp CheeToken hiện hoạt động theo hướng đơn giản và an toàn: người dùng gửi yêu cầu nạp theo các mệnh giá cố định, admin xác nhận thủ công trong trang quản trị rồi mới cộng token vào ví. Chưa tích hợp cổng thanh toán tự động — đây là lựa chọn có chủ đích cho quy mô hiện tại, ưu tiên kiểm soát chặt hơn là tự động hoá hoàn toàn.</p>

<h2>Trang quản trị</h2>
<p>Admin quản lý giới hạn token theo từng model, tự động phân loại model nào miễn phí/trả phí dựa trên tên trả về từ router (vì bản thân router không cung cấp sẵn thông tin giá), kiểm tra tình trạng hoạt động của từng model, quản lý vai trò người dùng và duyệt hàng đợi yêu cầu nạp tiền.</p>

<p>Dự án này là bài tập thực tế về việc quản lý chi phí và quyền truy cập khi cho nhiều người dùng cùng chia sẻ một nguồn tài nguyên AI trả phí — phần khó không nằm ở việc gọi API AI, mà ở lớp kiểm soát xung quanh nó.</p>
`,
}
