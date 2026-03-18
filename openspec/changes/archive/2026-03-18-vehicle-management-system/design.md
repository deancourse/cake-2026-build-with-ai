## Context

全新前端專案，無既有程式碼需遷移。目標是以最小可行性方案快速建立可運行的車輛管理系統原型，所有資料透過 Mock API 模擬，無需真實後端。

技術限制：
- 純前端，不涉及後端服務或資料庫
- 使用者數量少（企業內部工具）
- 需支援角色權限（admin / user）

## Goals / Non-Goals

**Goals:**
- 建立可運行的 React + Vite 前端應用
- 實作登入、儀表板、車輛管理、員工管理四個頁面
- 角色權限控制（員工管理頁僅 admin 可存取）
- Mock API 模擬資料存取

**Non-Goals:**
- 真實後端 API 整合
- 資料持久化（重整後重置）
- 多語系、無障礙（a11y）優化
- 單元測試、E2E 測試
- 行動裝置響應式設計（desktop-first 即可）

## Decisions

### 1. 狀態管理：React Context + useState

**選擇**: 使用 React Context 管理 auth state，局部 useState 管理頁面資料。

**理由**: 規模小，不需引入 Redux / Zustand 等額外依賴。Context 足以處理跨元件的登入狀態共享。

**替代方案**: Zustand（更輕量但多一個依賴）、Redux（過重）。

---

### 2. 路由：React Router v6

**選擇**: React Router v6 搭配 `<Navigate>` 實作 Protected Route。

**理由**: 業界標準，API 穩定，v6 的 nested routes 適合此專案結構。

**Protected Route 策略**:
- 未登入 → 導向 `/login`
- 登入但角色為 user 存取 `/employees` → 導向 `/dashboard`（403 redirect）

---

### 3. Mock API：自製 mock module（非 MSW）

**選擇**: 建立 `src/api/mock/` 目錄，以 async function + setTimeout 模擬 API 延遲。

**理由**: MSW 需要 Service Worker 設定，增加複雜度。自製 mock module 更直覺，方便日後替換為真實 API endpoint。

**資料結構**: 儲存於 module 層級變數（in-memory），支援 CRUD 操作，重整後重置。

---

### 4. 圖表：Recharts

**選擇**: Recharts。

**理由**: React-native（不需 ref 操作）、API 簡潔、bundle size 合理。

**替代方案**: Chart.js（需 canvas ref，不夠 React-friendly）。

---

### 5. UI 元件：純 CSS + Tailwind CSS

**選擇**: Tailwind CSS v3。

**理由**: 快速開發，不需自訂 CSS 命名規範，與 Vite 整合簡單。不引入 MUI / Ant Design 等重型元件庫以保持輕量。

---

### 6. 專案結構

```
src/
├── api/
│   └── mock/          # mock 資料與 API 函式
├── components/        # 共用元件（Table, Modal, Card 等）
├── contexts/
│   └── AuthContext.jsx
├── pages/
│   ├── Login/
│   ├── Dashboard/
│   ├── Vehicles/
│   └── Employees/
├── routes/
│   └── ProtectedRoute.jsx
└── App.jsx
```

## Risks / Trade-offs

- **資料不持久化** → 接受，MVP 範疇內；若需持久化可改用 localStorage
- **mock 資料與真實 API 格式可能落差** → 定義清楚 response schema，降低未來遷移成本
- **Tailwind purge 設定錯誤導致 class 消失** → 確認 `content` 路徑涵蓋所有 `.jsx` 檔案

## Migration Plan

1. `npm create vite@latest` 建立專案
2. 安裝依賴：`react-router-dom`, `recharts`, `tailwindcss`
3. 依序實作：mock API → AuthContext → ProtectedRoute → 各頁面
4. 無 rollback 需求（純前端新專案）

## Open Questions

- 儀表板圖表要顯示哪種類型？（建議：長條圖顯示每月新增車輛數、圓餅圖顯示車輛狀態分佈）
- 車輛資料欄位有哪些？（預設：車牌、廠牌、型號、狀態、指派員工）
- 員工資料欄位有哪些？（預設：姓名、員工編號、部門、職稱、email）
