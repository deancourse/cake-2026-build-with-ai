## Why

需要一套車輛管理系統 MVP，讓公司能集中管理車輛資訊與員工資料。目前無數位化管理工具，需快速建立前端原型驗證流程可行性。

## What Changes

- 新增登入頁面，支援帳號密碼驗證，區分 admin / user 兩種角色
- 新增首頁儀表板，顯示車輛總數、使用中車輛等關鍵數據卡片與圖表
- 新增車輛管理頁，支援 CRUD 操作（檢視、新增、編輯、刪除）
- 新增員工管理頁，僅 admin 角色可存取，支援 CRUD 操作
- 使用 MSW 模擬所有 API 回應，無需真實後端

## Capabilities

### New Capabilities
- `user-auth`: 使用者登入驗證與角色權限控制（admin/user）
- `dashboard`: 首頁儀表板，顯示關鍵數據卡片與資料圖表
- `vehicle-management`: 車輛資料 CRUD 管理頁面
- `employee-management`: 員工資料 CRUD 管理頁面（僅限 admin）

### Modified Capabilities

（無既有 capabilities，此為全新專案）

## Impact

- 新建 React + Vite 8 前端專案
- 依賴套件：React, React Router, MSW, 圖表庫（Recharts）, Tailwind CSS
- 所有 API 透過 MSW mock，不影響任何後端系統
- 純前端方案，可獨立部署為靜態網站
