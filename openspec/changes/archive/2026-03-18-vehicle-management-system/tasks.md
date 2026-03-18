## 1. 專案初始化

- [x] 1.1 執行 `npm create vite@latest` 建立 React 專案
- [x] 1.2 安裝依賴：`react-router-dom`, `recharts`, `tailwindcss`, `postcss`, `autoprefixer`
- [x] 1.3 設定 Tailwind CSS（`tailwind.config.js`, `postcss.config.js`, 更新 `index.css`）
- [x] 1.4 清理 Vite 預設模板（移除不需要的檔案與樣式）

## 2. Mock API 層

- [x] 2.1 建立 `src/api/mock/delay.js`，實作 300-500ms 隨機延遲 helper
- [x] 2.2 建立 `src/api/mock/auth.js`，實作 `login()` 函式（admin/user 兩組帳號）
- [x] 2.3 建立 `src/api/mock/vehicles.js`，含 5 筆預設資料與 `getVehicles`, `createVehicle`, `updateVehicle`, `deleteVehicle`
- [x] 2.4 建立 `src/api/mock/employees.js`，含 5 筆預設資料與 `getEmployees`, `createEmployee`, `updateEmployee`, `deleteEmployee`
- [x] 2.5 建立 `src/api/mock/dashboard.js`，實作 `getDashboardStats()` 回傳統計數據與圖表資料

## 3. Auth 與路由基礎

- [x] 3.1 建立 `src/contexts/AuthContext.jsx`，管理 `user`, `login`, `logout` 狀態
- [x] 3.2 在 `App.jsx` 包覆 `AuthProvider`
- [x] 3.3 建立 `src/routes/ProtectedRoute.jsx`，未登入導向 `/login`
- [x] 3.4 建立 `src/routes/AdminRoute.jsx`，非 admin 角色導向 `/dashboard`
- [x] 3.5 在 `App.jsx` 設定路由結構：`/login`, `/dashboard`, `/vehicles`, `/employees`

## 4. 共用元件

- [x] 4.1 建立 `src/components/Layout.jsx`，含側邊導覽列與頂部 header（顯示登入者名稱與登出按鈕）
- [x] 4.2 建立 `src/components/DataTable.jsx`，通用表格元件（接受 columns, data props）
- [x] 4.3 建立 `src/components/Modal.jsx`，通用 Modal 元件（含 overlay 與關閉功能）
- [x] 4.4 建立 `src/components/ConfirmDialog.jsx`，刪除確認對話框

## 5. 登入頁面

- [x] 5.1 建立 `src/pages/Login/index.jsx`，含帳號密碼表單
- [x] 5.2 實作表單送出呼叫 `login()` Mock API
- [x] 5.3 登入成功後導向 `/dashboard`，失敗顯示錯誤訊息
- [x] 5.4 已登入使用者訪問 `/login` 時自動導向 `/dashboard`

## 6. 儀表板頁面

- [x] 6.1 建立 `src/pages/Dashboard/index.jsx`
- [x] 6.2 呼叫 `getDashboardStats()` 並顯示 3 張 KPI 卡片（車輛總數、使用中車輛、員工總數）
- [x] 6.3 使用 Recharts 實作車輛狀態圓餅圖（PieChart）
- [x] 6.4 使用 Recharts 實作近 6 個月新增車輛長條圖（BarChart）

## 7. 車輛管理頁面

- [x] 7.1 建立 `src/pages/Vehicles/index.jsx`，顯示車輛列表（使用 DataTable）
- [x] 7.2 實作「新增車輛」按鈕，開啟 Modal 含新增表單（車牌、廠牌、型號、狀態、指派員工）
- [x] 7.3 實作表單驗證（必填欄位：車牌、廠牌、型號）
- [x] 7.4 實作送出呼叫 `createVehicle()`，成功後更新列表
- [x] 7.5 實作「編輯」按鈕，開啟 Modal 載入既有資料，送出呼叫 `updateVehicle()`
- [x] 7.6 實作「刪除」按鈕，顯示 ConfirmDialog，確認後呼叫 `deleteVehicle()`

## 8. 員工管理頁面

- [x] 8.1 建立 `src/pages/Employees/index.jsx`，顯示員工列表（使用 DataTable）
- [x] 8.2 實作「新增員工」按鈕，開啟 Modal 含新增表單（姓名、員工編號、部門、職稱、email）
- [x] 8.3 實作表單驗證（所有欄位必填）
- [x] 8.4 實作送出呼叫 `createEmployee()`，成功後更新列表
- [x] 8.5 實作「編輯」按鈕，開啟 Modal 載入既有資料，送出呼叫 `updateEmployee()`
- [x] 8.6 實作「刪除」按鈕，顯示 ConfirmDialog，確認後呼叫 `deleteEmployee()`

## 9. 整合驗收

- [x] 9.1 確認側邊導覽列對 `user` 角色隱藏「員工管理」連結
- [x] 9.2 確認 `user` 直接訪問 `/employees` 被導向 `/dashboard`
- [x] 9.3 確認登出後無法存取任何內頁
- [x] 9.4 確認所有 CRUD 操作後列表即時更新
- [x] 9.5 執行 `npm run build` 確認無編譯錯誤
