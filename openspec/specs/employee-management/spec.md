# employee-management

## Purpose

員工管理功能，僅限管理者存取，提供員工資料的檢視、新增、編輯與刪除。

## Requirements

### Requirement: 僅管理者可存取員工管理頁
系統 SHALL 限制員工管理頁面僅供管理者角色存取。

#### Scenario: 管理者存取員工管理頁
- **WHEN** 管理者角色的使用者進入員工管理頁
- **THEN** 系統正常顯示員工列表

#### Scenario: 一般使用者嘗試存取員工管理頁
- **WHEN** 一般使用者嘗試進入員工管理頁
- **THEN** 系統導向首頁或顯示無權限訊息

### Requirement: 檢視員工列表
系統 SHALL 以表格形式顯示所有員工資料。

#### Scenario: 顯示員工列表
- **WHEN** 管理者進入員工管理頁
- **THEN** 系統顯示所有員工，包含姓名、Email、部門、職稱、電話

### Requirement: 新增員工
系統 SHALL 提供新增員工的表單。

#### Scenario: 成功新增員工
- **WHEN** 管理者填寫員工資料並送出
- **THEN** 系統新增該員工並更新列表

### Requirement: 編輯員工
系統 SHALL 允許管理者編輯既有員工資料。

#### Scenario: 成功編輯員工
- **WHEN** 管理者修改員工資料並儲存
- **THEN** 系統更新該員工資料並反映在列表中

### Requirement: 刪除員工
系統 SHALL 允許管理者刪除員工資料，刪除前需確認。

#### Scenario: 確認刪除員工
- **WHEN** 管理者點擊刪除並確認
- **THEN** 系統移除該員工並更新列表
