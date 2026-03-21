## MODIFIED Requirements

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
