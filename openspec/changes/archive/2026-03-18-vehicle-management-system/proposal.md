## Why

企業需要一套集中化的車輛與員工管理工具，目前缺乏統一介面來追蹤車輛狀態與員工資料，導致管理效率低落。以最小可行性方案建立前端系統，快速驗證核心流程。

## What Changes

- 新增登入頁面，支援帳號密碼驗證，區分管理者（admin）與一般使用者（user）角色
- 新增首頁儀表板，顯示關鍵數據卡片（車輛總數、在用車輛、員工總數）及資料圖表
- 新增車輛管理頁，支援車輛資料的檢視、新增、編輯、刪除（所有登入使用者可存取）
- 新增員工管理頁，支援員工資料的檢視、新增、編輯、刪除（**僅管理者可存取**）
- 建立 Mock API 層，模擬後端 REST 回應，支援 CRUD 操作與角色驗證

## Capabilities

### New Capabilities

- `user-auth`: 登入/登出流程、帳號密碼驗證、角色（admin/user）管理、路由保護
- `dashboard`: 首頁儀表板，KPI 數據卡片與車輛/員工統計圖表
- `vehicle-management`: 車輛資料 CRUD，含列表、新增表單、編輯表單、刪除確認
- `employee-management`: 員工資料 CRUD，僅 admin 角色可存取，含相同 CRUD 操作
- `mock-api`: Mock API 服務層，模擬後端回應，包含假資料、延遲模擬、錯誤處理

### Modified Capabilities

（無既有 capability 需修改）

## Impact

- **前端技術**: React + Vite，新建專案
- **狀態管理**: React Context（auth state），局部 useState（表單/列表）
- **路由**: React Router v6，含 protected routes
- **圖表**: Recharts 或 Chart.js（擇一）
- **Mock API**: msw（Mock Service Worker）或自製 mock module
- **無後端依賴**: 所有資料以 mock 處理，不需真實 API
