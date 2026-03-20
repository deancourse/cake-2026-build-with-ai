## 1. 專案初始化

- [x] 1.1 使用 Vite 建立 React 專案（含 TypeScript）
- [x] 1.2 安裝依賴：react-router-dom、msw、recharts
- [x] 1.3 建立專案目錄結構（pages、components、mocks、contexts）

## 2. MSW Mock API 設定

- [x] 2.1 設定 MSW Service Worker 與 browser integration
- [x] 2.2 建立 mock 資料（users、vehicles、employees、dashboard stats）
- [x] 2.3 實作所有 API handlers（login、vehicles CRUD、employees CRUD、dashboard stats）

## 3. 登入與權限

- [x] 3.1 建立 AuthContext 管理登入狀態與角色
- [x] 3.2 建立登入頁面（表單、驗證、錯誤提示）
- [x] 3.3 建立 ProtectedRoute 元件（未登入導向登入頁）
- [x] 3.4 建立 AdminRoute 元件（非管理者導向首頁）

## 4. 共用元件與佈局

- [x] 4.1 建立 Layout 元件（含側邊選單、頂部導覽列、登出按鈕）
- [x] 4.2 建立路由設定（React Router）

## 5. 儀表板頁面

- [x] 5.1 建立 Dashboard 頁面，串接 GET /api/dashboard/stats
- [x] 5.2 實作統計數據卡片元件（車輛總數、使用中、維修中、員工總數）
- [x] 5.3 實作圖表元件（使用 recharts 顯示車輛狀態分布）

## 6. 車輛管理頁面

- [x] 6.1 建立車輛列表頁面，串接 GET /api/vehicles
- [x] 6.2 實作新增車輛表單與 POST /api/vehicles
- [x] 6.3 實作編輯車輛表單與 PUT /api/vehicles/:id
- [x] 6.4 實作刪除車輛確認與 DELETE /api/vehicles/:id

## 7. 員工管理頁面

- [x] 7.1 建立員工列表頁面，串接 GET /api/employees（僅管理者可存取）
- [x] 7.2 實作新增員工表單與 POST /api/employees
- [x] 7.3 實作編輯員工表單與 PUT /api/employees/:id
- [x] 7.4 實作刪除員工確認與 DELETE /api/employees/:id
