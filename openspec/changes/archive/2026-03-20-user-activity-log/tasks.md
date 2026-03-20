## 1. Mock 資料與 API

- [x] 1.1 在 `src/mocks/data.ts` 新增 ActivityLog 型別定義與 seed data（約 30 筆）
- [x] 1.2 在 `src/mocks/handlers.ts` 新增 `GET /api/activity-logs` handler，支援 `action` 與 `userId` query params 篩選

## 2. 活動紀錄頁面

- [x] 2.1 新增 `src/pages/ActivityLog.tsx`，包含表格顯示與篩選列（操作類型下拉、使用者下拉）
- [x] 2.2 實作空狀態顯示（無紀錄時顯示提示訊息）

## 3. 路由與導覽

- [x] 3.1 在路由設定中新增 `/activity-log` 路由，以 `AdminRoute` 包裹
- [x] 3.2 在側邊導覽列為 admin 角色新增「活動紀錄」連結

## 4. 驗證

- [x] 4.1 確認 `npm run build` 通過，無型別錯誤
- [x] 4.2 確認 `npm run lint` 通過（既有 lint 錯誤非本次變更引入）
