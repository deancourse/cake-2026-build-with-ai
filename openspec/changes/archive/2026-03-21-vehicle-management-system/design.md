## Context

全新前端車輛管理系統，無既有程式碼。目標是快速建立 MVP 原型，使用 MSW 模擬後端 API，驗證業務流程與 UI 設計。

## Goals / Non-Goals

**Goals:**
- 建立可運作的前端原型，含登入、儀表板、車輛管理、員工管理四個頁面
- 使用 MSW mock 所有 API，讓前端可獨立開發與展示
- 實現角色權限控制（admin/user）

**Non-Goals:**
- 不實作真實後端或資料庫
- 不處理 token refresh、OAuth 等進階認證機制
- 不做國際化（i18n）
- 不做 RWD 行動裝置適配（桌面優先即可）
- 不寫單元測試或 E2E 測試

## Decisions

### 1. UI 框架：Tailwind CSS v4
- **選擇理由**：輕量、彈性高、不需引入整套元件庫，MVP 階段快速開發
- **替代方案**：Ant Design（過重、學習成本較高）、shadcn/ui（需額外設定）

### 2. 路由：React Router v7
- **選擇理由**：React 生態系標準路由方案，穩定且文件齊全
- **路由結構**：
  - `/login` — 登入頁
  - `/` — 儀表板（需登入）
  - `/vehicles` — 車輛管理（需登入）
  - `/employees` — 員工管理（需登入 + admin）

### 3. 狀態管理：React Context API
- **選擇理由**：MVP 規模小，Context 足夠處理 auth 狀態與使用者資訊
- **替代方案**：Zustand（功能強但 MVP 不需要）

### 4. Mock API：MSW v2
- **選擇理由**：攔截 fetch 請求，模擬真實 API 行為，未來可無縫切換至真實後端
- **Mock 端點**：
  - `POST /api/auth/login` — 登入驗證
  - `GET/POST/PUT/DELETE /api/vehicles` — 車輛 CRUD
  - `GET/POST/PUT/DELETE /api/employees` — 員工 CRUD
  - `GET /api/dashboard/stats` — 儀表板統計數據

### 5. 圖表：Recharts
- **選擇理由**：React 原生、輕量、API 簡單，適合 MVP 的圖表需求

### 6. 認證方式：簡易 token 模擬
- 登入成功後將 user 資訊（含 role）存入 Context + localStorage
- 路由層透過 ProtectedRoute 元件檢查登入狀態與角色權限
- 不實作 JWT 解析，僅用 mock token 字串

## Risks / Trade-offs

- **[Mock 資料與真實 API 不一致]** → MSW handler 設計盡量貼近 RESTful 規範，未來切換成本低
- **[localStorage 存 auth 不安全]** → MVP 階段可接受，上線前需改為 httpOnly cookie
- **[無後端驗證]** → 前端權限僅為 UI 層控制，不具安全性，僅用於原型展示
