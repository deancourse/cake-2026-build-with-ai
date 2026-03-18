## 1. Mock API — Activity Log

- [x] 1.1 建立 `src/api/mock/activityLogs.js`，定義 in-memory log 陣列與初始假資料（至少 5 筆）
- [x] 1.2 實作 `logActivity({ userId, username, action, target })` 函式，自動產生 id 與 timestamp
- [x] 1.3 實作 `getActivityLogs(filters?)` 函式，支援依 username 與 action 篩選，依 timestamp 倒序回傳

## 2. Mock API — 寫入 Log

- [x] 2.1 修改 `src/api/mock/auth.js`：`login()` 成功後呼叫 `logActivity` 寫入 `action: 'login'`；新增 `logout(user)` 並寫入 `action: 'logout'`
- [x] 2.2 修改 `src/api/mock/vehicles.js`：`createVehicle`、`updateVehicle`、`deleteVehicle` 接受 `user` 參數，操作後寫入對應 log（target 為車牌號碼）
- [x] 2.3 修改 `src/api/mock/employees.js`：`createEmployee`、`updateEmployee`、`deleteEmployee` 接受 `user` 參數，操作後寫入對應 log（target 為員工姓名）

## 3. 路由設定

- [x] 3.1 在 `src/main.jsx`（或路由設定檔）新增 `/activity-logs` 路由，以 `AdminRoute` 包裝，對應 `ActivityLogs` 頁面元件

## 4. 頁面元件

- [x] 4.1 建立 `src/pages/ActivityLogs.jsx`，呼叫 `getActivityLogs()` 取得資料並顯示 loading 狀態
- [x] 4.2 實作紀錄表格，欄位：使用者名稱、動作類型、操作對象、時間戳記
- [x] 4.3 實作篩選列：使用者名稱下拉選單、動作類型下拉選單，選單選項從資料動態產生
- [x] 4.4 實作前端篩選邏輯（`Array.filter()`），篩選條件改變時重新過濾列表
- [x] 4.5 實作空狀態提示（無紀錄時顯示「尚無操作紀錄」）

## 5. 導覽列

- [x] 5.1 修改 `src/components/Layout.jsx`，在側邊導覽列新增「使用者紀錄」連結至 `/activity-logs`，僅 admin 角色可見

## 6. 整合驗收

- [x] 6.1 驗證：admin 登入後，側邊欄顯示「使用者紀錄」；user 登入後不顯示
- [x] 6.2 驗證：執行車輛／員工 CRUD 操作後，紀錄頁面出現對應 log 條目
- [x] 6.3 驗證：登入／登出動作被記錄（需重新登入後查看）
- [x] 6.4 驗證：篩選功能正確過濾列表；清除篩選後恢復全部紀錄
- [x] 6.5 驗證：user 角色直接訪問 `/activity-logs` 被導向 `/dashboard`
