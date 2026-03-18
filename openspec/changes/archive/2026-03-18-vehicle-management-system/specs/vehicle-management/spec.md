## ADDED Requirements

### Requirement: 車輛列表
系統 SHALL 顯示所有車輛資料的列表，欄位包含：車牌、廠牌、型號、狀態、指派員工。

#### Scenario: 載入車輛列表
- **WHEN** 已登入使用者訪問車輛管理頁
- **THEN** 系統呼叫 Mock API 並以表格顯示所有車輛資料

### Requirement: 新增車輛
系統 SHALL 提供新增車輛的表單，填寫後儲存至 mock 資料。

#### Scenario: 成功新增車輛
- **WHEN** 使用者填寫完整車輛資料並送出
- **THEN** 系統呼叫 Mock API 新增資料，列表更新顯示新車輛，表單關閉

#### Scenario: 表單驗證失敗
- **WHEN** 使用者送出表單但必填欄位（車牌、廠牌、型號）為空
- **THEN** 系統顯示欄位錯誤提示，不送出 API

### Requirement: 編輯車輛
系統 SHALL 允許使用者編輯既有車輛資料。

#### Scenario: 成功編輯車輛
- **WHEN** 使用者點擊編輯按鈕，修改資料後送出
- **THEN** 系統呼叫 Mock API 更新資料，列表反映最新內容

### Requirement: 刪除車輛
系統 SHALL 提供刪除車輛功能，並在執行前要求確認。

#### Scenario: 確認後刪除車輛
- **WHEN** 使用者點擊刪除並在確認對話框中確認
- **THEN** 系統呼叫 Mock API 刪除資料，列表移除該筆記錄

#### Scenario: 取消刪除
- **WHEN** 使用者點擊刪除但在確認對話框中取消
- **THEN** 系統不執行刪除，列表不變
