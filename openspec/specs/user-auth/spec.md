## ADDED Requirements

### Requirement: 使用者登入
系統 SHALL 提供登入頁面，使用者輸入帳號與密碼後進行驗證，驗證成功後依角色導向對應頁面。

#### Scenario: admin 登入成功
- **WHEN** 使用者輸入 admin 帳號密碼並送出
- **THEN** 系統驗證成功，將使用者導向儀表板頁面，並在 Context 中儲存角色為 `admin`

#### Scenario: 一般使用者登入成功
- **WHEN** 使用者輸入 user 帳號密碼並送出
- **THEN** 系統驗證成功，將使用者導向儀表板頁面，並在 Context 中儲存角色為 `user`

#### Scenario: 帳號密碼錯誤
- **WHEN** 使用者輸入錯誤的帳號或密碼
- **THEN** 系統顯示錯誤訊息「帳號或密碼錯誤」，不執行導向

### Requirement: 使用者登出
系統 SHALL 提供登出功能，清除 auth state 並導向登入頁面。

#### Scenario: 使用者點擊登出
- **WHEN** 已登入使用者點擊登出按鈕
- **THEN** 系統清除 AuthContext 狀態，導向 `/login` 頁面

### Requirement: 路由保護
系統 SHALL 阻止未登入使用者存取受保護頁面。

#### Scenario: 未登入直接存取內頁
- **WHEN** 未登入使用者直接訪問 `/dashboard` 或任何內頁
- **THEN** 系統自動導向 `/login`

### Requirement: 角色權限控制
系統 SHALL 依使用者角色限制特定頁面的存取。

#### Scenario: 一般使用者存取員工管理頁
- **WHEN** 角色為 `user` 的使用者嘗試訪問 `/employees`
- **THEN** 系統導向 `/dashboard`，不顯示員工管理頁面

#### Scenario: admin 存取員工管理頁
- **WHEN** 角色為 `admin` 的使用者訪問 `/employees`
- **THEN** 系統正常顯示員工管理頁面

### Requirement: 登入登出操作記錄
系統 SHALL 在使用者登入或登出時，自動寫入 activity log。

#### Scenario: 登入時記錄
- **WHEN** 使用者呼叫 `login()` 驗證成功
- **THEN** 寫入 `action: 'login'`，`target` 為使用者名稱

#### Scenario: 登出時記錄
- **WHEN** 使用者呼叫 `logout()`
- **THEN** 寫入 `action: 'logout'`，`target` 為使用者名稱
