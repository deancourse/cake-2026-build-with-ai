## ADDED Requirements

### Requirement: Admin-only access
員工管理頁 SHALL 僅限 admin 角色存取。非 admin 使用者 MUST 無法看到此頁面的導覽連結。

#### Scenario: Admin accesses employee management
- **WHEN** admin 角色使用者進入員工管理頁
- **THEN** 系統正常顯示員工列表

#### Scenario: Non-admin cannot see employee nav link
- **WHEN** user 角色使用者檢視導覽列
- **THEN** 導覽列不顯示「員工管理」連結

### Requirement: View employee list
系統 SHALL 顯示員工列表，包含：姓名、部門、職稱、聯絡電話、Email。以表格形式呈現。

#### Scenario: View all employees
- **WHEN** admin 進入員工管理頁
- **THEN** 系統以表格顯示所有員工資料

### Requirement: Add new employee
系統 SHALL 提供新增員工功能，admin 填寫姓名、部門、職稱、電話、Email 後送出。

#### Scenario: Successfully add an employee
- **WHEN** admin 點擊新增按鈕，填寫完整員工資料並送出
- **THEN** 新員工出現在列表中，顯示成功訊息

### Requirement: Edit employee
系統 SHALL 允許 admin 編輯既有員工資料。

#### Scenario: Successfully edit an employee
- **WHEN** admin 點擊某筆員工的編輯按鈕，修改資料並儲存
- **THEN** 員工資料更新成功，列表反映最新資料

### Requirement: Delete employee
系統 SHALL 允許 admin 刪除員工，刪除前 MUST 顯示確認對話框。

#### Scenario: Delete an employee with confirmation
- **WHEN** admin 點擊刪除按鈕並確認刪除
- **THEN** 該員工從列表中移除，顯示刪除成功訊息
