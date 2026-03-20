import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Stats {
  total: number
  active: number
  maintenance: number
  retired: number
  employeeCount: number
}

const COLORS = ['#52c41a', '#faad14', '#ff4d4f']

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/dashboard/stats').then((r) => r.json()).then(setStats)
  }, [])

  if (!stats) return <div>載入中...</div>

  const cards = [
    { label: '車輛總數', value: stats.total, color: '#1677ff' },
    { label: '使用中', value: stats.active, color: '#52c41a' },
    { label: '維修中', value: stats.maintenance, color: '#faad14' },
    { label: '員工總數', value: stats.employeeCount, color: '#722ed1' },
  ]

  const pieData = [
    { name: '使用中', value: stats.active },
    { name: '維修中', value: stats.maintenance },
    { name: '已報廢', value: stats.retired },
  ]

  const barData = [
    { name: '使用中', count: stats.active },
    { name: '維修中', count: stats.maintenance },
    { name: '已報廢', count: stats.retired },
  ]

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>儀表板</h2>
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {cards.map((c) => (
          <div key={c.label} style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>{c.label}</div>
            <div style={{ fontSize: 32, fontWeight: 'bold', color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>
      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: 16 }}>車輛狀態分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: 16 }}>車輛狀態統計</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="數量" fill="#1677ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
