# Build with AI — 課程範例專案

這是一個 AI 課程的範例專案，提供預設的 **Agent Skills** 供學員練習如何與 AI 協作開發。

課程講義：[deanlin.net/course/cake](https://deanlin.net/course/cake)

## 專案簡介

本專案包含一個 **車輛管理系統（Vehicle Management System）**，採用以下技術：

- **前端框架**：React 19 + TypeScript 5.9（strict mode）
- **建置工具**：Vite 8
- **樣式**：Tailwind CSS 4
- **路由**：React Router 7
- **圖表**：Recharts
- **API 模擬**：MSW（Mock Service Worker）— 無需真實後端即可開發

系統功能包含登入驗證、角色權限控管（admin / user）、車輛管理、員工管理（僅限管理員）及儀表板。

## 快速開始

### 環境需求

- [Node.js](https://nodejs.org/) 18+
- npm 或其他套件管理工具

### 安裝與啟動

```bash
# 1. Clone 專案
git clone https://github.com/deancourse/cake-2026-build-with-ai.git
cd cake-2026-build-with-ai

# 2. 安裝依賴
cd vehicle-management-system
npm install

# 3. 啟動開發伺服器
npm run dev
```

### 其他指令

```bash
npm run build      # TypeScript 型別檢查 + 產出正式版
npm run lint       # ESLint 檢查
npm run preview    # 預覽正式版建置結果
```

## 關於 Agent Skills

專案內建的 Skills 以 **Claude Code** 為預設環境，放置於 `.claude/skills/` 目錄下。

每個 Skill 都是一份提示詞腳本，用來擴充 AI Agent 的特定能力。如果你使用其他 AI Agent（如 GitHub Copilot、Cursor、Gemini 等），可以參考這些 Skills 的結構與邏輯，改寫成符合你的工具的格式。

### 內建 Skills

| Skill | 說明 |
|-------|------|
| `git-smart-commit` | 將雜亂的 git 變更依功能邏輯自動拆分成多個有意義的 conventional commit |
| `git-pr-description` | 根據 branch 差異自動產生 Pull Request 的 Title 與 Description |
| `gen-test-cases` | 根據選取的程式碼或功能範圍，自動產生測試案例與對應測試程式 |
| `ui-ux-pro-max` | UI/UX 設計智能，涵蓋多種風格、配色、字體與框架建議 |

## 自訂 Skills

每個 Skill 的核心是 `SKILL.md`，描述該 Skill 的運作流程與規則。你可以：

- 直接修改現有 Skill 的行為
- 新增自己的 Skill 目錄與 `SKILL.md`
- 將 Skill 邏輯移植到其他 AI Agent 平台

## 專案結構

```
cake-2026-build-with-ai/
├── .claude/                  # Agent Skills 與 commands（納入版控）
├── openspec/                 # 規格驅動開發工作流（納入版控）
├── vehicle-management-system/  # 車輛管理系統主程式
│   ├── src/
│   │   ├── components/       # 共用元件（Layout, 路由守衛）
│   │   ├── contexts/         # React Context（AuthContext）
│   │   ├── mocks/            # MSW mock handlers 與假資料
│   │   └── pages/            # 頁面元件
│   ├── package.json
│   └── vite.config.ts
├── CLAUDE.md                 # Claude Code 專案指引
└── README.md
```
