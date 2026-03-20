## Purpose

使用者活動紀錄功能，供管理員查看系統中使用者的操作紀錄。

## Requirements

### Requirement: 活動紀錄頁面存取權限
系統 SHALL 限制活動紀錄頁面僅供 admin 角色存取。非 admin 使用者 SHALL 無法透過路由存取此頁面。

#### Scenario: Admin 存取活動紀錄頁面
- **WHEN** admin 角色使用者導覽至 `/activity-log`
- **THEN** 系統顯示活動紀錄頁面

#### Scenario: 一般使用者嘗試存取活動紀錄頁面
- **WHEN** user 角色使用者嘗試導覽至 `/activity-log`
- **THEN** 系統重導至首頁或顯示無權限提示

### Requirement: 活動紀錄列表顯示
系統 SHALL 以表格形式顯示使用者活動紀錄，包含使用者名稱、操作類型、操作對象及時間戳記，並依時間由新到舊排序。

#### Scenario: 顯示活動紀錄列表
- **WHEN** admin 進入活動紀錄頁面
- **THEN** 系統從 `GET /api/activity-logs` 取得資料並以表格呈現，欄位包含：使用者、操作類型、操作對象、時間

#### Scenario: 無紀錄時顯示空狀態
- **WHEN** API 回傳空陣列
- **THEN** 系統顯示「目前沒有活動紀錄」提示訊息

### Requirement: 依操作類型篩選
系統 SHALL 提供操作類型下拉選單，讓 admin 篩選特定類型的活動紀錄。

#### Scenario: 篩選特定操作類型
- **WHEN** admin 從下拉選單選擇「登入」
- **THEN** 列表僅顯示 action 為 `LOGIN` 的紀錄

#### Scenario: 清除篩選條件
- **WHEN** admin 選擇「全部」選項
- **THEN** 列表顯示所有操作類型的紀錄

### Requirement: 依使用者篩選
系統 SHALL 提供使用者下拉選單，讓 admin 篩選特定使用者的活動紀錄。

#### Scenario: 篩選特定使用者
- **WHEN** admin 從使用者下拉選單選擇特定使用者
- **THEN** 列表僅顯示該使用者的紀錄

### Requirement: Mock API 端點
系統 SHALL 提供 `GET /api/activity-logs` MSW handler，支援 `action` 及 `userId` query parameters 進行篩選，回傳活動紀錄陣列。

#### Scenario: 取得所有活動紀錄
- **WHEN** 前端呼叫 `GET /api/activity-logs` 無任何參數
- **THEN** API 回傳所有活動紀錄，依時間由新到舊排序

#### Scenario: 依操作類型篩選
- **WHEN** 前端呼叫 `GET /api/activity-logs?action=LOGIN`
- **THEN** API 僅回傳 action 為 `LOGIN` 的紀錄

#### Scenario: 依使用者篩選
- **WHEN** 前端呼叫 `GET /api/activity-logs?userId=1`
- **THEN** API 僅回傳該使用者的紀錄

### Requirement: 側邊導覽列入口
系統 SHALL 在側邊導覽列為 admin 角色顯示「活動紀錄」連結，連結至 `/activity-log`。

#### Scenario: Admin 看到導覽連結
- **WHEN** admin 角色使用者檢視側邊導覽列
- **THEN** 導覽列顯示「活動紀錄」項目

#### Scenario: 一般使用者不可見
- **WHEN** user 角色使用者檢視側邊導覽列
- **THEN** 導覽列不顯示「活動紀錄」項目
