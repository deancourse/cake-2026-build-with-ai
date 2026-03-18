## Context

車輛管理系統目前無任何操作紀錄機制。Mock API 採 in-memory 資料模式，所有資料於重整後重置。本 change 在現有架構下新增 activity log 功能，不引入新依賴。

## Goals / Non-Goals

**Goals:**
- 提供管理者查看使用者操作紀錄的頁面
- 支援依使用者、動作類型、日期區間篩選
- 記錄登入/登出與車輛、員工的 CRUD 操作

**Non-Goals:**
- 持久化儲存（重整後 log 重置，符合 mock-api 慣例）
- 即時推送或通知
- Log 匯出功能
- 細粒度的欄位變更追蹤（before/after diff）

## Decisions

**1. Log 寫入點：在各 mock API 函式內部呼叫 `logActivity()`**

每個 mock API 操作（vehicles、employees、auth）在執行後呼叫共用的 `logActivity()` 寫入 in-memory log 陣列。

理由：集中 log 邏輯於 mock 層，不汙染 React 元件，符合現有架構。

**2. ActivityLog 資料結構**

```js
{
  id: number,
  userId: number,
  username: string,
  action: string,       // 'login' | 'logout' | 'create_vehicle' | 'update_vehicle' | 'delete_vehicle' | 'create_employee' | 'update_employee' | 'delete_employee'
  target: string,       // 操作對象描述，如車牌號碼或員工姓名
  timestamp: string,    // ISO 8601
}
```

**3. 頁面以 `AdminRoute` 保護**

沿用現有 `AdminRoute` HOC，與 `/employees` 相同模式，不另建保護機制。

**4. 篩選於前端執行**

資料量有限（mock），篩選邏輯直接在元件內用 `Array.filter()` 處理，不需後端查詢。

## Risks / Trade-offs

- **Log 於重整後消失** → 符合 mock-api 慣例，用戶已知此限制
- **Log 寫入時機依賴 mock API 被呼叫** → 若元件直接操作資料（繞過 mock API）則不會記錄，但現有程式碼全透過 mock API，風險低
