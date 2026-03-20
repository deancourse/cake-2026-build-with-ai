## Why

目前系統缺乏使用者操作紀錄功能，管理員無法追蹤使用者在系統中的行為（如登入、車輛新增/編輯/刪除等）。新增活動紀錄頁面讓管理員能掌握系統使用狀況，有助於安全稽核與問題排查。

## What Changes

- 新增使用者活動紀錄（Activity Log）頁面，僅限 admin 角色存取
- 記錄系統中的關鍵操作事件（登入、登出、車輛 CRUD、員工管理操作）
- 提供依時間排序的紀錄列表，支援基本篩選功能（依操作類型、使用者）
- 新增對應的 mock API 端點與假資料

## Non-goals

- 不實作真實的後端日誌儲存機制
- 不提供紀錄匯出功能
- 不實作即時推播通知

## Capabilities

### New Capabilities
- `activity-log`: 使用者活動紀錄頁面，包含紀錄列表顯示、篩選功能及對應的 mock API

### Modified Capabilities
<!-- 無需修改現有 spec 的需求層級行為 -->

## Impact

- 新增路由 `/activity-log`，需於 React Router 設定中加入並以 `AdminRoute` 保護
- 新增 MSW handler (`/api/activity-logs`) 及 mock 資料
- 側邊導覽列需新增活動紀錄入口
