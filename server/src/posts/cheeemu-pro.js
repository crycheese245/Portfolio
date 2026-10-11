export const cheeemuProPost = {
  title: 'CheeEmu Pro: mang CheeEmu lên Android — một mã nguồn, hai bản app và một host libretro tự viết',
  excerpt: 'Từ một nền tảng chơi game J2ME trên trình duyệt đến app Android chạy được cả GBA, PSP, PS1, PS2. Ghi chép về cách tách bản Lite cho Google Play và bản Pro phát hành APK, tự xây host libretro bằng C++, và giữ tài khoản, thành tựu đồng bộ với web.',
  coverImage: '/images/Blog_CheeEmuPro_Cover.jpg',
  contentHtml: `
<p><a href="/du-an/cheeemu">CheeEmu</a> bắt đầu là một website cho phép chơi lại game Java J2ME ngay trên trình duyệt. Nó chạy tốt trên máy tính, nhưng trên điện thoại — đúng nơi những game "cục gạch" này vốn thuộc về — trình duyệt lại là môi trường chật chội: hiệu năng thấp hơn, lưu game bấp bênh, và hoàn toàn không đủ sức cho các hệ máy nặng như PSP hay PlayStation. <b>CheeEmu Pro</b> là câu trả lời: một app Android gốc, viết bằng Kotlin và Jetpack Compose, dùng chung tài khoản và kho game với website.</p>

<h2>Một mã nguồn, hai bản app</h2>
<p>Ngay từ đầu đã có một ràng buộc: muốn lên Google Play thì app phải tuân thủ chính sách của Play, trong khi nhiều core giả lập mạnh nhất lại dùng giấy phép GPL, và vài tính năng (tải game trong nền bằng foreground service) đòi khai báo thêm với Google. Thay vì chọn một bên, dự án build ra <b>hai bản từ cùng một mã nguồn</b>:</p>
<ul>
  <li><b>CheeEmu Lite</b> — phát hành trên Google Play, chỉ chơi J2ME, mở game từ nút "Mở bằng app" trên web hoặc file <i>.jar</i> có sẵn trong máy.</li>
  <li><b>CheeEmu Pro</b> — file APK tải từ website, có kho game ngay trong app, tài khoản, bảng xếp hạng, thành tựu và toàn bộ các hệ máy khác.</li>
</ul>
<p>Hai bản dùng hai tên gói khác nhau nên cài song song được. Về kiến trúc, mỗi bản chỉ cung cấp hai thứ: <i>Edition</i> (khởi tạo lúc app chạy) và <i>EditionContent</i> (giao diện chính). <i>MainActivity</i> chỉ gọi hai thứ này, nên phần dùng chung không biết mình đang ở bản nào. Thư viện riêng của Pro — core libretro, thư viện tải ảnh, bộ icon — chỉ khai báo bằng <i>proImplementation</i>, nên bản Lite thực sự không chứa chúng trong APK chứ không chỉ "ẩn đi".</p>

<h2>Tự viết host libretro bằng C++</h2>
<p>Libretro là chuẩn giao tiếp chung giữa "core" giả lập (mGBA cho GBA, PPSSPP cho PSP...) và "frontend" hiển thị. Thay vì nhúng nguyên một frontend có sẵn, CheeEmu Pro tự viết một host gọn bằng C++:</p>
<ul>
  <li>Nạp core bằng <i>dlopen</i>, vẽ khung hình lên <i>Surface</i> của Android — riêng PSP vẽ bằng GPU qua OpenGL ES.</li>
  <li>Phát âm thanh qua <b>Oboe</b> để có độ trễ thấp, chạy vòng giả lập trên một luồng riêng.</li>
  <li>Tự lưu SRAM khi người chơi tạm dừng hoặc thoát, cộng thêm 4 slot lưu nhanh, nhập cheat, và bộ nút ảo kéo thả, đổi cỡ được — lưu riêng theo kiểu tay cầm và hướng màn hình.</li>
</ul>
<p>Để APK không phình to, chỉ core mGBA được đóng gói sẵn. Các core nặng — MAME cho Arcade, PPSSPP cho PSP, PCSX ReARMed cho PS1, ARMSX2 cho PS2 — được <b>tải về khi cần</b> theo danh sách core trên máy chủ, kèm BIOS cần thiết. Người dùng xem, tải, xoá core ngay trong app. Một quyết định có chủ đích: không dùng FBNeo dù đây là core Arcade phổ biến, vì giấy phép của nó cấm dùng thương mại và cấm dự án sử dụng nhận donate.</p>

<h2>Đồng bộ với website: cùng một người chơi, hai nơi chơi</h2>
<p>Điều khiến app không chỉ là "một trình giả lập nữa" là nó dùng chung backend với web:</p>
<ul>
  <li><b>Mở game từ web sang app.</b> Website xin backend một token tạm, hết hạn sau 10 phút, rồi mở app qua <i>intent://</i>. App dùng token đó lấy thông tin và tải game — chỉ tải lại khi file trên máy chủ thay đổi — cài vào bộ nhớ riêng rồi mở luôn. Bản Pro tự xin token kèm phiên đăng nhập, để game VIP được kiểm tra đúng quyền.</li>
  <li><b>Thời gian chơi và thành tựu.</b> Khi màn hình game đang hiện, app gửi heartbeat mỗi 30 giây; backend cộng thời gian chơi, EXP và xét thành tựu y như khi chơi trên trình duyệt. Danh sách thành tựu được định nghĩa ở đúng một chỗ, dùng chung cho cả web và app.</li>
  <li><b>Đếm online.</b> App cũng gửi heartbeat có mặt, nên người dùng app hiện trong ô "Đang online" ở chân trang website.</li>
  <li><b>Bảo mật token.</b> Token đăng nhập được mã hoá AES-GCM bằng khoá nằm trong Android Keystore, không lưu dạng chữ thường trong bộ nhớ app.</li>
</ul>

<h2>Phát hành ngoài Google Play: tự lo cập nhật</h2>
<p>Bản Pro không qua cửa hàng nào, nên app phải tự biết khi nào cần cập nhật. Khi mở app, nó hỏi backend phiên bản APK mới nhất — backend đọc thẳng <i>versionCode</i> từ file APK trên máy chủ, không cần ai nhập tay. Có bản mới thì app mời tải qua trình duyệt.</p>
<p>Với thay đổi bắt buộc, app gửi User-Agent kèm phiên bản; nếu bản đang cài quá cũ, backend trả HTTP 426 cho kho game và đăng nhập, app hiện thông báo "Phiên bản app đã cũ" kèm nút cập nhật. Game đã tải về vẫn chơi được bình thường — chỉ chặn những gì phụ thuộc vào API mới.</p>

<h2>Những chi tiết trải nghiệm</h2>
<ul>
  <li><b>Tải nhiều game cùng lúc, kể cả khi rời app</b> — một trung tâm tải xuống chạy ở phạm vi cả app kết hợp foreground service, tiến trình hiện trên thanh thông báo, có lịch sử 100 lượt tải gần nhất.</li>
  <li><b>Thư viện trên máy</b> lọc theo hệ máy, sắp xếp theo chơi gần đây, tên hoặc hệ máy.</li>
  <li><b>Góp ý và báo lỗi</b> ngay trong app, đính kèm tối đa 5 ảnh (tự thu nhỏ trước khi gửi), app tự thêm phiên bản, đời Android và tên máy vào cuối nội dung — đỡ phải hỏi lại người dùng "bạn đang dùng máy gì?".</li>
  <li><b>Quảng cáo không làm phiền lúc chơi</b> — chỉ hiện banner ở danh sách game và quảng cáo toàn màn hình khi quay lại app sau ít nhất 1 phút chơi, cách nhau tối thiểu 3 phút; quảng cáo khi mở app và tự động giữa chừng đều bị tắt.</li>
</ul>

<p>Nhìn lại, phần khó nhất không phải là chạy được giả lập — các core libretro đã làm rất tốt việc đó — mà là làm cho app và website cảm giác như <b>một sản phẩm</b>: cùng tài khoản, cùng tiến trình, cùng thành tựu, dù người chơi bắt đầu ở đâu.</p>
<p>Tải CheeEmu Pro tại <a href="https://emu.cheehouse.io.vn/tai-app" target="_blank" rel="noopener">emu.cheehouse.io.vn/tai-app</a>, hoặc xem <a href="/du-an/cheeemu-pro">trang giới thiệu dự án CheeEmu Pro</a>.</p>
`,
}
