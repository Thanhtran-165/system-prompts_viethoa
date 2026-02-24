# AI Assistant Academy 🎓

Web học tập về AI Coding Assistants - System Prompts & Tools

## Cấu trúc

```
ai-assistant-academy/
├── data/                    # Dữ liệu JSON được generate
│   ├── index.json          # Index + Stats
│   ├── models.json         # Tất cả AI models
│   ├── functions.json      # Tất cả functions/tools
│   └── quizzes.json        # Tất cả quizzes
├── pages/
│   ├── index.js            # Trang chủ
│   ├── models/             # Học theo Model
│   │   ├── index.js        # Danh sách models
│   │   └── [id].js         # Chi tiết model + Quiz
│   ├── functions/          # Học theo Chức năng
│   │   ├── index.js        # Danh sách functions
│   │   └── [id].js         # Chi tiết function + Quiz
│   └── compare.js          # So sánh models
├── components/
│   └── Layout.js           # Layout chung
├── lib/
│   └── data.js             # Helper functions
└── scripts/
    └── convert-data.js     # Convert raw files → JSON
```

## Cài đặt

```bash
# 1. Cài đặt dependencies
cd ai-assistant-academy
npm install

# 2. Convert dữ liệu từ raw files
npm run convert

# 3. Chạy development server
npm run dev

# 4. Build static site
npm run build
```

## Tính năng

### 📚 Học theo Model
- Xem system prompt của từng AI assistant
- Xem danh sách tools với mô tả tiếng Việt
- Quiz cho từng model

### 🔧 Học theo Chức năng
- Xem cách các AI implement cùng 1 chức năng
- So sánh parameters giữa các models
- Quiz theo chức năng

### ⚖️ So sánh
- So sánh 2-3 models side-by-side
- So sánh prompts hoặc tools

### 🇻🇳 Song ngữ
- Toggle VI/EN cho prompts và tools

## Tech Stack

- **Next.js 14** - Static site generation
- **Tailwind CSS** - Styling
- **Static Export** - Không cần server

## Deploy

```bash
npm run build
# Upload folder `out/` lên Vercel, GitHub Pages, hoặc bất kỳ static hosting
```
