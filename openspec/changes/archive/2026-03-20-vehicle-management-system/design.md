## Context

建立車輛管理系統 MVP，純前端方案，使用 MSW Mock API 模擬後端。目標是快速驗證核心流程與 UI。

## Goals / Non-Goals

**Goals:**
- 提供登入驗證與角色權限（管理者 / 一般使用者）
- 提供儀表板呈現車輛統計數據
- 提供車輛與員工的 CRUD 管理介面
- 使用 MSW 模擬所有 API，可獨立運行

**Non-Goals:**
- 不實作真實後端或資料庫
- 不處理密碼加密、JWT refresh token 等進階安全機制
- 不支援多語系、RWD 行動裝置優化
- 不實作檔案上傳（車輛照片等）

## Decisions

### 技術選型
- **React + Vite**：使用者指定，快速開發與 HMR 支援
- **React Router v7**：處理頁面路由與權限守衛
- **MSW (Mock Service Worker)**：攔截 API 請求，模擬後端回應，開發與展示皆可獨立運行
- **狀態管理**：使用 React Context 管理登入狀態與使用者角色，MVP 規模不需引入 Redux
- **UI 元件**：使用原生 CSS Module 或輕量 CSS 方案，避免引入大型 UI 框架

### 權限控制
- 登入後將角色存於 Context，路由層以 ProtectedRoute 元件控制存取
- 管理者可存取所有頁面；一般使用者無法進入員工管理頁

### Mock API 設計
| 端點 | 方法 | 說明 |
|------|------|------|
| POST /api/login | POST | 登入驗證 |
| GET /api/vehicles | GET | 取得車輛列表 |
| POST /api/vehicles | POST | 新增車輛 |
| PUT /api/vehicles/:id | PUT | 編輯車輛 |
| DELETE /api/vehicles/:id | DELETE | 刪除車輛 |
| GET /api/employees | GET | 取得員工列表 |
| POST /api/employees | POST | 新增員工 |
| PUT /api/employees/:id | PUT | 編輯員工 |
| DELETE /api/employees/:id | DELETE | 刪除員工 |
| GET /api/dashboard/stats | GET | 取得儀表板統計資料 |

### 資料模型
- **Vehicle**: id, plateNumber, brand, model, year, status (active/maintenance/retired), assignedTo
- **Employee**: id, name, email, department, position, phone
- **User**: username, password, role (admin/user)

## Risks / Trade-offs

- **[Mock 資料不持久]** → 重新整理後資料重置，MVP 階段可接受
- **[無真實驗證]** → Mock 登入僅做字串比對，不代表真實安全性
- **[圖表資料為靜態]** → 儀表板圖表使用固定 mock 資料，非即時計算
