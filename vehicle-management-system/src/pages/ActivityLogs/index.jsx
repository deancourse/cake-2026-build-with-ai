import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { getActivityLogs } from '../../api/mock/activityLogs'

const ACTION_LABELS = {
  login: '登入',
  logout: '登出',
  create_vehicle: '新增車輛',
  update_vehicle: '更新車輛',
  delete_vehicle: '刪除車輛',
  create_employee: '新增員工',
  update_employee: '更新員工',
  delete_employee: '刪除員工',
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterUsername, setFilterUsername] = useState('')
  const [filterAction, setFilterAction] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const data = await getActivityLogs()
    setLogs(data)
    setLoading(false)
  }

  const usernames = [...new Set(logs.map((l) => l.username))]
  const actions = [...new Set(logs.map((l) => l.action))]

  const filtered = logs.filter((l) => {
    if (filterUsername && l.username !== filterUsername) return false
    if (filterAction && l.action !== filterAction) return false
    return true
  })

  function formatTime(iso) {
    return new Date(iso).toLocaleString('zh-TW', { hour12: false })
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-800">使用者紀錄</h1>
      </div>

      {/* 篩選列 */}
      <div className="flex gap-3 mb-4">
        <select
          value={filterUsername}
          onChange={(e) => setFilterUsername(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">全部使用者</option>
          {usernames.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">全部動作</option>
          {actions.map((a) => <option key={a} value={a}>{ACTION_LABELS[a] ?? a}</option>)}
        </select>
        {(filterUsername || filterAction) && (
          <button
            onClick={() => { setFilterUsername(''); setFilterAction('') }}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            清除篩選
          </button>
        )}
      </div>

      {/* 表格 */}
      {loading ? (
        <div className="text-center py-10 text-gray-400 text-sm">載入中...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">尚無操作紀錄</div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">使用者</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">動作</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">操作對象</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">時間</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{log.username}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700">
                      {ACTION_LABELS[log.action] ?? log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{log.target}</td>
                  <td className="px-4 py-3 text-gray-400">{formatTime(log.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}
