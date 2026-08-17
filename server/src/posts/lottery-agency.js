export const lotteryAgencyPost = {
  title: 'Xây hệ thống quản lý đại lý vé số tự chọn: đối soát kết quả, tính thưởng và xuất bảng kê tự động',
  excerpt: 'Một hệ thống back-office thực tế cho đại lý vé số tự chọn (kiểu lô đề) miền Nam — từ việc mô phỏng đúng luật 18 giải xổ số, tự động dò kết quả, đến xuất file Excel y hệt bảng kê giấy phải nộp cuối ngày.',
  coverImage: '/images/Project_PMQLDailyveso.png',
  contentHtml: `
<p>Đây là một trong những dự án mình thấy thú vị nhất về mặt logic nghiệp vụ: phần mềm quản lý cho <b>đại lý vé số tự chọn</b> (kiểu lô đề) khu vực miền Nam. Khác với các app "vé số" demo thường thấy, đây là công cụ vận hành thật — nhân viên nhập tay từng vé khách cược trong ngày, hệ thống tự đối soát với kết quả xổ số chính thức, tính tiền thưởng, và cuối cùng phải xuất ra đúng mẫu <b>"bảng kê cùi vé"</b> bằng giấy mà đại lý nộp lại cho công ty xổ số.</p>

<h2>Bài toán thực tế</h2>
<p>Vé số tự chọn (Đầu/Đuôi, Đầu/Xỉu, Xỉu/Chủ, bao lô 2-3-4 số...) có luật cược và cách tính thưởng phức tạp hơn nhiều so với vé số truyền thống. Một đại lý xử lý hàng trăm vé mỗi ngày, mỗi vé có thể ứng với nhiều kiểu cược khác nhau, và việc đối soát thủ công bằng tay — dò từng số trong 18 giải của kết quả xổ số — vừa chậm vừa dễ sai sót khi tiền thưởng thực tế liên quan trực tiếp.</p>

<h2>Kiến trúc</h2>
<ul>
  <li>Backend: Node.js (Express) + Sequelize/MySQL, xác thực JWT (access + refresh token), node-cron cho tác vụ định kỳ, cheerio + axios để lấy dữ liệu kết quả xổ số, exceljs để xuất báo cáo.</li>
  <li>Frontend: Vue 3 (Composition API) + Pinia + Vue Router, giao diện dạng back-office với khoảng 13 module quản trị riêng biệt (vé, cùi vé, đại lý, nhân viên, nhật ký hoạt động, khôi phục dữ liệu...).</li>
</ul>

<h2>Phần khó nhất: engine đối soát giải thưởng</h2>
<p>Kết quả xổ số miền Nam có cấu trúc 18 giải (Đặc biệt, Giải 1 đến Giải 8) với tổng cộng 28 số được quay. Mỗi kiểu cược (Đầu/Cuối, Đầu/Xỉu, Xỉu/Chủ, bao lô 16/17/18/7 lô...) lại chỉ đối chiếu với một tập con cụ thể của 28 số đó — sai một chỗ trong luật ánh xạ là tính sai tiền thưởng thật của khách hàng. Hệ thống mô phỏng đúng toàn bộ cấu trúc này, với công thức chung:</p>
<blockquote>Tiền thưởng = Giá vé × Hệ số × Số lần trúng × Số lượng cược</blockquote>
<p>Điểm mình thấy hay là <b>hệ số thưởng không hardcode trong code</b> mà lưu trong một bảng riêng của database — 2 số nhân 70 lần, 3 số nhân 500 lần, 4 số nhân 3.200 lần... Nghĩa là khi công ty xổ số thay đổi tỷ lệ thưởng, chỉ cần sửa dữ liệu chứ không cần deploy lại code.</p>

<h2>Tự động lấy kết quả đúng giờ</h2>
<p>Kết quả xổ số được công bố trong một khung giờ cố định buổi chiều tối. Một job node-cron được lên lịch chạy đúng thời điểm đó, sau đó <b>lặp lại việc lấy dữ liệu mỗi 15 giây</b> trong tối đa 35 phút — cho tới khi giải Đặc biệt xuất hiện thì dừng lại và tự động kích hoạt bước đối soát cho toàn bộ vé trong ngày. Vì cơ chế lặp có thể vô tình chạy trùng, cả bước lưu kết quả lẫn bước đối soát đều được thiết kế <b>idempotent</b> (bỏ qua nếu dữ liệu đã tồn tại) để không bao giờ tính thưởng nhân đôi cho cùng một vé.</p>

<h2>Xuất bảng kê Excel đúng mẫu giấy</h2>
<p>Đây là phần đòi hỏi độ tỉ mỉ cao nhất: file Excel xuất ra phải khớp gần như pixel-perfect với mẫu bảng kê giấy đại lý vẫn dùng — đúng cột theo từng mức giá vé (10k/20k/50k có bố cục cột khác nhau), công thức tổng tự tính trong ô, và tự động phân trang khi một loại cược vượt quá 17 dòng trên một trang in.</p>

<h2>Phân quyền chi tiết theo từng màn hình</h2>
<p>Ngoài 2 vai trò cơ bản (quản trị viên / nhân viên), hệ thống có thêm lớp phân quyền theo từng màn hình cụ thể cho từng tài khoản — một nhân viên có thể được cấp quyền vào module nhập vé nhưng không được vào module báo cáo doanh thu, tùy theo đại lý muốn cấu hình. Kèm theo đó là nhật ký đăng nhập (IP, thiết bị) và nhật ký thao tác trên từng vé (tạo/xoá/khôi phục) để truy vết khi cần.</p>

<h2>Khôi phục dữ liệu</h2>
<p>Vì sai sót khi nhập vé (hoặc xoá nhầm) ảnh hưởng trực tiếp đến tiền bạc thật, toàn bộ dữ liệu quan trọng (vé, cùi vé, đại lý) dùng cơ chế xoá mềm kèm giao diện khôi phục riêng, thay vì xoá vĩnh viễn ngay lập tức.</p>

<p>Đây là dạng dự án mình thích làm nhất — không phải vì kỹ thuật cầu kỳ, mà vì phải hiểu đúng một nghiệp vụ thật (luật chơi vé số tự chọn) rồi biến nó thành logic phần mềm chính xác tuyệt đối, vì mỗi con số sai đều là tiền thật của người dùng cuối.</p>
`,
}
