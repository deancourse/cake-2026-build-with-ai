import { useEffect, useState } from 'react'
import type { ActivityLog } from '../mocks/data'

const actionLabel: Record<string, string> = {
  login: '登入',
  create: '新增',
  update: '編輯',
  delete: '刪除',
}

const actionStyle: Record<string, string> = {
  login: 'bg-blue-50 text-blue-700 border-blue-200',
  create: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  update: 'bg-amber-50 text-amber-700 border-amber-200',
  delete: 'bg-red-50 text-red-700 border-red-200',
}

const targetLabel: Record<string, string> = {
  auth: '系統',
  vehicle: '車輛',
  employee: '員工',
}

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [actionFilter, setActionFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams()
    if (actionFilter) params.set('action', actionFilter)
    if (userFilter) params.set('user', userFilter)
    const qs = params.toString()

    setLoading(true)
    fetch(`/api/activity-logs${qs ? `?${qs}` : ''}`)
      .then((r) => r.json())
      .then((data) => {
        setLogs(data)
        setLoading(false)
      })
  }, [actionFilter, userFilter])

  const uniqueUsers = [...new Set(logs.map((l) => l.user))]

  const formatTime = (ts: string) => {
    const d = new Date(ts)
    return d.toLocaleString('zh-TW', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const selectClass =
    'px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white'

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">操作紀錄</h2>
          <p className="text-sm text-gray-500 mt-1">檢視所有使用者操作行為</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">操作類型</label>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className={selectClass}
          >
            <option value="">全部</option>
            <option value="login">登入</option>
            <option value="create">新增</option>
            <option value="update">編輯</option>
            <option value="delete">刪除</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">使用者</label>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className={selectClass}
          >
            <option value="">全部</option>
            {uniqueUsers.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        {(actionFilter || userFilter) && (
          <div className="self-end">
            <button
              onClick={() => { setActionFilter(''); setUserFilter('') }}
              className="px-3.5 py-2.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              清除篩選
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-14 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">時間</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">使用者</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">操作類型</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">對象</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">描述</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-gray-400">
                    無符合條件的紀錄
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors duration-150">
                    <td className="px-5 py-3.5 text-sm text-gray-500 whitespace-nowrap">{formatTime(log.timestamp)}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{log.user}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${actionStyle[log.action]}`}>
                        {actionLabel[log.action]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-700">{targetLabel[log.target]}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-700">{log.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary */}
      {!loading && logs.length > 0 && (
        <div className="mt-4 text-sm text-gray-400">
          共 {logs.length} 筆紀錄
        </div>
      )}
    </div>
  )
}
