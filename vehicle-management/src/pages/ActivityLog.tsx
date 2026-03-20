import { useEffect, useState } from 'react'
import type { ActivityLog, ActivityAction } from '../mocks/data'

const ACTION_LABELS: Record<ActivityAction, string> = {
  LOGIN: '登入',
  LOGOUT: '登出',
  VEHICLE_CREATE: '新增車輛',
  VEHICLE_UPDATE: '編輯車輛',
  VEHICLE_DELETE: '刪除車輛',
  EMPLOYEE_CREATE: '新增員工',
  EMPLOYEE_UPDATE: '編輯員工',
  EMPLOYEE_DELETE: '刪除員工',
}

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [actionFilter, setActionFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')

  useEffect(() => {
    const params = new URLSearchParams()
    if (actionFilter) params.set('action', actionFilter)
    if (userFilter) params.set('userId', userFilter)
    const query = params.toString()
    fetch(`/api/activity-logs${query ? `?${query}` : ''}`)
      .then((r) => r.json())
      .then(setLogs)
  }, [actionFilter, userFilter])

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>活動紀錄</h2>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} style={selectStyle}>
          <option value="">全部操作類型</option>
          {Object.entries(ACTION_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)} style={selectStyle}>
          <option value="">全部使用者</option>
          <option value="admin">系統管理員</option>
          <option value="user">一般使用者</option>
        </select>
      </div>

      {logs.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#999', background: '#fff', borderRadius: 8 }}>
          目前沒有活動紀錄
        </div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              {['使用者', '操作類型', '操作對象', '時間'].map((h) => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td style={tdStyle}>{log.username}</td>
                <td style={tdStyle}>{ACTION_LABELS[log.action]}</td>
                <td style={tdStyle}>{log.target || '-'}</td>
                <td style={tdStyle}>{new Date(log.timestamp).toLocaleString('zh-TW')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const selectStyle: React.CSSProperties = { padding: 8, borderRadius: 4, border: '1px solid #d9d9d9', fontSize: 14 }
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }
const thStyle: React.CSSProperties = { padding: '12px 16px', textAlign: 'left', background: '#fafafa', borderBottom: '1px solid #e8e8e8', fontWeight: 600 }
const tdStyle: React.CSSProperties = { padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }
