## Context

在既有車輛管理系統（React + Vite 8 + Tailwind CSS v4 + MSW v2）基礎上新增操作紀錄功能。系統已有 AuthContext、AdminRoute、Layout 側邊欄等基礎設施，新增功能可直接復用。

## Goals / Non-Goals

**Goals:**
- 提供管理者檢視所有使用者操作紀錄的頁面
- 支援依操作類型與使用者篩選紀錄
- 延續現有設計系統風格（Inter、Analytics Dashboard 配色、漸層按鈕）

**Non-Goals:**
- 不實作真實的操作紀錄寫入（僅 mock 靜態資料）
- 不做分頁功能（MVP 階段資料量小）
- 不做紀錄匯出功能

## Decisions

### 1. 資料結構：ActivityLog
```typescript
interface ActivityLog {
  id: string
  timestamp: string      // ISO 日期字串
  user: string           // 操作者名稱
  action: string         // 操作類型：login | create | update | delete
  target: string         // 操作對象類型：auth | vehicle | employee
  description: string    // 操作描述
}
```
- **選擇理由**：扁平結構，簡單直觀，適合表格呈現

### 2. API 設計：GET /api/activity-logs
- 查詢參數：`?action=login&user=王小明`
- 回傳按時間降序排列的紀錄陣列
- **選擇理由**：RESTful 風格，與現有 API 一致

### 3. 篩選 UI：下拉選單
- 操作類型篩選：全部 / 登入 / 新增 / 編輯 / 刪除
- 使用者篩選：全部 / 各使用者名稱
- **選擇理由**：簡潔明瞭，不需搜尋框

### 4. 呈現方式：表格
- 欄位：時間、使用者、操作類型、對象、描述
- 操作類型以彩色 badge 標示
- **替代方案**：時間軸（較佔空間，MVP 不採用）

## Risks / Trade-offs

- **[Mock 資料為靜態]** → 不影響 UI 驗證，未來接真實 API 只需替換 handler
- **[無分頁]** → MVP 資料量小可接受，超過 50 筆時應加入分頁
