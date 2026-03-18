## ADDED Requirements

### Requirement: KPI 數據卡片
系統 SHALL 在儀表板上方顯示關鍵數據卡片。

#### Scenario: 儀表板載入數據卡片
- **WHEN** 登入使用者訪問儀表板頁面
- **THEN** 系統顯示至少三張卡片：車輛總數、使用中車輛數、員工總數

#### Scenario: 卡片數據來自 Mock API
- **WHEN** 頁面初始化
- **THEN** 系統呼叫 Mock API 取得統計數據並渲染至卡片

### Requirement: 統計圖表
系統 SHALL 在儀表板下方顯示資料視覺化圖表。

#### Scenario: 顯示車輛狀態圓餅圖
- **WHEN** 儀表板載入完成
- **THEN** 系統顯示圓餅圖，呈現車輛狀態分佈（使用中 / 維修中 / 閒置）

#### Scenario: 顯示每月新增車輛長條圖
- **WHEN** 儀表板載入完成
- **THEN** 系統顯示長條圖，呈現近 6 個月新增車輛數量趨勢
