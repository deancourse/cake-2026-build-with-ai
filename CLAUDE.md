# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 關於此專案

AI 課程（[deanlin.net/course/cake](https://deanlin.net/course/cake)）範例專案，包含預設 Agent Skills 與一個以 OpenSpec 工作流程建立的車輛管理系統前端。

## 專案結構

```
/                               # 根目錄
├── vehicle-management-system/  # React 前端應用
└── openspec/                   # OpenSpec 規格管理
    ├── specs/                  # 主規格檔（已同步）
    └── changes/archive/        # 已歸檔的 change 記錄
```

## vehicle-management-system（前端）

**需要 Node.js 20+**，使用 nvm 切換：
```bash
nvm use 20
```

```bash
cd vehicle-management-system
npm run dev      # 開發伺服器 http://localhost:5173
npm run build    # 生產構建
npm run lint     # ESLint 檢查
npm run preview  # 預覽生產構建
```

### 架構

- **React 19 + Vite 8**，Tailwind CSS 3，React Router v7，Recharts
- **Mock API**：所有資料存於 `src/api/mock/` 的 in-memory 變數，重整後重置，無後端依賴
- **Auth 流程**：`AuthContext`（`src/contexts/`）持有登入狀態，透過 `ProtectedRoute` / `AdminRoute`（`src/routes/`）保護路由

| 路由 | 元件 | 存取限制 |
|------|------|----------|
| `/login` | `pages/Login` | 公開 |
| `/dashboard` | `pages/Dashboard` | 登入 |
| `/vehicles` | `pages/Vehicles` | 登入 |
| `/employees` | `pages/Employees` | admin 限定 |

**預設帳號**：`admin / admin123`（管理者）、`user / user123`（一般使用者）

## OpenSpec 工作流程

此專案使用 OpenSpec CLI 管理功能開發流程，採用 **spec-driven** schema（proposal → design → specs → tasks）。

```bash
openspec new change "<name>"          # 建立新 change
openspec status --change "<name>"     # 查看進度
openspec instructions <artifact> --change "<name>"  # 取得下一步指引
```

主規格位於 `openspec/specs/<capability>/spec.md`，目前已有 5 個 capabilities：`user-auth`、`dashboard`、`vehicle-management`、`employee-management`、`mock-api`。

## 內建 Skills（`.claude/skills/`）

使用 `/` 呼叫：

| Skill | 用途 |
|-------|------|
| `openspec-new-change` | 建立新的 OpenSpec change |
| `openspec-apply-change` | 實作 tasks |
| `openspec-archive-change` | 歸檔完成的 change |
| `git-smart-commit` | 自動拆分 conventional commits |
| `git-pr-description` | 產生 PR 描述 |
| `gen-test-cases` | 產生測試案例 |
| `ui-ux-pro-max` | UI/UX 設計建議 |
