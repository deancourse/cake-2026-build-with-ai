# vehicle-management

## Purpose

車輛管理功能，提供車輛資料的檢視、新增、編輯與刪除。

## Requirements

### Requirement: 檢視車輛列表
系統 SHALL 提供車輛列表頁面，以表格形式顯示所有車輛資料。

#### Scenario: 顯示車輛列表
- **WHEN** 使用者進入車輛管理頁
- **THEN** 系統以表格顯示所有車輛，包含車牌號碼、品牌、型號、年份、狀態

### Requirement: 新增車輛
系統 SHALL 提供新增車輛的表單，填寫後可新增一筆車輛資料。

#### Scenario: 成功新增車輛
- **WHEN** 使用者填寫車輛資料並送出
- **THEN** 系統新增該車輛並更新列表顯示

### Requirement: 編輯車輛
系統 SHALL 允許使用者編輯既有車輛資料。

#### Scenario: 成功編輯車輛
- **WHEN** 使用者修改車輛資料並儲存
- **THEN** 系統更新該車輛資料並反映在列表中

### Requirement: 刪除車輛
系統 SHALL 允許使用者刪除車輛資料，刪除前需確認。

#### Scenario: 確認刪除車輛
- **WHEN** 使用者點擊刪除並確認
- **THEN** 系統移除該車輛並更新列表

#### Scenario: 取消刪除車輛
- **WHEN** 使用者點擊刪除但取消確認
- **THEN** 車輛資料不變
