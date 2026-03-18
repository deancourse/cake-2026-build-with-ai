## ADDED Requirements

### Requirement: Mock 身份驗證
系統 SHALL 提供模擬登入驗證函式，回傳使用者資訊與角色。

#### Scenario: 驗證 admin 帳號
- **WHEN** 呼叫 `login({ username: 'admin', password: 'admin123' })`
- **THEN** 回傳 `{ id: 1, username: 'admin', role: 'admin' }`

#### Scenario: 驗證 user 帳號
- **WHEN** 呼叫 `login({ username: 'user', password: 'user123' })`
- **THEN** 回傳 `{ id: 2, username: 'user', role: 'user' }`

#### Scenario: 驗證失敗
- **WHEN** 呼叫 `login` 傳入不存在的帳號密碼
- **THEN** 回傳 rejected Promise，錯誤訊息為「帳號或密碼錯誤」

### Requirement: Mock 車輛 CRUD API
系統 SHALL 提供模擬車輛資料的 CRUD 操作函式，操作結果反映於 in-memory 資料。

#### Scenario: 取得車輛列表
- **WHEN** 呼叫 `getVehicles()`
- **THEN** 回傳包含預設車輛資料的陣列（至少 5 筆假資料）

#### Scenario: 新增車輛
- **WHEN** 呼叫 `createVehicle(data)`
- **THEN** 新增至 in-memory 陣列，回傳含新 id 的車輛物件

#### Scenario: 更新車輛
- **WHEN** 呼叫 `updateVehicle(id, data)`
- **THEN** 更新對應車輛資料，回傳更新後物件

#### Scenario: 刪除車輛
- **WHEN** 呼叫 `deleteVehicle(id)`
- **THEN** 從 in-memory 陣列移除該筆資料，回傳成功訊息

### Requirement: Mock 員工 CRUD API
系統 SHALL 提供模擬員工資料的 CRUD 操作函式。

#### Scenario: 取得員工列表
- **WHEN** 呼叫 `getEmployees()`
- **THEN** 回傳包含預設員工資料的陣列（至少 5 筆假資料）

#### Scenario: 新增員工
- **WHEN** 呼叫 `createEmployee(data)`
- **THEN** 新增至 in-memory 陣列，回傳含新 id 的員工物件

#### Scenario: 更新員工
- **WHEN** 呼叫 `updateEmployee(id, data)`
- **THEN** 更新對應員工資料，回傳更新後物件

#### Scenario: 刪除員工
- **WHEN** 呼叫 `deleteEmployee(id)`
- **THEN** 從 in-memory 陣列移除該筆資料，回傳成功訊息

### Requirement: Mock API 延遲模擬
系統 SHALL 在所有 Mock API 呼叫中加入模擬網路延遲，使體驗接近真實 API。

#### Scenario: API 延遲
- **WHEN** 任何 Mock API 函式被呼叫
- **THEN** 函式在 300-500ms 後才 resolve，以模擬網路延遲

### Requirement: Mock 儀表板統計 API
系統 SHALL 提供統計數據函式供儀表板使用。

#### Scenario: 取得統計數據
- **WHEN** 呼叫 `getDashboardStats()`
- **THEN** 回傳 `{ totalVehicles, activeVehicles, totalEmployees, vehicleStatusChart, monthlyVehicleChart }`
