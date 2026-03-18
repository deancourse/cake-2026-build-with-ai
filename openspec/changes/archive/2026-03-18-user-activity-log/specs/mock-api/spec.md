## ADDED Requirements

### Requirement: Mock Activity Log API
系統 SHALL 提供 in-memory activity log 資料與操作函式。

#### Scenario: 取得 activity log 列表
- **WHEN** 呼叫 `getActivityLogs(filters?)`
- **THEN** 回傳 activity log 陣列，依 timestamp 倒序排列；若傳入 filters，則回傳篩選後結果

#### Scenario: 寫入 activity log
- **WHEN** 呼叫 `logActivity({ userId, username, action, target })`
- **THEN** 新增一筆 log 至 in-memory 陣列，自動產生 id 與當前 timestamp

### Requirement: 車輛操作自動記錄
系統 SHALL 在車輛 CRUD 操作完成後，自動呼叫 `logActivity()` 寫入對應紀錄。

#### Scenario: 新增車輛時記錄
- **WHEN** 呼叫 `createVehicle(data, user)`
- **THEN** 操作成功後寫入 `action: 'create_vehicle'`，`target` 為車牌號碼

#### Scenario: 更新車輛時記錄
- **WHEN** 呼叫 `updateVehicle(id, data, user)`
- **THEN** 操作成功後寫入 `action: 'update_vehicle'`，`target` 為車牌號碼

#### Scenario: 刪除車輛時記錄
- **WHEN** 呼叫 `deleteVehicle(id, user)`
- **THEN** 操作成功後寫入 `action: 'delete_vehicle'`，`target` 為車牌號碼

### Requirement: 員工操作自動記錄
系統 SHALL 在員工 CRUD 操作完成後，自動呼叫 `logActivity()` 寫入對應紀錄。

#### Scenario: 新增員工時記錄
- **WHEN** 呼叫 `createEmployee(data, user)`
- **THEN** 操作成功後寫入 `action: 'create_employee'`，`target` 為員工姓名

#### Scenario: 更新員工時記錄
- **WHEN** 呼叫 `updateEmployee(id, data, user)`
- **THEN** 操作成功後寫入 `action: 'update_employee'`，`target` 為員工姓名

#### Scenario: 刪除員工時記錄
- **WHEN** 呼叫 `deleteEmployee(id, user)`
- **THEN** 操作成功後寫入 `action: 'delete_employee'`，`target` 為員工姓名
