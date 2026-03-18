# Build with AI — 課程範例專案

這是一個 AI 課程的範例專案，提供預設的 **Agent Skills** 供學員練習如何與 AI 協作開發。

課程講義：[deanlin.net/course/cake](https://deanlin.net/course/cake)

---

## 車輛管理系統

本專案以 OpenSpec 工作流程規劃並實作，為一套企業內部車輛與員工管理前端應用。

### 功能
- 登入頁面（帳號密碼驗證，區分管理者與一般使用者）
- 首頁儀表板（KPI 數據卡片 + 圓餅圖 / 長條圖）
- 車輛管理（檢視、新增、編輯、刪除）
- 員工管理（僅管理者可存取）

### 啟動方式

需要 Node.js 20+。

```bash
cd vehicle-management-system
npm install
npm run dev
```

開啟瀏覽器訪問 [http://localhost:5173](http://localhost:5173)

**預設帳號**

| 帳號 | 密碼 | 角色 |
|------|------|------|
| `admin` | `admin123` | 管理者（完整存取） |
| `user` | `user123` | 一般使用者 |

---

## 關於 Agent Skills

專案內建的 Skills 以 **Claude Code** 為預設環境，放置於 `.claude/skills/` 目錄下。

每個 Skill 都是一份提示詞腳本，用來擴充 AI Agent 的特定能力。

| Skill | 說明 |
|-------|------|
| `git-smart-commit` | 將雜亂的 git 變更依功能邏輯自動拆分成多個有意義的 conventional commit |
| `git-pr-description` | 根據 branch 差異自動產生 Pull Request 的 Title 與 Description |
| `gen-test-cases` | 根據選取的程式碼或功能範圍，自動產生測試案例與對應測試程式 |
| `ui-ux-pro-max` | UI/UX 設計智能，涵蓋多種風格、配色、字體與框架建議 |

### 快速開始

1. 安裝 [Claude Code](https://claude.ai/code)
2. 在專案目錄下啟動 Claude Code
3. 輸入 `/` 即可看到可用的 Skills 清單

### 自訂 Skills

每個 Skill 的核心是 `SKILL.md`，描述該 Skill 的運作流程與規則。你可以直接修改現有 Skill 的行為、新增自己的 Skill 目錄，或將邏輯移植到其他 AI Agent 平台（GitHub Copilot、Cursor 等）。
