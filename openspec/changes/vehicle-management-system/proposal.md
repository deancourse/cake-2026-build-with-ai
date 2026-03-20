## Why

公司需要一套車輛管理系統來追蹤車輛資訊與員工指派狀況。目前缺乏統一管理介面，需建立 MVP 版本驗證核心流程。

## What Changes

- 新增登入頁面，支援帳號密碼驗證，區分管理者與一般使用者角色
- 新增首頁儀表板，顯示關鍵數據卡片與資料圖表
- 新增車輛管理頁，支援 CRUD 操作
- 新增員工管理頁，僅管理者可存取，支援 CRUD 操作
- 使用 MSW Mock API 模擬後端回應，無需實際後端

## Capabilities

### New Capabilities
- `user-auth`: 使用者登入驗證與角色權限控制（管理者 / 一般使用者）
- `dashboard`: 首頁儀表板，顯示車輛統計卡片與圖表
- `vehicle-management`: 車輛資料的檢視、新增、編輯、刪除
- `employee-management`: 員工資料的檢視、新增、編輯、刪除（僅管理者）

### Modified Capabilities
（無既有 capability 需修改）

## Impact

- 新建 React + Vite 前端專案
- 引入 MSW 作為 Mock API 層
- 引入路由與權限控制機制
- 無後端依賴，純前端 MVP
