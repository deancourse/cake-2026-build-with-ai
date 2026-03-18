## ADDED Requirements

### Requirement: 員工列表（僅 admin）
系統 SHALL 僅允許 admin 角色存取員工管理頁，並顯示員工列表，欄位包含：姓名、員工編號、部門、職稱、email。

#### Scenario: admin 載入員工列表
- **WHEN** admin 角色使用者訪問員工管理頁
- **THEN** 系統呼叫 Mock API 並以表格顯示所有員工資料

### Requirement: 新增員工
系統 SHALL 提供新增員工的表單。

#### Scenario: 成功新增員工
- **WHEN** admin 填寫完整員工資料（姓名、員工編號、部門、職稱、email）並送出
- **THEN** 系統呼叫 Mock API 新增資料，列表更新顯示新員工

#### Scenario: 表單驗證失敗
- **WHEN** admin 送出表單但必填欄位為空
- **THEN** 系統顯示欄位錯誤提示，不送出 API

### Requirement: 編輯員工
系統 SHALL 允許 admin 編輯員工資料。

#### Scenario: 成功編輯員工
- **WHEN** admin 點擊編輯按鈕，修改資料後送出
- **THEN** 系統呼叫 Mock API 更新資料，列表反映最新內容

### Requirement: 刪除員工
系統 SHALL 提供刪除員工功能，並在執行前要求確認。

#### Scenario: 確認後刪除員工
- **WHEN** admin 點擊刪除並在確認對話框中確認
- **THEN** 系統呼叫 Mock API 刪除資料，列表移除該筆記錄

#### Scenario: 取消刪除
- **WHEN** admin 點擊刪除但在確認對話框中取消
- **THEN** 系統不執行刪除，列表不變
