## ADDED Requirements

### Requirement: 使用者紀錄頁面
系統 SHALL 提供 `/activity-logs` 頁面，僅限 admin 角色存取，顯示所有使用者的操作紀錄。

#### Scenario: admin 存取頁面
- **WHEN** 角色為 `admin` 的使用者訪問 `/activity-logs`
- **THEN** 系統顯示使用者紀錄頁面，列出所有操作紀錄

#### Scenario: 非 admin 存取頁面
- **WHEN** 角色為 `user` 的使用者訪問 `/activity-logs`
- **THEN** 系統導向 `/dashboard`

### Requirement: 操作紀錄列表
系統 SHALL 以表格呈現操作紀錄，每筆記錄包含：使用者名稱、動作類型、操作對象、時間戳記。

#### Scenario: 顯示紀錄列表
- **WHEN** 頁面載入完成
- **THEN** 表格顯示所有 activity log，依時間倒序排列（最新在上）

#### Scenario: 無紀錄時
- **WHEN** activity log 為空
- **THEN** 顯示「尚無操作紀錄」空狀態提示

### Requirement: 篩選功能
系統 SHALL 提供篩選介面，允許依使用者名稱、動作類型篩選紀錄。

#### Scenario: 依使用者篩選
- **WHEN** 管理者在篩選欄位選擇特定使用者
- **THEN** 列表只顯示該使用者的操作紀錄

#### Scenario: 依動作類型篩選
- **WHEN** 管理者選擇特定動作類型（如 `login`、`create_vehicle`）
- **THEN** 列表只顯示該類型的操作紀錄

#### Scenario: 清除篩選
- **WHEN** 管理者清除篩選條件
- **THEN** 列表恢復顯示全部紀錄
