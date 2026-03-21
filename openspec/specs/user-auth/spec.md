## Requirements

### Requirement: User login with credentials
系統 SHALL 提供登入頁面，使用者輸入帳號與密碼後進行驗證。驗證成功後導向儀表板，失敗則顯示錯誤訊息。

#### Scenario: Successful login as admin
- **WHEN** 使用者輸入正確的 admin 帳號密碼並點擊登入
- **THEN** 系統導向首頁儀表板，並將角色設為 admin

#### Scenario: Successful login as user
- **WHEN** 使用者輸入正確的 user 帳號密碼並點擊登入
- **THEN** 系統導向首頁儀表板，並將角色設為 user

#### Scenario: Login with invalid credentials
- **WHEN** 使用者輸入錯誤的帳號或密碼並點擊登入
- **THEN** 系統顯示「帳號或密碼錯誤」錯誤訊息，停留在登入頁

### Requirement: Role-based access control
系統 SHALL 根據使用者角色限制頁面存取。未登入使用者 MUST 被導向登入頁。一般使用者 MUST 無法存取員工管理頁與操作紀錄頁。

#### Scenario: Unauthenticated user visits protected page
- **WHEN** 未登入使用者嘗試存取任何受保護頁面
- **THEN** 系統自動導向登入頁

#### Scenario: User role visits employee management
- **WHEN** 角色為 user 的使用者嘗試存取員工管理頁
- **THEN** 系統導向首頁儀表板並顯示權限不足提示

#### Scenario: User role visits activity log
- **WHEN** 角色為 user 的使用者嘗試存取操作紀錄頁
- **THEN** 系統導向首頁儀表板

### Requirement: User logout
系統 SHALL 提供登出功能，清除使用者登入狀態並導回登入頁。

#### Scenario: User logs out
- **WHEN** 使用者點擊登出按鈕
- **THEN** 系統清除 auth 狀態與 localStorage，導向登入頁
