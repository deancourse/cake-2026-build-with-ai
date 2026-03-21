## Why

管理者需要追蹤系統中使用者的操作行為，以利稽核與安全管理。目前系統無任何操作紀錄功能，管理者無法得知誰在何時做了什麼操作。

## What Changes

- 新增操作紀錄頁面（/activity-log），以表格呈現所有使用者操作紀錄
- 支援依操作類型（登入、車輛操作、員工操作）與使用者進行篩選
- 僅 admin 角色可存取此頁面
- 側邊導覽列新增「操作紀錄」連結（僅 admin 可見）
- 新增 MSW mock handler 產生假操作紀錄資料

## Capabilities

### New Capabilities
- `activity-log`: 使用者操作紀錄頁面，記錄並呈現系統操作行為（僅限 admin 檢視）

### Modified Capabilities
- `user-auth`: 側邊導覽列新增「操作紀錄」連結，需根據 admin 角色條件顯示

## Impact

- 新增頁面元件：ActivityLogPage
- 修改 Layout.tsx：側邊欄新增導覽連結
- 修改 App.tsx：新增 /activity-log 路由（AdminRoute 保護）
- 新增 MSW handler：GET /api/activity-logs（含篩選參數）
- 新增 mock data：操作紀錄假資料
