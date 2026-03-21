## 1. 專案初始化

- [x] 1.1 使用 Vite 8 建立 React + TypeScript 專案
- [x] 1.2 安裝依賴：react-router, msw, recharts, tailwindcss v4
- [x] 1.3 設定 Tailwind CSS v4 與基本樣式

## 2. MSW Mock API 設定

- [x] 2.1 建立 MSW browser worker 設定與啟動邏輯
- [x] 2.2 建立 mock data（車輛、員工、使用者帳號）
- [x] 2.3 實作 POST /api/auth/login handler
- [x] 2.4 實作 GET/POST/PUT/DELETE /api/vehicles handlers
- [x] 2.5 實作 GET/POST/PUT/DELETE /api/employees handlers
- [x] 2.6 實作 GET /api/dashboard/stats handler

## 3. 認證與路由

- [x] 3.1 建立 AuthContext（登入狀態、角色、login/logout 方法）
- [x] 3.2 建立 ProtectedRoute 元件（檢查登入狀態）
- [x] 3.3 建立 AdminRoute 元件（檢查 admin 角色）
- [x] 3.4 設定 React Router 路由結構（/login, /, /vehicles, /employees）
- [x] 3.5 建立共用 Layout 元件（側邊導覽列 + 上方標題列 + 登出按鈕）

## 4. 登入頁面

- [x] 4.1 建立登入表單 UI（帳號、密碼欄位、登入按鈕）
- [x] 4.2 串接 /api/auth/login API，處理成功與失敗流程

## 5. 儀表板頁面

- [x] 5.1 建立數據卡片元件（車輛總數、使用中、閒置、員工總數）
- [x] 5.2 建立車輛狀態圓餅圖（Recharts PieChart）
- [x] 5.3 建立近 6 個月使用趨勢折線圖（Recharts LineChart）
- [x] 5.4 串接 /api/dashboard/stats API

## 6. 車輛管理頁面

- [x] 6.1 建立車輛列表表格 UI
- [x] 6.2 實作新增車輛功能（Modal 表單 + API 串接）
- [x] 6.3 實作編輯車輛功能（Modal 表單 + API 串接）
- [x] 6.4 實作刪除車輛功能（確認對話框 + API 串接）

## 7. 員工管理頁面

- [x] 7.1 建立員工列表表格 UI
- [x] 7.2 實作新增員工功能（Modal 表單 + API 串接）
- [x] 7.3 實作編輯員工功能（Modal 表單 + API 串接）
- [x] 7.4 實作刪除員工功能（確認對話框 + API 串接）
- [x] 7.5 確認導覽列根據角色隱藏員工管理連結
