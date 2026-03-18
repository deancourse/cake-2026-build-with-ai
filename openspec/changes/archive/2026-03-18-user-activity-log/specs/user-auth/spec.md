## ADDED Requirements

### Requirement: 登入登出操作記錄
系統 SHALL 在使用者登入或登出時，自動寫入 activity log。

#### Scenario: 登入時記錄
- **WHEN** 使用者呼叫 `login()` 驗證成功
- **THEN** 寫入 `action: 'login'`，`target` 為使用者名稱

#### Scenario: 登出時記錄
- **WHEN** 使用者呼叫 `logout()`
- **THEN** 寫入 `action: 'logout'`，`target` 為使用者名稱
