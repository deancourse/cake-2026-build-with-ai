## Context

車輛管理系統目前無任何使用者行為追蹤機制。系統使用 MSW mock API，無真實後端，因此活動紀錄將以 mock 資料呈現。現有頁面結構已有 admin-only 路由模式（如員工管理），可直接沿用。

## Goals / Non-Goals

**Goals:**
- 提供管理員可瀏覽的活動紀錄頁面
- 支援依操作類型與使用者篩選
- 遵循現有架構模式（MSW mock、AdminRoute、Context auth）

**Non-Goals:**
- 不實作真實的事件收集機制（僅提供 mock 資料）
- 不做分頁以外的進階查詢（如日期範圍搜尋）
- 不實作紀錄匯出

## Decisions

### 1. 活動紀錄資料模型

採用扁平結構，每筆紀錄包含：
- `id`: string
- `userId`: string
- `username`: string
- `action`: enum (`LOGIN` | `LOGOUT` | `VEHICLE_CREATE` | `VEHICLE_UPDATE` | `VEHICLE_DELETE` | `EMPLOYEE_CREATE` | `EMPLOYEE_UPDATE` | `EMPLOYEE_DELETE`)
- `target`: string（操作對象描述，如車牌號碼或員工姓名）
- `timestamp`: ISO 8601 string

**理由**：扁平結構簡單且足以滿足顯示需求，無需關聯查詢。

### 2. Mock API 設計

新增 `GET /api/activity-logs` 端點，支援 query params：
- `action`：篩選操作類型
- `userId`：篩選特定使用者

在 `src/mocks/data.ts` 新增 seed data，`src/mocks/handlers.ts` 新增 handler。

**理由**：沿用現有 MSW 模式，與其他 API 一致。

### 3. 頁面元件結構

新增 `src/pages/ActivityLog.tsx` 作為主頁面元件，內含篩選列與紀錄表格。不額外拆分子元件，保持簡單。

**理由**：功能單純，單一元件即可維護。若未來複雜度增加再拆分。

### 4. 路由與導覽

路由 `/activity-log` 以 `AdminRoute` 包裹。側邊欄對 admin 角色顯示「活動紀錄」連結。

**理由**：沿用員工管理頁面的權限控制模式。

## Risks / Trade-offs

- **Mock 資料為靜態** → 使用者操作不會真正產生新紀錄。可接受，因整個系統皆為 mock。
- **無分頁機制** → 若 mock 資料量大可能影響渲染效能。Mitigation：控制 seed data 在合理數量（~30 筆）。
