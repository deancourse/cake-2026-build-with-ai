## Requirements

### Requirement: Admin-only activity log access
操作紀錄頁 SHALL 僅限 admin 角色存取。非 admin 使用者 MUST 無法看到此頁面的導覽連結。

#### Scenario: Admin accesses activity log
- **WHEN** admin 角色使用者進入操作紀錄頁
- **THEN** 系統正常顯示操作紀錄列表

#### Scenario: Non-admin cannot see activity log nav link
- **WHEN** user 角色使用者檢視導覽列
- **THEN** 導覽列不顯示「操作紀錄」連結

### Requirement: View activity log list
系統 SHALL 以表格顯示操作紀錄，欄位包含：時間、使用者、操作類型、操作對象、描述。紀錄 SHALL 按時間降序排列。

#### Scenario: View all activity logs
- **WHEN** admin 進入操作紀錄頁
- **THEN** 系統以表格顯示所有操作紀錄，最新的在最上面

### Requirement: Filter by action type
系統 SHALL 提供操作類型篩選功能，選項包含：全部、登入、新增、編輯、刪除。

#### Scenario: Filter logs by action type
- **WHEN** admin 選擇「登入」篩選條件
- **THEN** 表格僅顯示操作類型為「登入」的紀錄

### Requirement: Filter by user
系統 SHALL 提供使用者篩選功能，可依操作者名稱篩選紀錄。

#### Scenario: Filter logs by user
- **WHEN** admin 選擇特定使用者進行篩選
- **THEN** 表格僅顯示該使用者的操作紀錄

### Requirement: Action type badges
操作類型 SHALL 以彩色 badge 標示，不同操作類型使用不同顏色以利辨識。

#### Scenario: Display action type with colored badge
- **WHEN** 操作紀錄顯示於表格中
- **THEN** 每筆紀錄的操作類型以對應顏色的 badge 呈現
