# CheeHouse Portfolio – Setup

## 1. Install dependencies
```bash
npm install
```

## 2. Add your images
Place your images in the `public/images/` folder:
- `public/images/avatar.jpg` — Your profile photo (the man in gray blazer photo)
- `public/images/cheehouse-logo.png` — CheeHouse logo

## 3. Start dev server
```bash
npm run dev
```

## 4. Build for production
```bash
npm run build
```

## 5. Backend (blog + admin API)
Express + Sequelize + SQLite, sống trong `server/`.

```bash
cd server
npm install
cp .env.example .env   # chỉnh JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD, CORS_ORIGIN
npm run dev             # dev, tự reload
npm start                # chạy thường (dùng khi không chạy qua Docker)
```

Dữ liệu (`server/data/portfolio.sqlite`) và ảnh upload (`server/uploads/`) được `.gitignore` — không bị mất khi pull code mới.

## 6. Deploy với Docker (khuyến nghị cho production)
Backend có sẵn `Dockerfile` (multi-stage, `node:20-bookworm-slim`) và `docker-compose.yml` ở thư mục gốc. Frontend vẫn build tĩnh bằng `npm run build` và để nginx serve trực tiếp từ `dist/` — không dockerize phần frontend.

```bash
# Lần đầu / mỗi lần deploy code mới
git pull origin main
docker compose up -d --build

# Kiểm tra
docker compose ps
docker compose logs -f backend
curl http://127.0.0.1:4180/api/health
```

Ghi chú:
- `docker-compose.yml` mount `server/data` và `server/uploads` ra host — dữ liệu SQLite/ảnh không mất khi rebuild container.
- Cổng `4180` chỉ bind ra `127.0.0.1` — nginx (chạy native trên cùng máy, xem repo `EmulatorWebApp/nginx.conf`) proxy `/api/` và `/uploads/` của `cheehouse.io.vn` vào đó, không cần đổi gì ở nginx khi chuyển từ PM2 sang Docker.
- Cần cài Docker Desktop (bật WSL2 backend) trên VPS Windows trước khi chạy `docker compose`.
- Nếu trước đó backend chạy bằng PM2, nhớ `pm2 stop` + `pm2 delete` process cũ trước khi `docker compose up -d` để tránh xung đột cổng 4180.
