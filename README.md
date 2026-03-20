# 車輛管理系統 — Build with AI 課程範例專案

這是 CAKE 2026 AI 課程的範例專案，以一個**車輛管理系統**為情境，供學員練習如何與 AI 協作開發。

課程講義：[deanlin.net/course/cake](https://deanlin.net/course/cake)

## 專案簡介

車輛管理系統提供以下功能：

- **登入系統** — 支援 admin / user 兩種角色
- **儀表板 (Dashboard)** — 車輛統計總覽與圖表
- **車輛管理** — 車輛的 CRUD 操作
- **員工管理** — 僅限 admin 角色存取

> 本專案無真實後端，所有 API 呼叫皆透過 **MSW (Mock Service Worker)** 攔截模擬。

## 技術棧

| 類別 | 技術 |
|------|------|
| 前端框架 | React 19 + TypeScript |
| 建置工具 | Vite 8 |
| 路由 | React Router v7 |
| 圖表 | Recharts |
| API Mock | MSW (Mock Service Worker) |
| Lint | ESLint |

## 快速啟動

```bash
cd vehicle-management
npm install
npm run dev
```

開發伺服器啟動後，開啟瀏覽器即可使用。

### 其他指令

```bash
npm run build      # 型別檢查 + 正式建置
npm run lint       # 程式碼檢查
npm run preview    # 預覽正式建置結果
```

## Agent Skills

專案內建的 Skills 以 **Claude Code** 為預設環境，放置於 `.claude/skills/` 目錄下。每個 Skill 都是一份提示詞腳本，用來擴充 AI Agent 的特定能力。

| Skill | 說明 |
|-------|------|
| `git-smart-commit` | 將雜亂的 git 變更依功能邏輯自動拆分成多個有意義的 conventional commit |
| `git-pr-description` | 根據 branch 差異自動產生 Pull Request 的 Title 與 Description |
| `gen-test-cases` | 根據選取的程式碼或功能範圍，自動產生測試案例與對應測試程式 |
| `ui-ux-pro-max` | UI/UX 設計智能，涵蓋多種風格、配色、字體與框架建議 |

如果你使用其他 AI Agent（如 GitHub Copilot、Cursor、Gemini 等），可以參考這些 Skills 的結構與邏輯，改寫成符合你的工具的格式。

## 自訂 Skills

每個 Skill 的核心是 `SKILL.md`，描述該 Skill 的運作流程與規則。你可以：

- 直接修改現有 Skill 的行為
- 新增自己的 Skill 目錄與 `SKILL.md`
- 將 Skill 邏輯移植到其他 AI Agent 平台
