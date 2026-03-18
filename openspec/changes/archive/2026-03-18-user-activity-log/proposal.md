## Why

目前系統缺乏操作稽核機制，管理者無法得知使用者何時登入、操作了哪些資源，不利於安全管控與問題追蹤。

## What Changes

- 新增「使用者紀錄」頁面（`/activity-logs`），僅限 admin 存取
- 側邊導覽列新增「使用者紀錄」連結（僅 admin 可見）
- Mock API 新增 activity log 資料與查詢函式
- 自動記錄以下使用者操作事件：
  - 登入 / 登出
  - 車輛新增、編輯、刪除
  - 員工新增、編輯、刪除

## Capabilities

### New Capabilities

- `user-activity-log`：使用者操作紀錄頁面，包含事件列表、篩選（依使用者、動作類型、日期區間）與分頁功能

### Modified Capabilities

- `mock-api`：新增 activity log in-memory 資料及相關查詢 API 函式
- `user-auth`：登入/登出動作需寫入 activity log

## Impact

- 新增路由 `/activity-logs`，以 `AdminRoute` 保護
- `src/api/mock/activityLogs.js` — 新增 mock 資料與查詢函式
- `src/pages/ActivityLogs.jsx` — 新增頁面元件
- `src/components/Layout.jsx` — 側邊導覽列新增連結（admin 限定）
- `src/api/mock/auth.js` — 登入/登出時寫入 log
- 各 mock API（vehicles、employees）— 新增/編輯/刪除操作時寫入 log
