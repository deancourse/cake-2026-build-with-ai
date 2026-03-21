## Requirements

### Requirement: View vehicle list
系統 SHALL 顯示車輛列表，包含：車牌號碼、品牌型號、車輛狀態（使用中/閒置/維修中）、負責人。支援以表格形式呈現。

#### Scenario: View all vehicles
- **WHEN** 已登入使用者進入車輛管理頁
- **THEN** 系統以表格顯示所有車輛資料

### Requirement: Add new vehicle
系統 SHALL 提供新增車輛功能，使用者填寫車牌號碼、品牌型號、狀態、負責人後送出。

#### Scenario: Successfully add a vehicle
- **WHEN** 使用者點擊新增按鈕，填寫完整車輛資料並送出
- **THEN** 新車輛出現在列表中，顯示成功訊息

### Requirement: Edit vehicle
系統 SHALL 允許使用者編輯既有車輛資料。

#### Scenario: Successfully edit a vehicle
- **WHEN** 使用者點擊某筆車輛的編輯按鈕，修改資料並儲存
- **THEN** 車輛資料更新成功，列表反映最新資料

### Requirement: Delete vehicle
系統 SHALL 允許使用者刪除車輛，刪除前 MUST 顯示確認對話框。

#### Scenario: Delete a vehicle with confirmation
- **WHEN** 使用者點擊刪除按鈕並確認刪除
- **THEN** 該車輛從列表中移除，顯示刪除成功訊息

#### Scenario: Cancel vehicle deletion
- **WHEN** 使用者點擊刪除按鈕後取消
- **THEN** 車輛資料不受影響
